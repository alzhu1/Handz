from channels import Group
from .base import ActionEngine

import json

class ChatEngine(ActionEngine):
    def connect(self):
        self.message.reply_channel.send({"accept": True})
        self.add("chat")

    def disconnect(self):
        Group("chat").discard(self.message.reply_channel)

    # def SEND_CHAT(self, action):
    #     self.send_to_group("chat", {
    #         "createText": True,
    #         "text": action["payload"]
    #     })
