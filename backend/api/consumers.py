import json
from channels import Group

from django.contrib.auth import get_user_model, authenticate
User = get_user_model()

from .engine import ReduxConsumer, action

from .models import BridgeTable, Deal

from numpy import random

def suit_name(abbr):
    if abbr == 'S':
        return 'spades'
    elif abbr =='H':
        return 'hearts'
    elif abbr =='D':
        return 'diamonds'
    elif abbr =='C':
        return 'clubs'
    else:
        raise ValueError('not valid suit')

def find_dummy(seat):
    if seat == 'north':
        return 'south'
    elif seat == 'east':
        return 'west'
    elif seat == 'south':
        return 'north'
    elif seat == 'west':
        return 'east'

class SockConsumer(ReduxConsumer):
    channel_session_user = True
    http_user = True
    strict_ordering = False

    def connection_groups(self, **kwargs):
        groups = ['all']
        return groups

    def disconnect(self, message, **kwargs):
        print('disconnected')
        self.LOGOUT()

    # login user actions
    @action('LOGIN')
    def LOGIN(self, content):
        print('LOGIN')
        username = content['username']
        password = content['password']

        # login and signup at the same time
        is_valid = self.SIGN_UP(content)

        if not is_valid:
            print('not valid')
            self.message.channel_session['user'] = str(random.randint(1,101))
            control = self.get_control_channel()
            self.add(control)
            self.send_to_group(control, {
                          'type': 'LOGIN_INVALID'
                          })
            return


        user = authenticate(username=username,password=password)
        print(content['username'])
        user.is_logged_in = True
        user.save()

        self.message.channel_session['user'] = username
        self.message.channel_session['table_id'] = ''

        control = self.get_control_channel()
        self.add(control)
        print('control')
        print(control)

        # get logged in users and dispatch
        # to deprecate
        user_list = []
        for x in User.objects.filter(is_logged_in=True):
            user_list.append(x.username)

        # log in on front end
        self.send_to_group(username, {
                        'type': 'GET_USERNAME',
                        'username': username
                      })
        self.send_to_group(username, {
                        'type': 'IS_LOGGED_IN',
                        'bool': True
                      })

        self.MODIFY_USER_LIST(None, True, username, user_list)

        #get list of tables
        self.GET_TABLES()

    @action('SIGN_UP')
    def SIGN_UP(self, content):
        print('SIGN_UP')
        username = content['username']
        password = content['password']
        if User.objects.filter(username=username).exists():
            return False
        else:
            user = User.objects.create_user(username=username,password=password)
            user.save()
            return True

    @action('LOGOUT')
    def LOGOUT(self, action=None):
        print('LOGOUT')
        username = self.message.channel_session.get('user')
        print(username)
        user = User.objects.get(username=username)
        user.is_logged_in = False
        user.save()
        self.MODIFY_USER_LIST(None, False, username)

        # delete user
        user.delete()

        # delete all tables
        BridgeTable.objects.all().delete()

    # table actions
    @action('CREATE_TABLE')
    def CREATE_TABLE(self, content):
        print('CREATE_TABLE')

        # create table and generate deal
        table = BridgeTable.objects.create_deal()
        table.save()

        # send action to frontend
        content['id'] = table.id
        self.send_to_group('all',content)

    @action('GET_TABLES')
    def GET_TABLES(self, action=None):
        print('GET_TABLES')
        username = self.message.channel_session['user']

        # to deprecate
        tablelist = []
        for x in BridgeTable.objects.all():
            tablelist.append(x.pk)

        self.send_to_group(username, {
                      'type': 'GET_TABLES',
                      'tablelist': tablelist
                      })

    @action('JOIN_TABLE')
    def JOIN_TABLE(self, action):
        print('JOIN_TABLE')
        username = self.message.channel_session['user']
        table_id = action['table_id']
        self.message.channel_session['table_id'] = table_id
        table = BridgeTable.objects.get(pk=table_id)

        # add self to table channels group
        # remove self from all group
        self.add(str(table_id))
        self.remove('all')

        self.send_to_group(username, {
                      'type': 'JOIN_TABLE',
                      'table_id': table_id
                      })

        # get dealer
        direction_to_act = table.direction_to_act
        self.send_to_group(username, {
                      'type': 'GET_NEXT_ACTOR',
                      'direction_to_act': direction_to_act
                      })

        # get auction
        auction = BridgeTable.objects.get(pk=table_id).auction
        self.send_to_group(username, {
                      'type': 'GET_AUCTION',
                      'auction': list(auction)
                      })

        # get contract
        if table.contract != None:
          contract = table.contract.contract_string
          self.send_to_group(str(table_id), {
                        'type': 'GET_CONTRACT',
                        'contract': contract
                        })

    @action('LEAVE_TABLE')
    def LEAVE_TABLE(self, action):
        print('LEAVE_TABLE')
        username = self.message.channel_session['user']
        table_id = self.message.channel_session['table_id']

        #leave seat if sitting

        # send leave table action to front end
        self.send_to_group(username, {
                      'type': 'LEAVE_TABLE',
                      'table_id': table_id
                      })

        # remove self from table channels group
        self.remove(str(table_id))
        # add self to all group
        self.add('all')
        # remove table_id
        self.message.channel_session['table_id'] = ''

    @action('TAKE_SEAT')
    def TAKE_SEAT(self, action):
        print('TAKE_SEAT')
        username = self.message.channel_session['user']
        user = User.objects.get(username=username)

        # leave seat if sitting
        self.LEAVE_SEAT(action)
        seat = action['seat']
        table_id = self.message.channel_session['table_id']
        table = BridgeTable.objects.get(pk=table_id)
        deal = table.deal
        hand = deal.direction(seat)

        # take seat on backend
        table.take_seat(username, seat)

        # send hand distributions to front send
        self.GET_DISTRIBUTIONS()

        # send take seat action to front end
        self.send_to_group(username, {
                      'type': 'TAKE_SEAT',
                      'seat': seat
                      })

        # get hand
        self.GET_HAND(hand)

        # get trick if in the middle of play
        self.GET_TRICK()

        if table.contract != None:
            self.SET_CONTRACT(table)


    @action('LEAVE_SEAT')
    def LEAVE_SEAT(self, action):
        print('LEAVE_SEAT')
        username = self.message.channel_session['user']
        table_id = self.message.channel_session['table_id']
        user = User.objects.get(username=username)
        table = BridgeTable.objects.get(pk=table_id)

        # leave seat on backend if sitting
        if hasattr(user, 'seat'):
            seat = user.seat.direction
            print(seat)
            table.leave_seat(username)
            print('2')
            print(user.seat.direction)

            # send action to frontend
            self.send_to_group(username, {
                          'type': 'LEAVE_SEAT',
                          'seat': seat
                          })

            print(hasattr(user, 'seat'))

        print(hasattr(user, 'seat'))

    @action('MAKE_BID')
    def MAKE_BID(self, action):
        print('MAKE_BID')
        username = self.message.channel_session['user']
        table_id = self.message.channel_session['table_id']
        bid = action['bid']
        table = BridgeTable.objects.get(pk=table_id)

        # set contract if auction is over, otherwise it does nothing
        table.next_actor()
        table.set_contract()

        # set next actor
        direction_to_act = table.direction_to_act

        # update auction
        table.update_auction(bid)

        # send auction
        auction = list(table.auction)
        self.send_to_group(str(table_id), {
                      'type': 'GET_AUCTION',
                      'auction': auction
                      })

        # send next actor information
        self.GET_NEXT_ACTOR(direction_to_act)

        # if contract is set, send contract
        if table.contract != None:
            self.SET_CONTRACT(table)

    @action('GET_HAND')
    def GET_HAND(self, hand):
        print('GET_HAND')
        username = self.message.channel_session['user']
        self.send_to_group(username, {
                      'type': 'GET_HAND',
                      'hand': {
                            'spades':hand.spades,
                            'hearts':hand.hearts,
                            'diamonds':hand.diamonds,
                            'clubs':hand.clubs,
                        }
                      })

    def SET_CONTRACT(self, table):
        username = self.message.channel_session['user']
        table_id = self.message.channel_session['table_id']
        contract = table.contract.contract_string
        declarer = table.contract.declarer
        dummy_hand = table.deal.direction(find_dummy(declarer))

        self.GET_CONTRACT(contract)

        self.GET_DUMMY_HAND(dummy_hand)

        self.GET_DECLARER(declarer)


    def GET_CONTRACT(self, contract):
        username = self.message.channel_session['user']
        table_id = self.message.channel_session['table_id']
        self.send_to_group(str(table_id), {
                      'type': 'GET_CONTRACT',
                      'contract': contract
                      })

    def GET_DUMMY_HAND(self, dummy_hand):
        username = self.message.channel_session['user']
        table_id = self.message.channel_session['table_id']
        self.send_to_group(str(table_id), {
                  'type': 'GET_DUMMY_HAND',
                  'hand': {
                        'spades':dummy_hand.spades,
                        'hearts':dummy_hand.hearts,
                        'diamonds':dummy_hand.diamonds,
                        'clubs':dummy_hand.clubs,
                    }
                  })

    def GET_DECLARER(self, declarer):
        username = self.message.channel_session['user']
        table_id = self.message.channel_session['table_id']
        self.send_to_group(str(table_id), {
                      'type': 'GET_DECLARER',
                      'declarer': declarer
                      })

    def GET_NEXT_ACTOR(self, direction_to_act):
        username = self.message.channel_session['user']
        table_id = self.message.channel_session['table_id']
        self.send_to_group(str(table_id), {
                      'type': 'GET_NEXT_ACTOR',
                      'direction_to_act': direction_to_act
                      })

    def GET_DISTRIBUTIONS(self):
        username = self.message.channel_session['user']
        table_id = self.message.channel_session['table_id']
        table = BridgeTable.objects.get(pk=table_id)
        deal = table.deal
        north = {'spades': len(deal.north.spades),
                'hearts': len(deal.north.hearts),
                'diamonds': len(deal.north.diamonds),
                'clubs': len(deal.north.clubs)}
        south = {'spades': len(deal.south.spades),
                'hearts': len(deal.south.hearts),
                'diamonds': len(deal.south.diamonds),
                'clubs': len(deal.south.clubs)}
        east = {'spades': len(deal.east.spades),
                'hearts': len(deal.east.hearts),
                'diamonds': len(deal.east.diamonds),
                'clubs': len(deal.east.clubs)}
        west = {'spades': len(deal.west.spades),
                'hearts': len(deal.west.hearts),
                'diamonds': len(deal.west.diamonds),
                'clubs': len(deal.west.clubs)}

        self.send_to_group(str(table_id), {
                      'type': 'GET_DISTRIBUTIONS',
                      'hands': {'north':north,
                                'south': south,
                                'east': east,
                                'west': west}
                      })

    def GET_TRICK(self):
        username = self.message.channel_session['user']
        table_id = self.message.channel_session['table_id']
        table = BridgeTable.objects.get(pk=table_id)
        trick = table.trick
        self.send_to_group(str(table_id), {
                      'type': 'GET_TRICK',
                      'trick': {
                                'north': trick.north,
                                'south': trick.south,
                                'east': trick.east,
                                'west': trick.west,
                            }
                      })

    def GET_TRICK_STRING(self):
        username = self.message.channel_session['user']
        table_id = self.message.channel_session['table_id']
        table = BridgeTable.objects.get(pk=table_id)
        trick_string = table.trick_string
        self.send_to_group(str(table_id), {
                      'type': 'GET_TRICK_STRING',
                      'trick_string': table.trick_string
                      })

    # card play actions
    @action('PLAY_CARD')
    def PLAY_CARD(self, action):
        print('PLAY_CARD')
        username = self.message.channel_session['user']
        table_id = self.message.channel_session['table_id']
        table = BridgeTable.objects.get(pk=table_id)


        if table.contract != None:
            card = action['card']
            user = User.objects.get(username=username)
            seat = user.seat.direction
            direction_to_act = table.direction_to_act


            # check if card played is valid
            is_valid_card = True
            # check if first card in trick matches suit
            if table.trick.trick_string:
                suit_led = table.trick.trick_string[2]
                print(suit_led)
                # check if card matches first card in trick or out of that suit
                print(table.deal.direction(direction_to_act).get_suit(suit_led))
                print(table.deal.direction(direction_to_act).hearts)
                if suit_led == card[1] or not table.deal.direction(direction_to_act).get_suit(suit_led):
                    pass
                else:
                    is_valid_card = False


            if is_valid_card:
                print('valid')
                table.play_card(seat[0].upper(), card)

                # tell front end who is next actor
                direction_to_act = table.direction_to_act
                self.GET_NEXT_ACTOR(direction_to_act)

                # send updated trick
                self.GET_TRICK()

                # update hand frontend
                hand = table.deal.direction(seat)
                self.GET_HAND(hand)

                # get dummy's hand
                declarer = table.contract.declarer
                dummy_hand = table.deal.direction(find_dummy(declarer))
                self.GET_DUMMY_HAND(dummy_hand)

                # update distributions
                self.GET_DISTRIBUTIONS()

                # send updated trick string if trick is complete
                self.GET_TRICK_STRING()


            else:
                raise ValueError('Must follow suit')
        else:
            raise ValueError('Contract not set, card cannot be played')

    @action('MODIFY_USER_LIST')
    def MODIFY_USER_LIST(self, content, is_logged_in=True, username=None, user_list=[]):
        print('MODIFY_USER_LIST')
        if username == None:
            self.send_to_group('all', content)
        else:
            self.send_to_group('all', {
                          'type': 'MODIFY_USER_LIST',
                          'is_logged_in': is_logged_in,
                          'username': username,
                          'users': user_list
                          })


    # chat actions
    @action('CHAT_MESSAGE')
    def CHAT_MESSAGE(self, content):
        print('CHAT_MESSAGE')
        receiver = content['receiver']
        username = content['username']
        table_id = self.message.channel_session['table_id']
        # global chat or table chat
        if receiver == 'all':
            content['message'] = username + ': ' + content['message']
            if not table_id:
                self.send_to_group(receiver,content)
            else:
                self.send_to_group(str(table_id),content)
        # direct message
        else:
            message = content['message']
            content['message'] = 'from ' + username + ': '  + message
            self.send_to_group(receiver,content)
            content['message'] = 'to ' + receiver + ': '  + message
            self.send_to_group(username,content)
