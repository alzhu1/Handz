from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser

from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

from numpy import random

class User(AbstractUser):
    '''
    Custom User
    '''
    # seat = models.CharField(max_length=5, default='')
    is_logged_in = models.BooleanField(default=False)

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

class Hand(object):
    def sort_key(self, s):
        if s == 'A':
            return 14
        elif s == 'K':
            return 13
        elif s == 'Q':
            return 12
        elif s == 'J':
            return 11
        elif s == 'T':
            return 10
        else:
            return int(s)

    def __init__(self, spades, hearts, diamonds, clubs):
        self.spades = ''.join(sorted(spades, key=self.sort_key, reverse=True))
        self.hearts = ''.join(sorted(hearts, key=self.sort_key, reverse=True))
        self.diamonds = ''.join(sorted(diamonds, key=self.sort_key, reverse=True))
        self.clubs = ''.join(sorted(clubs, key=self.sort_key, reverse=True))

    def get_suit(self, suit):
        if suit == 'spades' or suit == 'S':
            return self.spades
        if suit == 'hearts' or suit =='H':
            return self.hearts
        if suit == 'diamonds' or suit =='D':
            return self.diamonds
        if suit == 'clubs' or suit =='C':
            return self.clubs
        else:
            raise ValueError ('Not valid suit')

def construct_hand(hand_int_list):

    spades, hearts, diamonds, clubs = '', '', '', ''

    def suit_rank(i):
        if i%13==0:
            return 'A'
        elif i%13==1:
            return 'K'
        elif i%13==10:
            return 'T'
        elif i%13==11:
            return 'Q'
        elif i%13==12:
            return 'J'
        else:
            return str(i%13)

    for x in hand_int_list:
        if x < 13:
            spades += suit_rank(x)
        elif x < 26:
            hearts += suit_rank(x)
        elif x < 39:
            diamonds += suit_rank(x)
        else:
            clubs += suit_rank(x)

    return Hand(spades,hearts,diamonds,clubs)

def remove_card_from_hand_string(hand_string, card):

    hand = list(hand_string)

    def map_card_to_int(card):
        i = 0
        if card[1] == 'H':
            i+=13
        elif card[1] == 'D':
            i+=26
        elif card[1] == 'C':
            i+=39

        if card[0] == 'A':
            pass
        elif card[0] == 'K':
            i+=1
        elif card[0] == 'T':
            i+=10
        elif card[0] == 'Q':
            i+=11
        elif card[0] == 'J':
            i+=12
        else:
            i+= int(card[0])

        return i

    i = map_card_to_int(card)
    hand[i] = '0'
    hand = ''.join(hand)
    print('hand')
    print(hand)
    return hand

class Deal(object):

    def __init__(self, hand_string, north, south, east, west, dealer):
        self.hand_string = hand_string
        self.north = north
        self.east = east
        self.south = south
        self.west = west
        self.dealer = dealer

    def direction(self, seat):
        if seat == 'north':
            return self.north
        elif seat == 'east':
            return self.east
        elif seat == 'south':
            return self.south
        elif seat == 'west':
            return self.west


def construct_deal():
    l = list('NNNNNNNNNNNNNEEEEEEEEEEEEESSSSSSSSSSSSSWWWWWWWWWWWWW')
    random.shuffle(l)
    hand_string = ''.join(l)
    deal = parse_deal(hand_string)

    return deal

def parse_deal(hand_string):

    north, south, east, west = [], [], [], []
    for i,x in enumerate(hand_string):
        if x =='N':
            north.append(i)
        elif x == 'S':
            south.append(i)
        elif x == 'E':
            east.append(i)
        elif x == 'W':
            west.append(i)

    deal = Deal(hand_string=hand_string,
            north=construct_hand(north),
            south=construct_hand(south),
            east=construct_hand(east),
            west=construct_hand(west),
            dealer='north')

    return deal

class DealField(models.Field):

    def __init__(self, *args, **kwargs):
        kwargs['max_length'] = 52
        super(DealField, self).__init__(*args, **kwargs)

    def deconstruct(self):
        name, path, args, kwargs = super(DealField, self).deconstruct()
        del kwargs["max_length"]
        return name, path, args, kwargs

    def db_type(self, connection):
        return 'deal'

    def from_db_value(self, value, expression, connection, context):
        if value is None:
            return value
        return parse_deal(value)

    def to_python(self, value):
        if isinstance(value, Deal):
            return value

        if value is None:
            return value

        return parse_deal(value)

    def get_prep_value(self, value):
        if isinstance(value, str):
            return value
        return value.hand_string

    def formfield(self, **kwargs):
        # This is a fairly standard way to set up some defaults
        # while letting the caller override them.
        defaults = {'form_class': MyFormField}
        defaults.update(kwargs)
        return super(DealField, self).formfield(**defaults)

    def get_internal_type(self):
        return 'CharField'

    def value_to_string(self, obj):
        value = self.value_from_object(obj)
        return self.get_prep_value(value)


# class Auction(object):
#
#     def __init__(self, auction_list):
#         self.auction_list = auction_list
#
#
# def parse_auction(auction_string):
#
#     auction_list = list(auction_string)
#
#     auction = Auction(auction_list=auction_list)
#
#     return auction
#
#
# class AuctionField(models.Field):
#
#     def db_type(self, connection):
#         return 'auction'
#
#     def from_db_value(self, value, expression, connection, context):
#         if value is None:
#             return value
#         return parse_auction(value)
#
#     def to_python(self, value):
#         if isinstance(value, Auction):
#             return value
#
#         if value is None:
#             return value
#
#         return parse_auction(value)
#
#     def get_prep_value(self, value):
#         return value.auction_list
#
#     def formfield(self, **kwargs):
#         # This is a fairly standard way to set up some defaults
#         # while letting the caller override them.
#         defaults = {'form_class': MyFormField}
#         defaults.update(kwargs)
#         return super(AuctionField, self).formfield(**defaults)
#
#     def get_internal_type(self):
#         return 'CharField'
#
#     def value_to_string(self, obj):
#         value = self.value_from_object(obj)
#         return self.get_prep_value(value)



class Contract(object):

    def __init__(self, contract_string, declarer, trump, tricks,
                    is_doubled, is_redoubled):
        self.contract_string = contract_string
        self.declarer = declarer
        self.trump = trump
        self.tricks = tricks
        self.is_doubled = is_doubled
        self.is_redoubled = is_redoubled

def parse_contract(contract_string):

    tricks = int(contract_string[0])

    # hard code declarer, spade trump, no doubles
    declarer = 'north'
    trump = 'spades'
    is_doubled = False
    is_redoubled = False

    contract = Contract(contract_string=contract_string,
                        declarer=declarer,
                        trump=trump,
                        tricks=tricks,
                        is_doubled=is_doubled,
                        is_redoubled=is_redoubled)

    return contract

def parse_auction(auction_string):

    contract = '2S'
    return contract

class ContractField(models.Field):

    def __init__(self, *args, **kwargs):
        kwargs['max_length'] = 5
        super(ContractField, self).__init__(*args, **kwargs)

    def deconstruct(self):
        name, path, args, kwargs = super(ContractField, self).deconstruct()
        del kwargs["max_length"]
        return name, path, args, kwargs

    def db_type(self, connection):
        return 'contract'

    def from_db_value(self, value, expression, connection, context):
        if value is None:
            return value
        return parse_contract(value)

    def to_python(self, value):
        if isinstance(value, Contract):
            return value

        if value is None:
            return value

        return parse_contract(value)

    def get_prep_value(self, value):
        if value is None:
            return value
        return value.contract_string

    def formfield(self, **kwargs):
        # This is a fairly standard way to set up some defaults
        # while letting the caller override them.
        defaults = {'form_class': MyFormField}
        defaults.update(kwargs)
        return super(ContractField, self).formfield(**defaults)

    def get_internal_type(self):
        return 'CharField'

    def value_to_string(self, obj):
        value = self.value_from_object(obj)
        return self.get_prep_value(value)

class Trick(object):

    def __init__(self, trick_string, north, south, east, west):
        self.trick_string = trick_string
        self.north = north
        self.east = east
        self.south = south
        self.west = west


class TrickField(models.Field):

    def db_type(self, connection):
        return 'trick'

    def from_db_value(self, value, expression, connection, context):
        if value is None:
            return value
        return parse_trick(value)

    def to_python(self, value):
        if isinstance(value, Trick):
            return value

        if value is None:
            return value

        return parse_trick(value)

    def get_prep_value(self, value):
        if value is None:
            return value
        if isinstance(value, str):
            return value
        return value.trick_string

    def formfield(self, **kwargs):
        # This is a fairly standard way to set up some defaults
        # while letting the caller override them.
        defaults = {'form_class': MyFormField}
        defaults.update(kwargs)
        return super(TrickField, self).formfield(**defaults)

    def get_internal_type(self):
        return 'CharField'

    def value_to_string(self, obj):
        value = self.value_from_object(obj)
        return self.get_prep_value(value)

def parse_trick(trick_string):

    card_list = []
    north, south, east, west = '', '', '', ''
    for i in range(0, len(trick_string), 3):
        c = trick_string[i:i+3]
        if c[0] == 'N':
            north= c[1:]
        elif c[0] == 'S':
            south= c[1:]
        elif c[0] == 'E':
            east= c[1:]
        elif c[0] == 'W':
            west= c[1:]
    trick = Trick(trick_string=trick_string,
                    north=north,
                    south=south,
                    east=east,
                    west=west
                    )
    return trick

class Seat(models.Model):
    # direction_choices = ('North', 'South', 'East', 'West')
    direction = models.CharField(max_length=5)
    user = models.OneToOneField('User',on_delete=models.CASCADE, null=True)

def default_seat():
    return Seat(user=None,direction=None)

class BridgeTableManager(models.Manager):

    def create_deal(self):
        deal = construct_deal()
        # auction = parse_auction('')
        north = Seat(user=None,direction='north')
        north.save()
        south = Seat(user=None,direction='south')
        south.save()
        east = Seat(user=None,direction='east')
        east.save()
        west = Seat(user=None,direction='west')
        west.save()
        table = self.create(deal=deal,
        direction_to_act=deal.dealer,
        north=north,
        south=south,
        east=east,
        west=west)
        return table



class BridgeTable(models.Model):
    north = models.OneToOneField('Seat',default=None, null= True,
            on_delete=models.CASCADE,related_name='table_as_north')
    south = models.OneToOneField('Seat',default=None, null= True,
            on_delete=models.CASCADE,related_name='table_as_south')
    east = models.OneToOneField('Seat',default=None, null= True,
            on_delete=models.CASCADE,related_name='table_as_east')
    west = models.OneToOneField('Seat',default=None, null= True,
            on_delete=models.CASCADE,related_name='table_as_west')

    deal = DealField(default=None,null=True)
    # auction = AuctionField()
    auction = models.CharField(max_length=100,default='')
    contract = ContractField(default=None,null=True)
    trick = TrickField(default='')

    direction_to_act = models.CharField(max_length=5,default='')
    trick_string = models.CharField(max_length=13,default='')
    NS_tricks_taken = models.IntegerField(default=0,null=True)
    EW_tricks_taken = models.IntegerField(default=0,null=True)
    total_tricks = models.IntegerField(default=0,null=True)
    objects = models.Manager()
    objects = BridgeTableManager()

    def take_seat(self, username, seat):
        user = User.objects.get(username=username)
        if seat == 'north':
            self.north.user = user
            self.north.save()
            # s = Seat(user=user,direction='north')
            # s.save()
            # self.north = s
        elif seat == 'east':
            self.east.user = user
            self.east.save()
        elif seat == 'south':
            self.south.user = user
            self.south.save()
        elif seat == 'west':
            self.west.user = user
            self.west.save()
        else:
            print(username)
            print(seat)
            raise ValueError('Could not take seat')
        self.save()

    def leave_seat(self, username, seat):
        print('leave seat')
        if seat == 'north':
            self.north.user = None
            self.north.save()
        elif seat == 'south':
            self.south.user = None
            self.south.save()
        elif seat == 'east':
            self.east.user = None
            self.east.save()
        elif seat == 'west':
            self.west.user = None
            self.west.save()

        # print(user.seat)
        # s = Seat.objects.get(user=user)
        # s.delete()
        # Seat.objects.get(user=user).delete()
        #
        # print(Seat.objects.all())
        # Seat.objects.filter(user=user).delete()
        # print(Seat.objects.all())
        # print(s)

        # print(user.seat)
        # user.seat.delete()
        # user.save()
        # print(user.seat)
        # user.save()
        # print(user.seat)
        print('left seat')
        self.save()
        # print(user.seat)
        # print(user.seat.direction)

    def next_actor(self):
        if self.direction_to_act == 'north':
            self.direction_to_act = 'east'
        elif self.direction_to_act == 'east':
            self.direction_to_act = 'south'
        elif self.direction_to_act == 'south':
            self.direction_to_act = 'west'
        elif self.direction_to_act == 'west':
            self.direction_to_act = 'north'
        self.save()

    def set_contract(self):
        # if auction is not over, do nothing, otherwise set contract and begin play
        self.contract = parse_contract(parse_auction(self.auction))

        # set opening leader to be left of declarer
        self.direction_to_act = self.contract.declarer
        self.next_actor()
        self.save()

    def update_auction(self, bid):
        self.auction = self.auction + bid
        self.save()

    def play_card(self, seat, card):
        self.trick = parse_trick(self.trick.trick_string + seat + card)
        if len(self.trick.trick_string) < 12:
            self.next_actor()
        else:
            self.evaluate_trick()

        # update dealer
        self.deal = parse_deal(remove_card_from_hand_string(self.deal.hand_string, card))
        self.save()

    def evaluate_trick(self):
        card1 = self.trick.trick_string[:3]
        card2 = self.trick.trick_string[3:6]
        card3 = self.trick.trick_string[6:9]
        card4 = self.trick.trick_string[9:]
        trick = [card2, card3, card4]

        # rank and suit required to win
        trump = self.contract.trump[0].upper()
        rank = card1[1]
        suit = card1[2]
        winner = card1[0]

        # rank of cards
        order = list('AKQJT98765432')

        for t in trick:
            print(t)
            print(trump)
            print(suit)
            print(rank)
            if t[2] == trump and suit != trump:
                rank = t[1]
                suit = t[2]
                winner = t[0]
            elif t[2] == suit and order.index(t[1]) < order.index(rank):
                rank = t[1]
                suit = t[2]
                winner = t[0]

        print('winning trick')
        print(suit + rank)
        print(winner)

        if winner == 'E':
            self.direction_to_act = 'east'
        elif winner == 'W':
            self.direction_to_act = 'west'
        elif winner == 'N':
            self.direction_to_act = 'north'
        elif winner == 'S':
            self.direction_to_act = 'south'

        if winner == 'W' or winner == 'E':
            self.EW_tricks_taken += 1
        elif winner == 'N' or winner == 'S':
            self.NS_tricks_taken += 1
        self.trick_string += winner
        self.total_tricks += 1
        self.trick = parse_trick('')
        self.save()
