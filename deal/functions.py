from django.templatetags.static import static
from .models import Deal, BridgeTable, Card

import numpy as np

def hand_conversion(HandString):
    """
    Converts a length 52 string composed of 13 different N's, E's, S's, and W's
    to 4 lists representing cardinal directions that will contain 13 numbers
    representing 13 different cards.
    """

    # Define 4 lists here to contain cards
    Nhand = []
    Ehand = []
    Shand = []
    Whand = []

    # Loop 52 times for all cards in a deck
    for i in range(0, 52):
        card_string = ""

        # Separate suits into 4 sets of 13
        if i < 13:
            card_string = card_string + "spade"
        elif i < 26:
            card_string = card_string + "heart"
        elif i < 39:
            card_string = card_string + "diamond"
        else:
            card_string = card_string + "club"

        # Value ranges between 2 and 14, where 2-10 are the respective numbers
        # and 11-14 indicate J, Q, K, and A (see if statements)
        value = str(14 - (i % 13))
        if value == '11':
            value = 'J'
        elif value == '12':
            value = 'Q'
        elif value == '13':
            value = 'K'
        elif value == '14':
            value = 'A'

        # Concatenate value to card_string for full card name with suit/value
        card_string = card_string + " " + value

        # Distribute card strings based on the i-th letter in HandString
        if HandString[i] == "N":
            Nhand.append(card_string)
        elif HandString[i] == "E":
            Ehand.append(card_string)
        elif HandString[i] == "S":
            Shand.append(card_string)
        else:
            Whand.append(card_string)

    # Return iterable 4-tuple of hands in the order of N, E, S, W
    return (Nhand, Ehand, Shand, Whand)


def populate_table(bridge_table, pk):
    # Deck list will ultimately containg 52 letters composed of N, E, S,
    # and W, all shuffled
    deck = []

    for i in range(0, 52):
        card_string = ""
        if i < 13:
            deck.append("N")
        elif i < 26:
            deck.append("E")
        elif i < 39:
            deck.append("S")
        else:
            deck.append("W")

    # Shuffles the deck, creates a randomized deal
    np.random.shuffle(deck)

    # Create hand string by concatenating all letters in the deck list
    hand_string = ""
    for i in range(0, 52):
        hand_string = hand_string + deck[i]

        # 0 is None, 1 is NS, 2 is EW, 3 is All
        pre_vul = (pk - 1) % 16
        final_vul = (int(pre_vul / 4) + (pre_vul % 4)) % 4

    # Create a Deal object that belongs to this single bridge table
    bridge_table.deal_set.create(hand_string=hand_string, dealer=(pk - 1) % 4,
                                 vulnerability=final_vul, board_number=pk,
                                 in_play=False)

    deal = bridge_table.deal_set.last()
    hands = hand_conversion(hand_string)

    Nhand = list()
    Ehand = list()
    Shand = list()
    Whand = list()
    allhands = (Nhand, Ehand, Shand, Whand)

    counter = 0
    for hand in hands:
        for card in hand:
            image_string = 'deal/cards/' + card + '.png'
            suit_value = card.split(" ")

            img = static(image_string)

            c = Card(handnum=counter, suit=suit_value[0],
                     value=suit_value[1], img_string=img)
            allhands[counter].append(c)
        counter +=1

    allcards = hand_sort(allhands[0]) + hand_sort(allhands[1]) \
    + hand_sort(allhands[2]) + hand_sort(allhands[3])

    for card in allcards:
        card.deal = deal
        card.save()


def hand_sort(hand):
    spades = [card for card in hand if card.suit == 'spade']
    hearts = [card for card in hand if card.suit == 'heart']
    diamonds = [card for card in hand if card.suit == 'diamond']
    clubs = [card for card in hand if card.suit == 'club']

    if len(spades) == 0:
        return hearts + clubs + diamonds
    elif len(clubs) == 0:
        return hearts + spades + diamonds
    else:
        return spades + hearts + clubs + diamonds
