from channels.generic.websockets import JsonWebsocketConsumer
from channels import Group
import json
import inspect


def send_action(group_name, action):
    data = {
        'text': json.dumps(action),
    }
    Group(group_name).send(data)


def action(action_type):
    def wrap(func):
        func.action_type = action_type
        return func
    return wrap

class ReduxConsumer(JsonWebsocketConsumer):

    def _get_actions(self, action_type):
        methods = inspect.getmembers(self, predicate=inspect.ismethod)
        return ([m[1] for m in methods if hasattr(m[1], 'action_type')
                and m[1].action_type == action_type])


    def add(self, group):
        Group(group).add(self.message.reply_channel)

    def send(self, action, to=None):
        if to is None:
            to = self.message.reply_channel
        to.send({
            'text': json.dumps(action),
        })

    def send_to_group(self, group, action):
        self.send(action, to=Group(group))

    def get_control_channel(self, user=None):
        # Current control channel name, unless told to return `user`'s
        # control channel
        if user is None:
            user = self.message.channel_session['user']
        return '{0}'.format(user)

    def receive(self, action, **kwargs):
        action_type = action['type'].upper()
        methods = self._get_actions(action_type)
        if not methods:
            raise NotImplementedError('{} not implemented'.format(action_type))

        [method(action) for method in methods]
