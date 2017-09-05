from django.shortcuts import render

from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import generics

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def login_view(request):
    return Response({"message": "Successfully logged in"})
