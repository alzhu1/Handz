import json
from channels import Group
from channels.auth import channel_session_user, channel_session_user_from_http

from django.contrib.auth.models import User
from .models import BridgeTable, UserProfile


@channel_session_user_from_http
def ws_connect(message, table_id):
    """
    Runs when a WebSocket with the path "/table/<table_id> is created,
    where <table_id> is the id number of the current table. Updates the
    page to show which hands have been taken by certain users.
    """

    # Accepts the incoming WebSocket connection
    message.reply_channel.send({"accept": True})

    # Gets the current table and user via table_id and username, and adds
    # user to the current table
    current_table = BridgeTable.objects.get(pk=table_id)
    user = User.objects.get(username=message.user.username)
    current_table.users.add(user)

    # Create a dictionary mapping users at the current table (keys) to what
    # hand they've taken (values)
    user_handnum_dict = {}

    # User list created to access values in user_handnum_dict
    user_list = list()

    # Every user at the current table is added to the dictionary and to
    # the user list, used to show which users have taken specific hands when
    # joining the table
    for user in current_table.users.all():
        user_handnum_dict[user.username] = user.userprofile.hand_position
        user_list.append(user.username)

    # Add user to this table specific Group, distinguished from other tables
    Group('table-%s' % table_id).add(message.reply_channel)

    # Sends first message to WebSocket, handled in socket.onmessage in JS
    Group('table-%s' % table_id).send({
        'text': json.dumps({
            'username': message.user.username,
            'first_connect': True,
            'disconnect': False,
            'users_handnum': user_handnum_dict,
            'users': user_list
        })
    })

@channel_session_user
def ws_message(message, table_id):
    """
    Runs when a WebSocket with the path "/table/<table_id> calls its
    send function in JS (socket.send(data)). Handles how hands are claimed
    by users at the current table.
    """

    # Get an iterable QuerySet of users at the current table
    current_table = BridgeTable.objects.get(pk=table_id)
    all_users = current_table.users.all()

    # Get the User object of whoever attempted to claim a hand via username
    user = User.objects.get(username=message.user.username)

    # Boolean dictates whether the hand a user attempts to claim is
    # already taken by another user
    to_change = True

    # If sent message was -1, don't run loop because -1 indicates a user
    # leaving their current hand
    if message.content['text'] != -1:

        # Iterate through all users at the table
        for u in all_users:

            # If anyone's hand number matches the requested hand, prevent that
            # hand from being taken by someone else
            if u.userprofile.hand_position == int(message.content['text']):
                to_change = False

    # If no one occupies the requested hand or the current user wishes to leave
    # their hand, set their hand_position to the message content
    if to_change:
        user.userprofile.hand_position = message.content['text']
        user.userprofile.save()

    # Send message back to WebSocket to make real-time updates to web page
    Group('table-%s' % table_id).send({
        "text": json.dumps({
            'handnum': message.content['text'],
            'username': message.user.username,
            'first_connect': False,
            'disconnect': False
        })
    })

@channel_session_user
def ws_disconnect(message, table_id):
    """
    Runs when a WebSocket with the path "/table/<table_id> disconnects, either
    through leaving the table or logging out. Automatically leaves whatever
    hand the disconnecting user may have had.
    """

    # Get table and user through table_id and username
    current_table = BridgeTable.objects.get(pk=table_id)
    user = User.objects.get(username=message.user.username)

    # Remove user from the current table and reset user's hand position
    current_table.users.remove(user)
    user.userprofile.hand_position = -1;
    user.userprofile.save()

    # Send disconnecting message to WebSocket to update page so any claimed
    # hand by the disconnecting user is reset
    Group('table-%s' % table_id).send({
        'text': json.dumps({
            'username': message.user.username,
            'first_connect': False,
            'disconnect': True
        })
    })

    # Removes user from this table specific group
    Group('table-%s' % table_id).discard(message.reply_channel)
