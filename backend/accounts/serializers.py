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
        )
        REQUIRED_FIELDS = ["username"]


# ------------- Basic User Info ------------- #
