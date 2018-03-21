from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser

from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

from numpy import random


def suit_name(abbr):
    if abbr == 'S':
        return 'spades'
    elif abbr =='H':
        return 'hearts'
    elif abbr =='D':
        return 'diamonds'
    elif abbr =='C':
        return 'clubs'
    else:
        raise ValueError('not valid suit')

def declarer_name(abbr):
    if abbr == 'N':
        return 'north'
    elif abbr =='S':
        return 'south'
    elif abbr =='E':
        return 'east'
    elif abbr =='W':
        return 'west'
    else:
        raise ValueError('not valid direction')

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

    def __init__(self, spades, hearts, diamonds, clubs, hcp):
        self.spades = ''.join(sorted(spades, key=self.sort_key, reverse=True))
        self.hearts = ''.join(sorted(hearts, key=self.sort_key, reverse=True))
        self.diamonds = ''.join(sorted(diamonds, key=self.sort_key, reverse=True))
        self.clubs = ''.join(sorted(clubs, key=self.sort_key, reverse=True))
        self.hcp = hcp

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
    hcp = 0

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

    def HCP_card(i):
        if i%13==0:
            return 4
        elif i%13==1:
            return 3
        elif i%13==11:
            return 2
        elif i%13==12:
            return 1
        else:
            return 0

    for x in hand_int_list:
        if x < 13:
            spades += suit_rank(x)
        elif x < 26:
            hearts += suit_rank(x)
        elif x < 39:
            diamonds += suit_rank(x)
        else:
            clubs += suit_rank(x)
        hcp += HCP_card(x)

    return Hand(spades,hearts,diamonds,clubs, hcp)

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
    # print('hand')
    # print(hand)
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
    # print('parse deal')
    # print(hand_string)
    if hand_string == 0:
        print('hand_string 0')
    else:
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
        # print('from_db_value')
        # print(value)
        if value is None:
            return value
        elif value == '0':
            return parse_deal('0000000000000000000000000000000000000000000000000000')
        else:
            return parse_deal(value)

    def to_python(self, value):
        if isinstance(value, Deal):
            return value

        if value is None:
            return value

        return parse_deal(value)

    def get_prep_value(self, value):
        # print('get_prep_value')
        # print(value)
        # print(value.hand_string)
        if isinstance(value, str):
            return value
        return str(value.hand_string)

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

    def __init__(self, contract_string, declarer, trump, level,
                    is_doubled, is_redoubled):
        self.contract_string = contract_string
        self.declarer = declarer
        self.trump = trump
        self.level = level
        self.is_doubled = is_doubled
        self.is_redoubled = is_redoubled


def parse_contract(contract_string):

    level = int(contract_string[0])
    declarer = declarer_name(contract_string[2])
    trump = suit_name(contract_string[1])
    is_doubled = False
    is_redoubled = False

    contract = Contract(contract_string=contract_string,
                        declarer=declarer,
                        trump=trump,
                        level=level,
                        is_doubled=is_doubled,
                        is_redoubled=is_redoubled)

    return contract

# def parse_auction(auction_string):
#
#     contract = '2S'
#     return contract

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
    robot = models.BooleanField(default=False)

    def get_table(self, direction):
        if direction == 'north':
            return self.table_as_north
        elif direction == 'east':
            return self.table_as_east
        elif direction == 'south':
            return self.table_as_south
        elif direction == 'west':
            return self.westable_as_westt



class BridgeTableManager(models.Manager):

    def create_deal(self, robot=False):
        deal = construct_deal()
        # auction = parse_auction('')
        north = Seat(user=None,direction='north')
        north.save()
        south = Seat(user=None,direction='south',robot=robot)
        south.save()
        east = Seat(user=None,direction='east',robot=robot)
        east.save()
        west = Seat(user=None,direction='west',robot=robot)
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

    phase = models.CharField(max_length=100,default='auction')
    deal = DealField(default=None,null=True)
    # auction = AuctionField()
    auction = models.CharField(max_length=100,default='')
    contract = ContractField(default=None,null=True)
    trick = TrickField(default='')
    prev_trick = TrickField(default='')

    direction_to_act = models.CharField(max_length=5,default='')
    trick_string = models.CharField(max_length=13,default='')
    NS_tricks_taken = models.IntegerField(default=0,null=True)
    EW_tricks_taken = models.IntegerField(default=0,null=True)
    level = models.IntegerField(default=0,null=True)
    objects = models.Manager()
    objects = BridgeTableManager()

    def is_seat_empty(self, seat):
        if (seat == 'north' and self.north.user != None or
            seat == 'east' and self.east.user != None or
            seat == 'south' and self.south.user != None or
            seat == 'west' and self.west.user != None):
            print('Someone is sitting there!')
            return False
        else:
            return True

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
        # print('leave seat')
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
        # print('left seat')
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
        self.evaluate_trick()
        self.save()

    def find_next_actor(self):
        if self.direction_to_act == 'north':
            return 'east'
        elif self.direction_to_act == 'east':
            return 'south'
        elif self.direction_to_act == 'south':
            return 'west'
        elif self.direction_to_act == 'west':
            return 'north'

    def find_prev_actor(self):
        if self.direction_to_act == 'north':
            return 'west'
        elif self.direction_to_act == 'east':
            return 'north'
        elif self.direction_to_act == 'south':
            return 'east'
        elif self.direction_to_act == 'west':
            return 'south'

    def get_seat(self, seat):
        if seat == 'north':
            return self.north
        elif seat == 'east':
            return self.east
        elif seat == 'south':
            return self.south
        elif seat == 'west':
            return self.west

    # def set_declarer(self, direction):
    #     self.contract.declarer = direction
    #     self.contract.save()

    def is_valid_card(self, card):
        # check if first card in trick matches suit
        # print('card')
        # print(card)
        if self.trick.trick_string:
            suit_led = self.trick.trick_string[2]
            # print(suit_led)
            # check if card matches first card in trick or out of that suit
            # and check if card played is actually in your hand
            if ((suit_led == card[1] or not
                self.deal.direction(self.direction_to_act).get_suit(suit_led)) and
                card[0] in self.deal.direction(self.direction_to_act).get_suit(card[1])):
                return True
            else:
                return False
        else:
            return True

    def set_contract(self, level, strain, declarer):
        # if auction is not over, do nothing, otherwise set contract and begin play
        auction_string = str(level) + strain + declarer[0].upper()
        self.contract = parse_contract(auction_string)

        # # set opening leader to be left of declarer
        # self.direction_to_act = self.find_next_actor()
        # self.direction_to_act = self.find_prev_actor()
        self.save()

    def find_declarer(self):
        # print('find declarer')

        def is_number(s):
            try:
                float(s)
                return True
            except ValueError:
                pass

            try:
                import unicodedata
                unicodedata.numeric(s)
                return True
            except (TypeError, ValueError):
                pass

            return False

        def find_winner(dealer, num):
            if dealer == 'north':
                d = 0
            elif seat == 'east':
                d = 1
            elif seat == 'south':
                d = 2
            elif seat == 'west':
                d = 3

            n = (d + num) % 4

            if n % 4 == 0:
                return 'north'
            elif n % 4 == 1:
                return 'east'
            elif n % 4 == 2:
                return 'south'
            elif n % 4 == 3:
                return 'west'

        dealer = self.deal.dealer
        # pos = re.match('.+([0-9])[^0-9]*$', table.auction).group(1)
        for i,x in enumerate(self.auction):
            if is_number(x):
                level = x
                pos = i
        # print(self.auction)
        # print(level)
        self.level = level
        self.save()
        declarer = find_winner(dealer, pos)
        return declarer

    def update_auction(self, bid):
        # print('in model auction')
        # print(self.auction)
        self.auction = self.auction + bid
        if len(self.auction)>3 and self.auction[-3:]=='PPP':
            self.phase = 'play'
        self.save()
        # print(self.auction)

    def play_card(self, seat, card):
        self.trick = parse_trick(self.trick.trick_string + seat + card)
        # print('model play_card')
        # print(self.trick.trick_string)
        # if len(self.trick.trick_string) < 12:
        #     pass
        #     # self.next_actor()
        # else:
        #     self.evaluate_trick()

        # update dealer
        self.deal = parse_deal(remove_card_from_hand_string(self.deal.hand_string, card))
        # print('self.deal')
        # print(self.deal.hand_string)
        self.save()


    def trick_winner(self):
        if len(self.trick.trick_string) == 12:
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
                # print(t)
                # print(trump)
                # print(suit)
                # print(rank)
                if t[2] == trump and suit != trump:
                    rank = t[1]
                    suit = t[2]
                    winner = t[0]
                elif t[2] == suit and order.index(t[1]) < order.index(rank):
                    rank = t[1]
                    suit = t[2]
                    winner = t[0]

            # print('winning trick')
            # print(suit + rank)
            # print(winner)

            if winner == 'E':
                return 'east'
            elif winner == 'W':
                return 'west'
            elif winner == 'N':
                return 'north'
            elif winner == 'S':
                return 'south'

    def evaluate_trick(self):
        if len(self.trick.trick_string) == 12:
            # print('evaluate_trick')

            winner = self.trick_winner()
            self.direction_to_act = winner
            winner = winner[0].upper()

            if winner == 'W' or winner == 'E':
                self.EW_tricks_taken += 1
            elif winner == 'N' or winner == 'S':
                self.NS_tricks_taken += 1
            self.trick_string += winner
            self.prev_trick = self.trick
            self.trick = parse_trick('')
            # print('prev trick')
            # print(self.prev_trick.trick_string)
            self.save()
