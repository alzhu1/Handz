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

        print(tablelist)
        self.send_to_group(username, {
                      'type': 'GET_TABLES',
                      'tablelist': tablelist
                      })

    @action('JOIN_TABLE')
    def JOIN_TABLE(self, action):
        print('JOIN_TABLE')
        username = self.message.channel_session['user']
        table_id = action['table_id']

        # add self to table channels group
        # remove self from all group
        self.add(str(table_id))
        self.remove('all')

        self.send_to_group(username, {
                      'type': 'JOIN_TABLE',
                      'table_id': table_id
                      })


    @action('LEAVE_TABLE')
    def LEAVE_TABLE(self, action):
        print('LEAVE_TABLE')
        username = self.message.channel_session['user']
        table_id = action['table_id']

        self.send_to_group(username, {
                      'type': 'LEAVE_TABLE',
                      'table_id': table_id
                      })

        # remove self from table channels group
        # add self to all group
        self.remove(str(table_id))
        self.add('all')

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
        seat = action['seat']
        table_id = action['table_id']
        deal = BridgeTable.objects.get(pk=table_id).deal
        hand = deal.direction(seat)
        self.send_to_group(username, {
                      'type': 'TAKE_SEAT',
                      'seat': seat,
                      'table_id': table_id
                      })
        # print(hand.spades)
        # print(hand.hearts)
        # print(hand.diamonds)
        # print(hand.clubs)

        self.GET_HAND(hand)

    @action('LEAVE_SEAT')
    def LEAVE_SEAT(self, action):
        print('LEAVE_SEAT')
        username = self.message.channel_session['user']
        seat = action['seat']
        table_id = action['table_id']
        self.send_to_group(username, {
                      'type': 'LEAVE_SEAT',
                      'seat': seat,
                      'table_id': table_id
                      })



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
        receiver = content['receiver']
        username = content['username']
        if receiver == 'all' or receiver.isdigit():
            content['message'] = username + ': ' + content['message']
            self.send_to_group(receiver,content)
        else:
            message = content['message']
            content['message'] = 'from ' + username + ': '  + message
            self.send_to_group(receiver,content)
            content['message'] = 'to ' + receiver + ': '  + message
            self.send_to_group(username,content)
