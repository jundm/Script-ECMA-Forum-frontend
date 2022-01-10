from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer

User = get_user_model()

# ------------- Djoser ------------- #
class CurrentUserSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = (
            "id",
            "name",
            "username",
            "email",
        )
