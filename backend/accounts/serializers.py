from django.contrib.auth import get_user_model
from rest_framework import serializers
from accounts.models import CustomUser


class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("username", "email", "id", "first_name", "last_name")
