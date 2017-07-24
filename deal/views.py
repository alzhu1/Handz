from django.http import HttpResponse
from django.template import loader
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.shortcuts import render, redirect, reverse
from django.contrib.auth.decorators import login_required
from django.views.generic.edit import CreateView

from django.utils import timezone

from .models import Deal, Card, BridgeTable, UserProfile
from .functions import *
from .forms import SignUpForm

import numpy as np
import random
# Create your views here.

@login_required(login_url='/login')
def lobby(request):
    """
    Function based view that controls the lobby.
    """

    # Pass in list of all bridge_tables to lobby template
    bridge_tables = BridgeTable.objects.all()
    return render(request, 'deal/lobby.html', {'bridge_tables': bridge_tables})

@login_required(login_url='/login')
def create_board(request):
    """
    Function based view that controls table creation.
    """

    # Just clicking the button will create a new BridgeTable
    if request.method == 'POST':
        bridge_table = BridgeTable()
        bridge_table.save()
        return redirect('/')
    return render(request, 'deal/create_board.html')

@login_required(login_url='/login')
def play_board(request, pk):
    """
    Function based view that sets up the table with a deal.
    """

    user = request.user
    user.userprofile.hand_position = -1
    user.userprofile.save()

    # Get table equivalent to pk (from urls.py), will eventually change
    # to using a room name
    bridge_table = BridgeTable.objects.get(pk=pk)

    # If the table is empty, populate it with a deal
    if len(bridge_table.deal_set.all()) == 0:
        # Helper function in functions.py
        populate_table(bridge_table, pk)

    # Get the current deal from this board
    deal = bridge_table.deal_set.get(board_number=pk)
    hands = hand_conversion(deal.hand_string)

    if len(deal.card_set.all()) == 0:
        counter = 0
        for hand in hands:
            pos = 0
            for card in hand:
                suit_value = card.split(" ")
                deal.card_set.create(cardinal_direction=counter,
                                     suit=suit_value[0], value=suit_value[1],
                                     card_position=pos)
                pos += 1
            counter +=1

    # Create string paths for each card to get images from static folder
    hand_list_for_template_images = [[],[],[],[]]

    count = 0
    for hand in hands:
        for card in hand:
            image_string = 'deal/' + card + '.png'
            hand_list_for_template_images[count].append(image_string)
        count += 1

    # Get access to the table id
    table_id = bridge_table.pk

    # Dictionary below include values to pass to the template
    context = {
        'hands': hands ,
        'hand_list_for_template_images': hand_list_for_template_images,
        'username': request.user.username,
        'table_id': table_id
    }

    return render(request, 'deal/play_board.html', context)

def log_in(request):
    form = AuthenticationForm()
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            login(request, form.get_user())
            return redirect(reverse('deal:lobby'))
        else:
            print(form.errors)
    return render(request, 'deal/login.html', {'form': form})

class SignupView(CreateView):
    """
    Class based view to handle user creation via the SignUpForm.
    """
    template_name = 'deal/signup.html'
    form_class = SignUpForm
    success_url = "/" # Redirect to this after successful signup

    def get(self, request):
        """
        Function for getting the form template, nothing has been posted.
        """

        # Create form and pass back to template
        form = SignUpForm()
        return render(request, self.template_name, {'form': form})

    def form_valid(self, form):
        """
        Function called if form submission is valid, creates a User and logs in
        """

        # Save form and authenticate (log in) user
        form.save()
        username = form.cleaned_data.get('username')
        raw_password = form.cleaned_data.get('password1')
        user = authenticate(username=username, password=raw_password)

        # Add user_profile to created user
        user_profile = UserProfile(user=user)
        user_profile.save()

        # Call superclass function to complete form processing
        return super(SignupView, self).form_valid(form)

    def form_invalid(self, form):
        """
        Function called if form submission is invalid, prompts user to
        resubmit form with valid information.
        """
        return super(SignupView, self).form_invalid(form)
