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
    # hand_position = models.IntegerField(default=-1)
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

    def __init__(self, contract_string, trump, tricks,
                    is_doubled, is_redoubled):
        self.contract_string = contract_string
        self.trump = trump
        self.tricks = tricks
        self.is_doubled = is_doubled
        self.is_redoubled = is_redoubled

def parse_contract(contract_string):

    tricks = int(contract_string[0])

    # hard code spade trump, no doubles
    trump = 'spades'
    is_doubled = False
    is_redoubled = False

    contract = Contract(contract_string=contract_string,
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
        return value

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

class BridgeTableManager(models.Manager):

    def create_deal(self):
        deal = construct_deal()
        # auction = parse_auction('')
        table = self.create(
            deal=deal,
            direction_to_bid=deal.dealer
            )
        return table

class BridgeTable(models.Model):
    # users = models.ManyToManyField(settings.AUTH_USER_MODEL)
    deal = DealField()
    # auction = AuctionField()
    auction = models.CharField(max_length=100,default='')
    declarer = models.CharField(max_length=5,default='')
    contract = ContractField(default=None,null=True)
    direction_to_bid = models.CharField(max_length=5,default='')
    
    objects = BridgeTableManager()

    def next_bidder(self):
        if self.direction_to_bid == 'north':
            self.direction_to_bid = 'east'
        elif self.direction_to_bid == 'east':
            self.direction_to_bid = 'south'
        elif self.direction_to_bid == 'south':
            self.direction_to_bid = 'west'
        elif self.direction_to_bid == 'west':
            self.direction_to_bid = 'north'
        self.save()

    def set_contract(self):
        if len(self.auction)<4 or self.auction[-3:]!='PPP':
            return None
        self.contract = parse_auction(self.auction)
        self.save()

    def update_auction(self, bid):
        self.auction = self.auction + bid
        self.save()



# class Deal(models.Model):
#     # bridge_table = models.ForeignKey(BridgeTable, on_delete=models.CASCADE)
#     deal_id = models.AutoField(primary_key=True, blank=True)
#     north = HandField()
#     south = HandField()
#     east = HandField()
#     west = HandField()
#
#     # dealer = models.IntegerField(default=1)
#     # vulnerability = models.IntegerField(default='')
#     # board_number = models.IntegerField(default=1)
#
#     hand_string = models.CharField(max_length=52)
#     objects = DealManager()
#     # in_play = models.BooleanField()
#     # next_player = models.IntegerField(default=-1)
