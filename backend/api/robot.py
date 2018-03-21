import random

def RobotCardPlay(table):
    suit = None
    if table.trick.trick_string:
        suit = table.trick.trick_string[2]

    hand = table.deal.direction(table.direction_to_act)
    trump = table.contract.trump[0].upper()
    suits = ['S','H','D','C']

    print('robot card play')

    def getSeatNumber():
        return len(table.trick.trick_string)/3 + 1

    def isTrumpPlayed():
        for n in range(0,int(len(table.trick.trick_string)/3 + 1)):
            if table.trick.trick_string[(n*3)-1] == trump:
                return True
        return False

    def cardToValue(card):
        r = card[0]
        s = card[1]

        # if not following suit, card cannot win trick
        if s != suit:
            return 0

        if r == 'T':
            r = 10
        elif r == 'J':
            r = 11
        elif r == 'Q':
            r = 12
        elif r == 'K':
            r = 13
        elif r == 'A':
            r = 14

        r = int(r)
        # if trump, can beat all non trump
        if s == trump:
            return r + 13
        # else return rank
        return r

    def valueToCard(value):
        if isinstance(value, int) or value.isdigit():
            return str(value)
        elif value == 10:
            return 'T'
        elif value == 11:
            return 'J'
        elif value == 12:
            return 'Q'
        elif value == 13:
            return 'K'
        elif value == 14:
            return 'A'

    def currentlyWinningCard():
        big = 0
        card = None
        for n in range(0,int(len(table.trick.trick_string)/3)):
            print(n)
            c = table.trick.trick_string[(n*3)+1:(n*3)+3]
            print(c)
            b = cardToValue(c)
            if b > big:
                big = b
                card = c
        return card



    def existsSequenceInSuit(suit):
        if ('AK' in suit or
            'KQ' in suit or
            'QJ' in suit or
            'JT' in suit or
            'T9' in suit):
            return True
        else:
            return False

    def firstSeatPlay():
        # if sequence exists
        for s in suits:
            if existsSequenceInSuit(s):
                # choose highest card if sequence exists
                return h[0] + s

        # else low card
        _suit = []
        for s in suits:
            if len(hand.get_suit(s)) > 0:
                _suit.append(s)
        _suit = random.choice(_suit)
        _h = hand.get_suit(_suit)
        return _h[len(_h)-1] + _suit

    def secondSeatPlay():
        h = hand.get_suit(suit)
        t = hand.get_suit(trump)
        if existsSequenceInSuit(suit):
            # choose highest card if sequence exists
            return h[0] + suit
        else:
            # choose lowest card if sequence does not exist
            return h[len(h)-1] + suit

    def thirdSeatPlay():
        h = hand.get_suit(suit)
        t = hand.get_suit(trump)
        # if can win trick
        big_card = currentlyWinningCard()
        if cardToValue(h[0]+suit) > cardToValue(big_card):
            if existsSequenceInSuit(suit):
                # choose second highest card if sequence exists
                return h[1] + suit
            else:
                # choose highest card if sequence does not exist
                return h[0] + suit
        else:
            return h[len(h)-1] + suit

    def fourthSeatPlay():
        h = hand.get_suit(suit)
        t = hand.get_suit(trump)
        # if trump is played, if can follow suit, follow low
        if isTrumpPlayed() and suit != trump and len(h)>0:
            return h[len(h)-1] + suit
        else:
            big_card = currentlyWinningCard()
            for rank in h[::-1]:
                if cardToValue(rank + suit) > cardToValue(big_card):
                    return rank + suit
            return h[len(h)-1] + suit

    def makeDiscard():
        # h = hand.get_suit(suit)
        # t = hand.get_suit(trump)
        # if len(t) > 0:
        #     if isTrumpPlayed():
        #         for c in t[::-1]:
        #             if cardToValue(c) > big:
        #                 return rank + suit

        _suit = []
        for s in suits:
            if len(hand.get_suit(s)) > 0:
                _suit.append(s)
        _suit = random.choice(_suit)
        _h = hand.get_suit(_suit)
        return _h[len(_h)-1] + _suit


    # if the hand must follow suit
    if suit and len(hand.get_suit(suit))>0:
        # if in second seat
        if getSeatNumber() == 2:
            card = secondSeatPlay()

        # if in third seat
        elif getSeatNumber() == 3:
            card = thirdSeatPlay()

        # if in fourth seat, try to win cheaply
        elif getSeatNumber() == 4:
            card = fourthSeatPlay()

        else:
            raise ValueError('No card chosen when possible to follow suit')
    elif getSeatNumber() == 1:
        # first seat play
        card = firstSeatPlay()

    elif suit and len(hand.get_suit(suit)) == 0:
        # find discard
        card = makeDiscard()
    else:
        raise ValueError('Failed to chose card')
    print(card)
    return card
