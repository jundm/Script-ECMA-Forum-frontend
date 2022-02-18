from django.contrib.auth import get_user_model
from drf_yasg.utils import swagger_auto_schema
from requests import Response
from rest_framework import serializers, status
from rest_framework.decorators import api_view
from rest_framework.generics import get_object_or_404, CreateAPIView
from rest_framework_simplejwt.views import (
    TokenBlacklistView,
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from accounts.serializers import UsernameUniqueCheckSerializer

# format=None https://www.django-rest-framework.org/tutorial/2-requests-and-responses/#adding-optional-format-suffixes-to-our-urls
class UsernameUniqueCheck(CreateAPIView):
    serializer_class = UsernameUniqueCheckSerializer

    def post(self, request, format=None):
        print(request, "발발")
        serializer = self.get_serializer(
            data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            print(serializer.is_valid(), "성공")
            # return Response(
            #     data={"detail": ["You can use this ID"]}, status=status.HTTP_200_OK
            # )
        else:
            detail = dict()
            detail["detail"] = serializer.errors["username"]
            print(serializer.is_valid(), "실패")
            # return Response(data=detail, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def user_follow(request):
    username = request.data["username"]
    follow_user = get_object_or_404(get_user_model(), username=username, is_active=True)
    request.user.following_set.add(follow_user)
    follow_user.follower_set.add(request.user)
    return Response(status.HTTP_204.NO_CONTENT)


@api_view(["POST"])
def user_unfollow(request):
    username = request.data["username"]
    follow_user = get_object_or_404(get_user_model(), username=username, is_active=True)
    request.user.following_set.remove(follow_user)
    follow_user.follower_set.remove(request.user)
    return Response(status.HTTP_204.NO_CONTENT)


class TokenObtainPairResponseSerializer(serializers.Serializer):
    access = serializers.CharField()
    refresh = serializers.CharField()

    def create(self, validated_data):
        raise NotImplementedError()

    def update(self, instance, validated_data):
        raise NotImplementedError()


class DecoratedTokenObtainPairView(TokenObtainPairView):
    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: TokenObtainPairResponseSerializer,
        }
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class TokenRefreshResponseSerializer(serializers.Serializer):
    access = serializers.CharField()

    def create(self, validated_data):
        raise NotImplementedError()

    def update(self, instance, validated_data):
        raise NotImplementedError()


class DecoratedTokenRefreshView(TokenRefreshView):
    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: TokenRefreshResponseSerializer,
        }
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class TokenVerifyResponseSerializer(serializers.Serializer):
    def create(self, validated_data):
        raise NotImplementedError()

    def update(self, instance, validated_data):
        raise NotImplementedError()


class DecoratedTokenVerifyView(TokenVerifyView):
    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: TokenVerifyResponseSerializer,
        }
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class TokenBlacklistResponseSerializer(serializers.Serializer):
    def create(self, validated_data):
        raise NotImplementedError()

    def update(self, instance, validated_data):
        raise NotImplementedError()


class DecoratedTokenBlacklistView(TokenBlacklistView):
    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: TokenBlacklistResponseSerializer,
        }
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)
