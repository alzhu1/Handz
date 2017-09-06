from django.shortcuts import render
from rest_framework.response import Response
from api.serializers import UserSerializer
from rest_framework.views import APIView

class CurrentUserView(APIView):

    def get(self, request):
        # serializer = UserSerializer(request.user)
        return Response({"message": "Successfully logged in"})
