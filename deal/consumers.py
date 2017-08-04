import json
import random
from channels import Group
from django.contrib.auth import get_user_model
from channels.auth import channel_session_user, channel_session_user_from_http
from .models import BridgeTable, UserProfile, Trick, Deal, Card
from .functions import *

User = get_user_model()

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
    send function in JS (handsocket.send(data)). Handles how hands are claimed
    by users at the current table.
    """

    # Get an iterable QuerySet of users at the current table
    current_table = BridgeTable.objects.get(pk=table_id)
    all_users = current_table.users.all()

    current_deal = current_table.deal_set.last()

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
            'disconnect': False,
            'playing': current_deal.in_play,
            'nextplay': current_deal.next_player
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


@channel_session_user_from_http
def ws_play_connect(message, table_id):
    """
    Runs when a WebSocket with the path "/table/<table_id>/play is created,
    where <table_id> is the id number of the current table.
    """

    # Accept incoming connection, add user to new group for play
    message.reply_channel.send({"accept": True})
    Group('play-%s' % table_id).add(message.reply_channel)


@channel_session_user
def ws_play_message(message, table_id):
    """
    Runs when a WebSocket with the path "/table/<table_id>/play calls its
    send function in JS (playsocket.send(data)). Handles the play logic of
    the game.
    """

    # First retrieve the table and current deal being played
    bridge_table = BridgeTable.objects.get(pk=table_id)
    current_deal = bridge_table.deal_set.last()

    # Variable used to track if game is being played and next player
    next_player = int()

    # Sending "Finish" means game is over
    if message.content['text'] == "Finish":
        current_deal.in_play = False
        current_deal.save()

    # Sending "Start" picks random person to start, will change with auction
    elif message.content['text'] == "Start":
        current_deal.next_player = random.randrange(4)
        current_deal.in_play = True
        current_deal.save()

    # Actual play logic here
    else:
        handnum_and_img = message.content['text'].split(" ")

        handnum = int(handnum_and_img[0])
        img = handnum_and_img[1]

        # Move on to next hand number for player
        current_deal.next_player = (handnum + 1) % 4
        current_deal.save()

        # Only run for very beginning of game, when first card is played
        if len(current_deal.trick_set.all()) == 0:
            # Create new Trick
            current_deal.trick_set.create()
            new_trick = current_deal.trick_set.all()[0]

            # Get the played card and add to the trick's card set
            card = current_deal.card_set.get(img_string=img)
            new_trick.card_set.add(card)

            # First card sets the trick's leading suit, others follow suit
            new_trick.leading_suit = card.suit
            new_trick.save()

            # Remove the card from the deal, now card only exists in the trick
            current_deal.card_set.remove(card)
        else:
            # Get the last trick/trick currently being played, and played card
            last_trick = current_deal.trick_set.last()
            card = current_deal.card_set.get(img_string=img)

            # Set suit of the trick if the card played is the first card
            if len(last_trick.card_set.all()) == 0:
                last_trick.leading_suit = card.suit
                last_trick.save()

            # Add card to trick, remove from deal if suit matches
            if card.suit == last_trick.leading_suit:
                last_trick.card_set.add(card)
                current_deal.card_set.remove(card)

            # Must check if player can play card of differing suit
            else:
                # Get player's cards that match the trick's leading suit
                possible_suit = current_deal.card_set.filter(handnum=card.handnum,
                                                             suit=last_trick.leading_suit)

                # If no such cards exist, player can play the card
                if len(possible_suit.all()) == 0:
                    last_trick.card_set.add(card)
                    current_deal.card_set.remove(card)

                # If cards do exist, player needs to pick a correct suit
                else:
                    message.content['text'] = "SuitError"

                    # Rollback next_player variable, player must choose new card
                    current_deal.next_player -= 1

                    if current_deal.next_player == -1:
                        current_deal.next_player = 3
                    current_deal.save()

            if len(current_deal.card_set.all()) == 0:
                current_deal.in_play = False
                current_deal.save()

                populate_table(bridge_table, current_deal.board_number + 1)

            # If card played is 4th card in trick, want to evaluate trick and
            # set appropriate next player, also create new trick
            elif len(last_trick.card_set.all()) == 4:
                current_deal.next_player = last_trick.evaluate()
                current_deal.save()
                current_deal.trick_set.create()



    cards = bridge_table.deal_set.last().card_set.all()
    imgs = list()
    for i in cards:
        imgs.append(i.img_string)

    # Send info back to JS, accessible in playsocket.onmessage
    Group('play-%s' % table_id).send({
        'text': json.dumps({
            'info': message.content['text'],
            'playing': current_deal.in_play,
            'nextplay': current_deal.next_player,
            'nextcards': imgs
        })
    })

@channel_session_user
def ws_play_disconnect(message, table_id):
    """
    Runs when a WebSocket with the path "/table/<table_id>/play disconnects,
    either through leaving the table or logging out. Disconnects the game.
    """
    Group('play-%s' % table_id).discard(message.reply_channel)
