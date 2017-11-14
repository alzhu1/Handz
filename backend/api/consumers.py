import json
from channels import Group

from django.contrib.auth import get_user_model, authenticate
User = get_user_model()

from .engine import ReduxConsumer, action

from .models import BridgeTable, Deal

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
        print(content)
        username = content['username']
        password = content['password']
        user = authenticate(username=username,password=password)
        user.is_logged_in = True
        user.save()

        self.message.channel_session['user'] = username
        self.message.channel_session['table_id'] = ''

        control = self.get_control_channel()
        self.add(control)

        # get logged in users and dispatch
        # to deprecate
        user_list = []
        for x in User.objects.filter(is_logged_in=True):
            user_list.append(x.username)

        self.MODIFY_USER_LIST(None, True, username, user_list)

        #get list of tables
        self.GET_TABLES()

    @action('SIGN_UP')
    def SIGN_UP(self, content):
        print('SIGN_UP')
        username = content['username']
        password = content['password']
        user = User.objects.create_user(username=username,password=password)
        user.save()

    @action('LOGOUT')
    def LOGOUT(self, action=None):
        print('LOGOUT')
        username = self.message.channel_session.get('user')
        print(username)
        user = User.objects.get(username=username)
        user.is_logged_in = False
        user.save()
        self.MODIFY_USER_LIST(None, False, username)

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

    @action('TAKE_SEAT')
    def TAKE_SEAT(self, action):
        print('TAKE_SEAT')
        username = self.message.channel_session['user']
        user = User.objects.get(username=username)

        # leave seat if sitting
        self.LEAVE_SEAT()

        seat = action['seat']
        table_id = self.message.channel_session['table_id']
        table = BridgeTable.objects.get(pk=table_id)
        deal = table.deal
        hand = deal.direction(seat)

        # take seat on backend
        table.take_seat(username, seat)

        user.seat = seat
        user.save()

        # send action to front end
        self.send_to_group(str(table_id), {
                      'type': 'TAKE_SEAT',
                      'seat': seat,
                      'table_id': table_id
                      })

        self.GET_HAND(hand)

    @action('LEAVE_SEAT')
    def LEAVE_SEAT(self):
        print('LEAVE_SEAT')
        username = self.message.channel_session['user']
        user = User.objects.get(username=username)
        seat = user.seat
        table_id = self.message.channel_session['table_id']
        table = BridgeTable.objects.get(pk=table_id)

        # leave seat on backend
        table.leave_seat(username, seat)
        user.seat = ''
        user.save()

        # send action to frontend
        self.send_to_group(str(table_id), {
                      'type': 'LEAVE_SEAT',
                      'seat': seat,
                      'table_id': table_id
                      })

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
            contract = table.contract.contract_string
            self.send_to_group(str(table_id), {
                          'type': 'GET_CONTRACT',
                          'contract': contract
                          })


    def GET_NEXT_ACTOR(self, direction_to_act):
        username = self.message.channel_session['user']
        table_id = self.message.channel_session['table_id']
        self.send_to_group(str(table_id), {
                      'type': 'GET_NEXT_ACTOR',
                      'direction_to_act': direction_to_act
                      })

    # card play actions
    @action('PLAY_CARD')
    def PLAY_CARD(self, action):
        print('PLAY_CARD')
        username = self.message.channel_session['user']
        table_id = self.message.channel_session['table_id']
        table = BridgeTable.objects.get(pk=table_id)
        if table.contract != None:
            user = User.objects.get(username=username)
            print('valid')
            table.play_card(user.seat[0].upper(), action['card'])

            # tell front end who is next actor
            direction_to_act = table.direction_to_act
            self.GET_NEXT_ACTOR(direction_to_act)

            # send updated trick
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
        else:
            raise ValueError('Card should not be able to be played')

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
