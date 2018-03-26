import random

def RobotCardPlay(table):

    def getPartnerSeat(s):
        if s == 'E':
            return 'W'
        elif s == 'W':
            return 'E'
        elif s == 'S':
            return 'N'
        elif s == 'N':
            return 'S'
        if s == 'east':
            return 'west'
        elif s == 'west':
            return 'east'
        elif s == 'south':
            return 'north'
        elif s == 'north':
            return 'south'

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
            c = table.trick.trick_string[(n*3)+1:(n*3)+3]
            b = cardToValue(c)
            if b > big:
                big = b
                card = c
        return card

    def currentlyWinningSeat():
        card = currentlyWinningCard()
        i = table.trick.trick_string.find(card) - 1
        return table.trick.trick_string[i]

    def isPartnerWinning():
        return currentlyWinningSeat() == getPartnerSeat(seat)

    def existsSequenceInSuit(suit):
        if ('AK' in suit or
            'KQ' in suit or
            'QJ' in suit or
            'JT' in suit or
            'T9' in suit):
            return True
        else:
            return False

    def firstHandPlay():

        # attack declarer and dummy's shortest suit, unless there is trump and dummy is void
        current_length = 13
        current_suit = None
        for s in suits:
            new_length = len(dummy_hand.get_suit(s)) + len(declarer_hand.get_suit(s))
            print('declarer suits')
            print(dummy_hand.get_suit(s))
            print(declarer_hand.get_suit(s))
            if (len(hand.get_suit(s)) > 0 and new_length < current_length and
                    (len(dummy_hand.get_suit(s)) > 0 or trump == 'N'
                    or len(dummy_hand.get_suit(trump)) == 0)):
                current_length = new_length
                current_suit = s

        # if can't pick suit, pick randomly
        if current_suit == None:
            _suit = []
            for s in suits:
                if len(hand.get_suit(s)) > 0:
                    _suit.append(s)
            current_suit = random.choice(_suit)

        h = hand.get_suit(current_suit)

        # if sequence exists
        if existsSequenceInSuit(current_suit):
            # choose highest card if sequence exists
            return h[0] + current_suit
        # if partner has 2 or more and we have doubleton then play high
        elif (len(partner_hand.get_suit(current_suit)) > 2 and
                len(hand.get_suit(current_suit)) < 3):
            return h[0] + current_suit
        # both opponents have 2 or fewer
        elif (len(dummy_hand.get_suit(current_suit)) < 3 and
                len(declarer_hand.get_suit(current_suit)) < 3):
            return h[0] + current_suit
        else:
            return h[len(h)-1] + current_suit

        # # else low card
        # _suit = []
        # for s in suits:
        #     if len(hand.get_suit(s)) > 0:
        #         _suit.append(s)
        # _suit = random.choice(_suit)
        # _h = hand.get_suit(_suit)
        # return _h[len(_h)-1] + _suit

    def secondHandPlay():
        h = hand.get_suit(suit)
        t = hand.get_suit(trump)

        # cover an honor with an honor
        for c in h:
            if cardToValue(c + suit) - cardToValue(currentlyWinningCard()) == 1:
                return c + suit

        if existsSequenceInSuit(suit):
            # choose highest card if sequence exists
            return h[0] + suit
        else:
            # choose lowest card if sequence does not exist
            return h[len(h)-1] + suit

    def thirdHandPlay():
        h = hand.get_suit(suit)
        t = hand.get_suit(trump)

        # if highest card is equivalent to partner's card, play low
        if abs(cardToValue(h[0]+suit) - cardToValue(table.trick.trick_string[1:3])) == 1:
            return h[len(h)-1] + suit

        # if dummy is fourth seat
        if (seat == 'E' and dummy_seat == 'S') or (seat == 'W' and dummy_seat == 'N'):
            ds = dummy_hand.get_suit(suit)
            # if dummy has length in suit
            if len(ds) > 0 :
                #  if partner's card is winning and will hold the trick, play low
                if isPartnerWinning() and cardToValue(currentlyWinningCard()) > cardToValue(ds[0]+suit):
                    return h[len(h)-1] + suit
                # win or force cheaply
                else:
                    pass
            else:
                # win cheaply
                current_card = h[len(h)-1] + suit
                for d in ds[::-1]:
                    for c in h:
                        if cardToValue(c+suit) > cardToValue(d+suit):
                            current_card = c + suit

                # check to see if need to cover second hand card
                if (not isPartnerWinning() and
                    cardToValue(current_card) < cardToValue(currentlyWinningCard())):
                    # find lowest card to cover
                    for c in h:
                        if cardToValue(c+suit) > cardToValue(currentlyWinningCard()):
                            current_card = c + suit
                return current_card

        # if dummy is second seat
        elif (seat == 'E' and dummy_seat == 'N') or (seat == 'W' and dummy_seat == 'S'):
            # if dummy has length in suit
            pass
                # play high in relation given dummy's holding



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

    def fourthHandPlay():
        h = hand.get_suit(suit)
        t = hand.get_suit(trump)
        # if trump is played, follow low
        if isTrumpPlayed() and suit != trump:
            return h[len(h)-1] + suit
        # if partner is winning trick, follow low
        if isPartnerWinning():
            return h[len(h)-1] + suit
        else:
            big_card = currentlyWinningCard()
            for rank in h[::-1]:
                if cardToValue(rank + suit) > cardToValue(big_card):
                    return rank + suit
            return h[len(h)-1] + suit

    def makeDiscard():
        h = hand.get_suit(suit)
        t = hand.get_suit(trump)

        # if have trump
        if t and len(t) > 0:
            if isTrumpPlayed():
                b = currentlyWinningCard()
                # overtrump cheaply
                for c in t[::-1]:
                    if cardToValue(c + trump) > cardToValue(b):
                        return c + trump
            # trump cheaply if partner is not winning with honor
            elif isPartnerWinning() and cardToValue(currentlyWinningCard())<10:
                # play lowest trump
                return t[len(t)-1] + trump

        # else discard lowest from longest non trump suit
        l = 0
        remaining_suits = suits
        if trump !='N':
            remaining_suits.remove(trump)
        print(suits)
        discard_suit = None
        for s in remaining_suits:
            if len(hand.get_suit(s)) > l:
                l = len(hand.get_suit(s))
                discard_suit = s
        print(discard_suit)
        _h = hand.get_suit(discard_suit)
        return _h[len(_h)-1] + discard_suit

    suit = None
    if table.trick.trick_string:
        suit = table.trick.trick_string[2]

    hand = table.deal.direction(table.direction_to_act)
    trump = table.contract.trump[0].upper()
    seat = table.direction_to_act[0].upper()
    dummy_seat = getPartnerSeat(table.contract.declarer)
    dummy_hand = table.deal.direction(dummy_seat)
    partner_seat = getPartnerSeat(table.direction_to_act)
    partner_hand = table.deal.direction(partner_seat)
    declarer_seat = table.contract.declarer
    declarer_hand = table.deal.direction(declarer_seat)

    print('partner_hand')
    print(partner_seat)
    print(partner_hand)
    suits = ['S','H','D','C']

    # if the hand must follow suit
    if suit and len(hand.get_suit(suit))>0:
        # if in second seat
        if getSeatNumber() == 2:
            card = secondHandPlay()

        # if in third seat
        elif getSeatNumber() == 3:
            card = thirdHandPlay()

        # if in fourth seat, try to win cheaply
        elif getSeatNumber() == 4:
            card = fourthHandPlay()

        else:
            raise ValueError('No card chosen when possible to follow suit')
    elif getSeatNumber() == 1:
        # first seat play
        card = firstHandPlay()

    elif suit and len(hand.get_suit(suit)) == 0:
        # find discard
        card = makeDiscard()
    else:
        raise ValueError('Failed to chose card')
    print(card)
    return card
