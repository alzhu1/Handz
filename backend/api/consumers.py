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

@channel_session_user_from_http
def ws_lobby_connect(message):
    LobbyEngine(message).connect()

@channel_session_user
def ws_lobby_message(message):
    LobbyEngine.dispatch(message)

@channel_session_user
def ws_lobby_disconnect(message):
    LobbyEngine(message).disconnect()



@channel_session_user_from_http
def ws_lobby_connect(message):
    message.reply_channel.send({"accept": True})

    Group('lobby').add(message.reply_channel)

    print(message.user)

    Group('lobby').send({
        'text': json.dumps({
            'login': True
        })
    })

@channel_session_user
def ws_lobby_message(message):
    print(message.content)

    content = json.loads(message.content['text'])

    if content[0] == "Login":
        user = User.objects.get(auth_token=content[1])
        user.is_logged_in = True
        user.save()

    if content[0] == "Logout":
        user = User.objects.get(auth_token=content[1])
        user.is_logged_in = False
        user.save()

    if content[0] == "Created Text":
        Group('lobby').send({
            'text': json.dumps({
                'createText': True,
                'text': content[1],
            })
        })


@channel_session_user
def ws_lobby_disconnect(message):
    Group('lobby').discard(message.reply_channel)



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
