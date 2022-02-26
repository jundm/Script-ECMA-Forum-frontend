from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer
from rest_framework.serializers import ModelSerializer
from accounts.models import CustomUser

User = get_user_model()

# ------------- Djoser ------------- #
class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = (
            "id",
            "name",
            "username",
            "email",
            "follower_set",
            "following_set",
        )
        REQUIRED_FIELDS = ["name"]


# ------------- Basic User Info ------------- #
class UsernameUniqueCheckSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("username",)
