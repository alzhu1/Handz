from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render

from .models import Board, Hand, Card

import random
# Create your views here.
def index(request):
    board = Board.objects.get(pk=1)
    hands = board.hand_set.all()

    #for hand in hands:
     #   hand.card_set.all().delete()

    cards = []
    suits = ["Spade", "Heart", "Club", "Diamond"]
    for i in range(1, 14):
        for s in suits:
            cards.append( Card(suit=s, value=i) )

    for hand in hands:
        hand_size = len(hand.card_set.all())
        for j in range(1, 14):
            ran = random.randrange(len(cards))
            card_suit = cards[ran].suit
            card_value = cards[ran].value

            if hand_size == 0:
                hand.card_set.create(suit=card_suit, value=card_value, card_position=j)
            else:
                filtered_hand = hand.card_set.all().filter(card_position=j)
                filtered_hand.update(suit=card_suit, value=card_value)

            #cards[ran].hand = hands.get(pk=i)
            cards.remove(cards[ran])
        #hands.get(pk=i).save()

    template = loader.get_template("deal/index.html")
    context = {
        'hands': hands
    }

    return HttpResponse(template.render(context, request))
