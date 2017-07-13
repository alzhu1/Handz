from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class BridgeTable(models.Model):
    users = models.ManyToManyField(User)

class Deal(models.Model):
    deal_id = models.AutoField(primary_key=True, blank=True)
    bridge_table = models.ForeignKey(BridgeTable, on_delete=models.CASCADE)
    hand_string = models.CharField(max_length=52)
    dealer = models.IntegerField()
    vulnerability = models.IntegerField()
    board_number = models.IntegerField()

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # country = models.CharField(max_length=30) # replace with list table
    # language = models.CharField(max_length=30) # replace with list table
    hand_position = models.IntegerField(default=-1) # temporary holds

class Card(models.Model):
    board = models.ForeignKey(Deal, on_delete=models.CASCADE)

    # 0 is N, 1 is E, 2 is S, 3 is W
    cardinal_direction = models.IntegerField()

    # S for Spade, H for Heart, D for Diamond, C for Club
    suit = models.CharField(max_length=1)

    # 1 is A, 11 is J, 12 is Q, 13 is K
    value = models.IntegerField()
