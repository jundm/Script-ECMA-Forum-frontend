from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny

from .serializers import CustomUserSerializer


# 회원가입
class UserCreateView(CreateAPIView):
    model = get_user_model()
    serializer_class = CustomUserSerializer
    permission_classes = [
        AllowAny
    ]
