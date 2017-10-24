import json
import random
from channels import Group
from django.contrib.auth import get_user_model
from channels.auth import channel_session_user, channel_session_user_from_http

from .serializers import UserSerializer
from django.contrib.auth import get_user_model, authenticate
User = get_user_model()

from channels.generic.websockets import JsonWebsocketConsumer
from urllib.parse import parse_qs

class SockConsumer(JsonWebsocketConsumer):
    channel_session_user = True
    http_user = True
    strict_ordering = False

    def get_control_channel(self, user=None):
        # Current control channel name, unless told to return `user`'s
        # control channel
        if user is None:
            user = self.message.channel_session['user']
        return 'control.{0}'.format(user)

    def engine(self, message):
        action_type = message['type'].upper()

        if hasattr(self, action_type):
            method = getattr(self, action_type)
            return method(message)
        else:
            raise NotImplementedError('{} not implemented'.format(action_type))

    def LOGIN(self, content):
        print('LOGIN')
        username = content['username']
        password = content['password']
        user = authenticate(username=username,password=password)
        user.is_logged_in = True
        user.save()

        self.message.channel_session['user'] = username
        print(self.message.channel_session.get('user'))

        control = self.get_control_channel()
        Group(control).add(self.message.reply_channel)

        Group('global').add(self.message.reply_channel)
        self.message.reply_channel.send({"accept": True})

        # get logged in users and dispatch
        user_list = []
        for x in User.objects.filter(is_logged_in=True):
            user_list.append(x.username)

        self.MODIFY_USER_LIST(None, True, username, user_list)



    def LOGOUT(self, content):
        print('LOGOUT')
        token = content['token']
        user = User.objects.get(auth_token=token)
        user.is_logged_in = False
        user.save()

        self.MODIFY_USER_LIST(None, False, user.username)

    def MODIFY_USER_LIST(self, content, is_logged_in=True, username=None, user_list=[]):
        print('MODIFY_USER_LIST')
        if username == None:
            Group('global').send({
                'text': json.dumps(content)
            })
        else:
            # print(is_logged_in)
            # print(username)
            # print(user_list)
            Group('global').send({
                'text': json.dumps({
                          'type': 'MODIFY_USER_LIST',
                          'is_logged_in': is_logged_in,
                          'username': username,
                          'users': user_list,
                        })
            })

    def CHAT_MESSAGE(self, content):
        print(self.message.channel_session.get('user'))
        Group('global').send({
            'text': json.dumps(content)
        })

    def connection_groups(self, **kwargs):
        return ["test"]

    def connect(self, message, **kwargs):
        self.message.reply_channel.send({"accept": True})
        print('connected')


    def receive(self, content, **kwargs):
        self.engine(content)

    def disconnect(self, message, **kwargs):
        print('disconnected')
        # Group("global").discard(self.message.reply_channel)
