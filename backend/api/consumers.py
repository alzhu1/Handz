import json
import random
from channels import Group
from django.contrib.auth import get_user_model
from channels.auth import channel_session_user, channel_session_user_from_http

from .serializers import UserSerializer

from django.contrib.auth import get_user_model
User = get_user_model()

from channels.generic.websockets import JsonWebsocketConsumer
from urllib.parse import parse_qs

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

    def receive(self, content, **kwargs):
        print(json.dumps(content))
        Group('chat').send({
            'text': json.dumps(content)
        })

    def disconnect(self, message, **kwargs):
        Group("chat").discard(self.message.reply_channel)
