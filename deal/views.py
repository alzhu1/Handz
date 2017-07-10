from django.http import HttpResponse
from django.template import loader
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

from django.utils import timezone

from .models import Deal, Card
from .functions import *
from .forms import SignUpForm

import numpy as np
import random
# Create your views here.

@login_required(login_url='/login')
def index(request):
    deck = []

    for i in range(0, 52):
        card_string = ""
        if i < 13:
            deck.append("N")
        elif i < 26:
            deck.append("E")
        elif i < 39:
            deck.append("S")
        else:
            deck.append("W")

    np.random.shuffle(deck)
    hand_string = ""

    for i in range(0, 52):
        hand_string = hand_string + deck[i]

    new_deal = Deal(hand_string=hand_string, dealer=0, vulnerability=0, board_number=0)
    new_deal.save()
    hands = hand_conversion(new_deal.hand_string)

    #create string paths for each card to get images from static folder
    hand_list_for_template_images = [[],[],[],[]]

    count = 0
    for x in hands:
        for card in x:
            image_string = 'deal/' + card + '.png'
            hand_list_for_template_images[count].append(image_string)
        count += 1

    template = loader.get_template("deal/index.html")
    context = {
        'hands': hands ,
        'hand_list_for_template_images': hand_list_for_template_images,
        'username': request.user.username
    }

    return HttpResponse(template.render(context, request))

def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('/')
    else:
        form = SignUpForm()
    return render(request, 'deal/signup.html', {'form': form})
