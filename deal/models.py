from django.db import models

# Create your models here.
class Board(models.Model):
    pub_date = models.DateTimeField('date published')

class Hand(models.Model):
    board = models.ForeignKey(Board, on_delete=models.CASCADE)

    # 0 for N, 1 for E, 2 for S, 3 for W
    cardinal_direction = models.IntegerField()

class Card(models.Model):
    hand = models.ForeignKey(Hand, on_delete=models.CASCADE)
    suit = models.CharField(max_length=7)
    card_position = models.IntegerField()

    # 1 is A, 11 is J, 12 is Q, 13 is K
    value = models.IntegerField()
