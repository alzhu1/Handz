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

class Trick(models.Model):
    deal = models.ForeignKey(Deal, on_delete=models.CASCADE, null=True)
    leading_suit = models.CharField(max_length=7, blank=True)

    def evaluate(self):
        """
        Evaluates the trick by comparing suits, then comparing values to find
        trick winner.
        """

        # Filter cards in trick based on the leading suit
        cards = self.card_set.filter(suit=self.leading_suit)
        winner = 0

        # Loop through card set and compare card's value
        for i in range( 1, len(cards.all()) ):
            check_card = cards.all()[winner]

            if cards.all()[i].greater_than(check_card):
                winner = i

        # Return the cardinal direction of person who won trick
        return cards.all()[winner].cardinal_direction

class Card(models.Model):
    deal = models.ForeignKey(Deal, on_delete=models.CASCADE, null=True)
    trick = models.ForeignKey(Trick, on_delete=models.CASCADE, blank=True, null=True)

    # 0 is N, 1 is E, 2 is S, 3 is W
    cardinal_direction = models.IntegerField()

    suit = models.CharField(max_length=7)
    value = models.CharField(max_length=7)

    card_position = models.IntegerField()

    def greater_than(self, card_two):
        """
        Compares two cards' value.
        """

        # Set values to variables for ease of use
        first_val = self.value
        second_val = card_two.value

        # Set first_val to appropriate value
        if first_val == "A":
            first_val = 14
        elif first_val == "K":
            first_val = 13
        elif first_val == "Q":
            first_val = 12
        elif first_val == "J":
            first_val = 11
        else:
            first_val = int(first_val)

        # Set second_val to appropriate value
        if second_val == "A":
            second_val = 14
        elif second_val == "K":
            second_val = 13
        elif second_val == "Q":
            second_val = 12
        elif second_val == "J":
            second_val = 11
        else:
            second_val = int(second_val)

        # First > second returns true, second > first returns false
        if first_val > second_val:
            return True
        else:
            return False
