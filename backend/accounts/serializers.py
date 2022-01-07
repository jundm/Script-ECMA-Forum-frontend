from django.contrib.auth import get_user_model
from rest_framework import serializers

CustomUser = get_user_model()


class CustomUserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data["email"],
            name=validated_data["name"],
            username=validated_data["username"],
            password=validated_data["password"],
        )
        return user

    class Meta:
        model = CustomUser
        fields = ["id", "name", "email", "username", "password"]
