import json
import random
from channels import Group
from django.contrib.auth import get_user_model
from channels.auth import channel_session_user, channel_session_user_from_http

from .models import Text
from .serializers import TextSerializer, UserSerializer

from django.contrib.auth import get_user_model
User = get_user_model()

from .engine.lobby import LobbyEngine

from channels.generic.websockets import JsonWebsocketConsumer
from urllib.parse import parse_qs

@channel_session_user_from_http
def ws_lobby_connect(message):
    LobbyEngine(message).connect()

@channel_session_user
def ws_lobby_message(message):
    LobbyEngine.dispatch(message)

@channel_session_user
def ws_lobby_disconnect(message):
    LobbyEngine(message).disconnect()

class ChatConsumer(JsonWebsocketConsumer):
    http_user = True
    strict_ordering = False

    def connection_groups(self, **kwargs):
        return ["test"]

    def connect(self, message, **kwargs):
        # print(self.message['headers'])
        # print(self.message.user)
        # print(self.message.reply_channel)
        # print(self.message.channel_session)
        # print(parse_qs(self.message.content["query_string"]))
        # print('get user')
        # print(self.message.channel_session.get('user'))
        # print(self.message.channel_session.__dict__)
        self.message.reply_channel.send({"accept": True})
        Group('chat').add(self.message.reply_channel)
        Group('users').add(self.message.reply_channel)
        Group('users').send({
            'text': json.dumps({
                'username': self.message.user.username,
            })
        })

    def getUsername(self, username):
        self.message.channel_session['user'] = username

    def receive(self, content, **kwargs):
        if content['action']=='chat':
            print(json.dumps(content))
            Group('chat').send({
                'text': json.dumps(content)
            })

    def disconnect(self, message, **kwargs):
        Group('users').send({
            'text': json.dumps({
                'username': self.message.user.username,
            })
        })

        Group("chat").discard(self.message.reply_channel)
        Group("users").discard(self.message.reply_channel)

#to be deprecated
@channel_session_user_from_http
def ws_signup_connect(message):
    message.reply_channel.send({"accept": True})

    Group('signup').add(message.reply_channel)

    # Sends first message to WebSocket, handled in socket.onmessage in JS
    Group('signup').send({
        'text': json.dumps({
            'test': False
        })
    })

@channel_session_user
def ws_signup_message(message):
    print(json.loads(message.content["text"]))

    new_user = json.loads(message.content["text"])
    data = {
        'username': new_user[1],
        'password': new_user[2]
    }

    if len(User.objects.filter(username=new_user[1])) == 0:
        user = UserSerializer(data=data)
        user.is_valid()
        user.save()


    Group('signup').send({
        'text': json.dumps({
            'text': "success"
        })
    })

@channel_session_user
def ws_signup_disconnect(message):
    Group('signup').discard(message.reply_channel)
