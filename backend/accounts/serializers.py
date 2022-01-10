from django.contrib.auth import get_user_model
from rest_framework import serializers
from accounts.models import CustomUser

<<<<<<< HEAD
CustomUser = get_user_model()


class CustomUserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data["email"],
            nickname=validated_data["nickname"],
            username=validated_data["username"],
            password=validated_data["password"],
        )
        return user
=======
>>>>>>> 2d0cac79333aaa0f888ff12252cde9a93a475488

class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
<<<<<<< HEAD
        fields = ["pk", "nickname", "email", "username", "password"]
=======
        fields = ("username", "email", "id", "first_name", "last_name")
>>>>>>> 2d0cac79333aaa0f888ff12252cde9a93a475488
