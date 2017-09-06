from django.shortcuts import render
from rest_framework.response import Response
from api.serializers import TextSerializer, UserSerializer
from rest_framework.views import APIView

from .models import Text
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

class TextView(generics.ListCreateAPIView):
    queryset = Text.objects.all()
    serializer_class = TextSerializer
    permission_classes = (IsAuthenticated,)

class CurrentUserView(APIView):

    def get(self, request):
        # serializer = UserSerializer(request.user)
        return Response({"message": "Successfully logged in"})
