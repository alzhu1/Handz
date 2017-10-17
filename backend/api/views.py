from django.shortcuts import render
from rest_framework.response import Response
from api.serializers import UserSerializer
from rest_framework.views import APIView

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated


from django.contrib.auth import get_user_model, authenticate
User = get_user_model()

class UsersView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = (IsAuthenticated,)

class LoginView(APIView):
    def post(self, request):
        user = authenticate(username=request.data['username'],
                password=request.data['password'])
        user.is_logged_in = True
        user.save()
        return Response({"message": "Success"})

class LogoutView(APIView):
    def post(self, request):
        user = User.objects.get(auth_token=request.data["token"])
        user.is_logged_in = False
        user.save()
        Text.objects.all().delete()
        return Response({"message": "Success"})

class SignupView(APIView):
    def post(self, request):
        user = User.objects.create_user(username=request.data['username'],
                                 password=request.data['password'])
        user.save()
        return Response({"message": "Success"})
