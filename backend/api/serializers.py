from rest_framework import serializers
from . import models
# from django.contrib.auth.models import User
from django.conf import settings

class UserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = settings.AUTH_USER_MODEL(
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = ('username', 'password')

class TextSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Text
        fields = ('text', 'rand_bool')
