import random

def RobotCardPlay(table):

    suit = None
    if table.trick.trick_string:
        suit = table.trick.trick_string[2]

    hand = table.deal.direction(table.direction_to_act)
    print('robot card play')
    print(suit)

    if suit and len(hand.get_suit(suit))>0:
        card = random.choice(hand.get_suit(suit)) + suit
    else:
        suit = []
        for s in ['S','H','D','C']:
            if len(hand.get_suit(s)) > 0:
                suit.append(s)
        suit = random.choice(suit)
        card = random.choice(hand.get_suit(suit)) + suit
    return card
