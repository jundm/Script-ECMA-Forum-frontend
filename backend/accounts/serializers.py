from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer


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
