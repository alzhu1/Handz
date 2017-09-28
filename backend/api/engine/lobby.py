from channels import Group
from .base import ActionEngine

import json

class LobbyEngine(ActionEngine):
    def connect(self):
        self.message.reply_channel.send({"accept": True})
        self.add("lobby")

    def disconnect(self):
        Group("lobby").discard(self.message.reply_channel)

    def CREATE_TEXT(self, action):
        self.send_to_group("lobby", {
            "createText": True,
            "text": action["payload"]
        })
