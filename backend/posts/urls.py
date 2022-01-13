from django.urls import path, include
from rest_framework import routers
from rest_framework.routers import DefaultRouter

from . import views


app_name = "postsApp"
router = DefaultRouter()
router.register("api", views.PostViewSet, "postsApi")


urlpatterns = [] + router.urls
