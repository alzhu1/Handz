import json
import random
from channels import Group
from django.contrib.auth import get_user_model
from channels.auth import channel_session_user, channel_session_user_from_http

from .models import Text
from .serializers import TextSerializer, UserSerializer

from django.contrib.auth import get_user_model
User = get_user_model()

@channel_session_user_from_http
def ws_lobby_connect(message):
    message.reply_channel.send({"accept": True})

    Group('lobby').add(message.reply_channel)

    # Group('lobby').send({
    #     'text': json.dumps({
    #         'test': False
    #     })
    # })

@channel_session_user
def ws_lobby_message(message):
    print(message.content)

    new_text = json.loads(message.content['text'])

    test_text = TextSerializer(data={'text':"OASIFBAOSIFB", 'rand_bool':False})
    test_text.is_valid()

    Group('lobby').send({
        'text': json.dumps({
            'text': new_text,
            'attempt': test_text.data
        })
    })

    Group('signup').send({
        'text': json.dumps({
            'cross lobby': True
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
        'username': new_user[0],
        'password': new_user[1]
    }

    if len(User.objects.filter(username=new_user[0])) == 0:
        user = UserSerializer(data=data)
        user.is_valid()
        user.save()

    print(User.objects.all())

    Group('signup').send({
        'text': json.dumps({
            'text': "success"
        })
    })

@channel_session_user
def ws_signup_disconnect(message):
    Group('signup').discard(message.reply_channel)
