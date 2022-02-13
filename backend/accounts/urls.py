from django.urls import path, include
from rest_framework import urls
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

app_name = "accounts"


urlpatterns = [
    # path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    # path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("info/follow/", views.user_follow, name="user_follow"),
    path("info/unfollow/", views.user_unfollow, name="user_unfollow"),
]
