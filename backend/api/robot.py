import random

def RobotCardPlay(table):

    suit = None
    if table.trick.trick_string:
        suit = table.trick.trick_string[2]

    hand = table.deal.direction(table.direction_to_act)

    if suit:
        card = random.choice(hand.get_suit(suit)) + suit
    else:
        suit = random.choice(['S','H','D','C'])
        card = random.choice(hand.get_suit(suit)) + suit

    return card
