import json
from channels import Group

from django.contrib.auth import get_user_model, authenticate
User = get_user_model()

from .engine import ReduxConsumer, action

from .models import BridgeTable, Deal

from .robot import RobotCardPlay

from numpy import random
import re

# def is_number(s):
#     try:
#         float(s)
#         return True
#     except ValueError:
#         pass
#
#     try:
#         import unicodedata
#         unicodedata.numeric(s)
#         return True
#     except (TypeError, ValueError):
#         pass
#
#     return False

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

# def find_winner(dealer, num):
#     if dealer == 'north':
#         d = 0
#     elif seat == 'east':
#         d = 1
#     elif seat == 'south':
#         d = 2
#     elif seat == 'west':
#         d = 3
#
#     n = (d + num) % 4
#
#     if n % 4 == 0:
#         return 'north'
#     elif n % 4 == 1:
#         return 'east'
#     elif n % 4 == 2:
#         return 'south'
#     elif n % 4 == 3:
#         return 'west'

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

        # send action to frontend
        if content['table_type'] == 'single':
            # create table and generate deal with robots
            table = BridgeTable.objects.create_deal(robot=True, NS_min=True)
            # print('robot')
            # print(table.north.robot)
            # print(table.south.robot)
            content['id'] = table.id
            self.JOIN_TABLE(content)
            content['seat'] = 'south'
            self.TAKE_SEAT(content)
        else:
            # create table and generate deal without robots
            table = BridgeTable.objects.create_deal()
            # print('robot')
            # print(table.north.robot)
            # print(table.south.robot)
            content['id'] = table.id
            self.send_to_group('all',content)
        table.save()

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
        # print(action)
        username = self.message.channel_session['user']
        table_id = action['id']
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
        self.GET_AUCTION(list(auction))

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
        # check if anyone is sitting first
        if table.is_seat_empty(seat):
            table.take_seat(username, seat)

            # send hand distributions to front send
            self.GET_DISTRIBUTIONS()

            # send point counts to front end
            self.GET_POINT_COUNT()

            # send take seat action to front end
            self.send_to_group(username, {
                          'type': 'TAKE_SEAT',
                          'seat': seat
                          })

            # get hand
            self.GET_HAND(hand, seat)

            # get trick if in the middle of play
            self.GET_TRICK()
            self.SUIT_LED()

            # update table members
            self.UPDATE_TABLE_SEATS()

            if table.contract != None:
                self.GET_CONTRACT(table.contract.contract_string)
                declarer = table.contract.declarer
                dummy_hand = table.deal.direction(find_dummy(declarer))
                self.GET_DUMMY_HAND(dummy_hand)
                self.GET_DECLARER(declarer)

    @action('LEAVE_SEAT')
    def LEAVE_SEAT(self, action):
        print('LEAVE_SEAT')
        username = self.message.channel_session['user']
        table_id = self.message.channel_session['table_id']
        user = User.objects.get(username=username)
        table = BridgeTable.objects.get(pk=table_id)

        # leave seat on backend if sitting
        if hasattr(user, 'seat'):

            # print('0')
            direction = user.seat.direction
            # print('1')
            print(user.seat.user)
            print(table.get_seat(direction).user)
            table.leave_seat(direction)
            # print('2')
            # table = BridgeTable.objects.get(pk=table_id)
            # user = User.objects.get(username=username)
            # print(user.seat.user)
            # print(table.get_seat(direction).user)
            # user.seat = None
            # user.save()


            # send action to frontend
            self.send_to_group(username, {
                          'type': 'LEAVE_SEAT',
                          'seat': direction
                          })

            # print(hasattr(user, 'seat'))


    @action('MAKE_BID')
    def MAKE_BID(self, action):
        print('MAKE_BID')
        username = self.message.channel_session['user']
        table_id = self.message.channel_session['table_id']
        bid = action['bid']
        table = BridgeTable.objects.get(pk=table_id)

        # update auction
        table.update_auction(bid)

        # send auction actions to front end
        self.auction_front_end_actions()

        # set next actor
        # table.next_actor()
        self.GET_NEXT_ACTOR()


    def auction_front_end_actions(self, table_id=None):
        if table_id == None:
            table_id = self.message.channel_session['table_id']
        table = BridgeTable.objects.get(pk=table_id)

        # if auction is over, ask declarer for strain
        if table.phase == 'play':
            declarer = table.find_declarer()
            print('after find declarer')
            # print(table.level)
            self.GET_DECLARER(declarer)
            # ask strain on front end
            self.ASK_STRAIN()

        # send auction
        auction = list(table.auction)
        # print(auction)
        self.GET_AUCTION(auction)


    @action('CHOOSE_STRAIN')
    def CHOOSE_STRAIN(self, action):
        print('CHOOSE_STRAIN')
        # print(action)
        username = self.message.channel_session['user']
        table_id = self.message.channel_session['table_id']
        table = BridgeTable.objects.get(pk=table_id)
        user = User.objects.get(username=username)

        level = table.level
        strain = action['suit']
        declarer = user.seat.direction

        # reset special phase
        self.send_to_group(str(table_id), {
                      'type': 'RESET_PHASE'
                      })

        # if contract is set, send contract
        self.SET_CONTRACT(level, strain, declarer)


    # @action('GET_HAND')
    def GET_HAND(self, hand, seat):
        print('GET_HAND')
        username = self.message.channel_session['user']
        table_id = self.message.channel_session['table_id']
        table = BridgeTable.objects.get(pk=table_id)
        if username == str(table.get_seat(seat).user):
            self.send_to_group(username, {
                          'type': 'GET_HAND',
                          'hand': {
                                'spades':hand.spades,
                                'hearts':hand.hearts,
                                'diamonds':hand.diamonds,
                                'clubs':hand.clubs,
                            }
                          })

    def SET_CONTRACT(self, level, strain, declarer):
        print('SET_CONTRACT')
        username = self.message.channel_session['user']
        table_id = self.message.channel_session['table_id']
        table = BridgeTable.objects.get(pk=table_id)

        # print(level)
        # print(strain)
        # print(declarer)

        table.set_contract(level, strain, declarer)

        contract = table.contract.contract_string

        print('contract')
        print(contract)

        self.GET_CONTRACT(contract)

        dummy_hand = table.deal.direction(find_dummy(declarer))
        self.GET_DUMMY_HAND(dummy_hand)

        self.GET_DECLARER(declarer)

        self.GET_NEXT_ACTOR()

    def ASK_STRAIN(self):
        table_id = self.message.channel_session['table_id']
        self.send_to_group(str(table_id), {
                      'type': 'ASK_STRAIN'
                      })

    def SUIT_LED(self):
        table_id = self.message.channel_session['table_id']
        table = BridgeTable.objects.get(pk=table_id)
        suit = ''

        if len(table.trick.trick_string) != 0:
            suit = table.trick.trick_string[2]

        self.send_to_group(str(table_id), {
                      'type': 'SUIT_LED',
                      'suit': suit
                      })

    def GET_AUCTION(self, auction):
        table_id = self.message.channel_session['table_id']
        self.send_to_group(str(table_id), {
                      'type': 'GET_AUCTION',
                      'auction': auction
                      })


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

    def GET_PREV_TRICK(self):
        username = self.message.channel_session['user']
        table_id = self.message.channel_session['table_id']
        table = BridgeTable.objects.get(pk=table_id)
        trick = table.prev_trick
        self.send_to_group(str(table_id), {
                      'type': 'GET_PREV_TRICK',
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

    def UPDATE_TABLE_SEATS(self):
        print('UPDATE_TABLE_SEATS')
        username = self.message.channel_session['user']
        table_id = self.message.channel_session['table_id']
        table = BridgeTable.objects.get(pk=table_id)
        north, south, east, west = '','','',''
        # print(table)
        # print(table.north)
        # try:
        #     print(table.north.user)
        # except Seat.DoesNotExist:
        #     pass

        if table.north.user != None:
            north = str(table.north.user)
        if table.south.user != None:
            south = str(table.south.user)
        if table.east.user != None:
            east = str(table.east.user)
        if table.west.user != None:
            west = str(table.west.user)

        self.send_to_group(str(table_id), {
                      'type': 'UPDATE_TABLE_SEATS',
                      'seats': {
                                'north': north,
                                'south': south,
                                'east': east,
                                'west': west,
                            }
                      })

    def GET_POINT_COUNT(self):
        username = self.message.channel_session['user']
        table_id = self.message.channel_session['table_id']
        table = BridgeTable.objects.get(pk=table_id)
        north = table.deal.north.hcp
        south = table.deal.south.hcp
        east = table.deal.east.hcp
        west = table.deal.west.hcp

        self.send_to_group(username, {
                      'type': 'GET_POINT_COUNT',
                      'hands': {'north': north,
                                'south': south,
                                'east': east,
                                'west': west}
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

            # check if card played is valid
            is_valid_card = table.is_valid_card(card)
            # print('is valid?')
            # print(is_valid_card)

            if is_valid_card:

                # send played card to front end
                self.play_card_front_end(card)
                print('table equals update')
                table = BridgeTable.objects.get(pk=table_id)
                print('is_valid_card consumers.py')
                print(table.deal.hand_string)

                # tell front end who is next actor
                self.GET_NEXT_ACTOR()

            else:
                raise ValueError('Must follow suit')
        else:
            raise ValueError('Contract not set, card cannot be played')

    def play_card_front_end(self, card, table_id=None):
        if table_id == None:
            table_id = self.message.channel_session['table_id']
        table = BridgeTable.objects.get(pk=table_id)

        # print('play_card_front_end')
        # print(table.direction_to_act)
        # print(card)

        table.play_card(table.direction_to_act[0].upper(), card)

        # # send updated trick
        # self.GET_TRICK()
        #
        # # update hand frontend
        # seat = table.direction_to_act
        # hand = table.deal.direction(seat)
        # self.GET_HAND(hand, seat)
        #
        # # get dummy's hand
        # declarer = table.contract.declarer
        # dummy_hand = table.deal.direction(find_dummy(declarer))
        # self.GET_DUMMY_HAND(dummy_hand)
        #
        # # update distributions
        # self.GET_DISTRIBUTIONS()
        #
        # # send updated trick string if trick is complete
        # self.GET_TRICK_STRING()
        #
        # if table.EW_tricks_taken + table.NS_tricks_taken == 13:
        #     self.CALC_SCORE()


    @action('CALC_SCORE')
    def CALC_SCORE(self):
        print('CALC_SCORE')
        username = self.message.channel_session['user']
        table_id = self.message.channel_session['table_id']
        table = BridgeTable.objects.get(pk=table_id)
        declarer = table.contract.declarer
        level = table.contract.level

        if declarer == 'north' or declarer == 'south':
            tricks_taken = table.NS_tricks_taken
        else:
            tricks_taken = table.EW_tricks_taken

        if tricks_taken >= level + 6 :
            print(level * 30)
        else:
            print(((level + 6) - tricks_taken) * 50)

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
            content['author'] = username
            if not table_id:
                self.send_to_group(receiver,content)
            else:
                self.send_to_group(str(table_id),content)
        # direct message
        # else:
        #     message = content['message']
        #     content['message'] = 'from ' + username + ': '  + message
        #     self.send_to_group(receiver,content)
        #     content['message'] = 'to ' + receiver + ': '  + message
        #     self.send_to_group(username,content)

    def GET_NEXT_ACTOR(self):
        print('GET_NEXT_ACTOR')
        username = self.message.channel_session['user']
        table_id = self.message.channel_session['table_id']

        table = BridgeTable.objects.get(pk=table_id)
        next_seat = table.get_seat(table.find_next_actor())
        if len(table.trick.trick_string) == 12:
            next_seat = table.get_seat(table.trick_winner())

        def send_next_actor_to_front_end(self, direction):
            # only send information if contract has been set
            if table.contract:

                # send updated trick string if trick is complete
                self.GET_TRICK_STRING()

                # send updated trick
                self.GET_TRICK()
                self.GET_PREV_TRICK()
                self.SUIT_LED()

                # update hand frontend
                seat = table.direction_to_act
                hand = table.deal.direction(seat)
                self.GET_HAND(hand, seat)
                other_seat = find_dummy(seat)
                other_hand = table.deal.direction(other_seat)
                self.GET_HAND(other_hand, other_seat)

                # get dummy's hand
                declarer = table.contract.declarer
                dummy_hand = table.deal.direction(find_dummy(declarer))
                self.GET_DUMMY_HAND(dummy_hand)

                # update distributions
                self.GET_DISTRIBUTIONS()

                if table.EW_tricks_taken + table.NS_tricks_taken == 13:
                    self.CALC_SCORE()

            self.send_to_group(str(table_id), {
                          'type': 'GET_NEXT_ACTOR',
                          'direction_to_act': direction
                          })

            # self.send_to_group(str(table_id), {
            #               'type': 'GET_NEXT_ACTOR',
            #               'direction_to_act': table.direction_to_act
            #               })

        table = BridgeTable.objects.get(pk=table_id)
        print('tricks')
        print(table.EW_tricks_taken + table.NS_tricks_taken)
        if table.EW_tricks_taken + table.NS_tricks_taken == 13:
            self.CALC_SCORE()
        elif (next_seat.robot and
                (not table.contract or find_dummy(table.contract.declarer) != next_seat.direction)):
            send_next_actor_to_front_end(self, table.direction_to_act)
            table.next_actor()
            print('table.EW_tricks_taken + table.NS_tricks_taken')
            print(table.EW_tricks_taken + table.NS_tricks_taken)
            if table.EW_tricks_taken + table.NS_tricks_taken == 13:
                send_next_actor_to_front_end(self, table.direction_to_act)
                self.CALC_SCORE()
            else:
                self.Robot_AI(table_id)
                self.GET_NEXT_ACTOR()
        else:
            # print('GET_NEXT_ACTOR')
            # print(table.direction_to_act)
            table.next_actor()
            # print(table.direction_to_act)
            send_next_actor_to_front_end(self, table.direction_to_act)


    def Robot_AI(self, table_id):
        table = BridgeTable.objects.get(pk=table_id)
        if table.phase == 'auction':
            table.update_auction('P')
            # table.save()
            # print('from robot ai')
            # print(table.auction)
            # print(table.id)
            self.auction_front_end_actions()
        elif table.phase == 'play':
            # play random card
            card = RobotCardPlay(table)
            print(card)
            self.play_card_front_end(card)
            # self.play_card_front_end()
