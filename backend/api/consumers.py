import json
from channels import Group

from django.contrib.auth import get_user_model, authenticate
User = get_user_model()

from .engine import ReduxConsumer, action

class SockConsumer(ReduxConsumer):
    channel_session_user = True
    http_user = True
    strict_ordering = False

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
        user_list = []
        for x in User.objects.filter(is_logged_in=True):
            user_list.append(x.username)

        self.MODIFY_USER_LIST(None, True, username, user_list)


    @action('LOGOUT')
    def LOGOUT(self, action=None):
        print('LOGOUT')
        username = self.message.channel_session.get('user')
        print(username)
        user = User.objects.get(username=username)
        user.is_logged_in = False
        user.save()
        self.MODIFY_USER_LIST(None, False, username)

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

    @action('SIGN_UP')
    def SIGN_UP(self, content):
        print('SIGN_UP')
        username = content['username']
        password = content['password']
        user = User.objects.create_user(username=username,password=password)
        user.save()

    @action('CHAT_MESSAGE')
    def CHAT_MESSAGE(self, content):
        receiver = content['receiver']
        username = content['username']
        if receiver == 'all':
            content['message'] = username + ': ' + content['message']
            self.send_to_group(receiver,content)
        else:
            message = content['message']
            content['message'] = 'from ' + username + ': '  + message
            self.send_to_group(receiver,content)
            content['message'] = 'to ' + receiver + ': '  + message
            self.send_to_group(username,content)


    def connection_groups(self, **kwargs):
        groups = ['all']
        return groups

    def disconnect(self, message, **kwargs):
        print('disconnected')
        self.LOGOUT()
