from django.urls import path, include
from rest_framework import routers
from rest_framework.routers import DefaultRouter

from . import views


app_name = "postsApp"
router = DefaultRouter()
router.register("api", views.PostViewSet, "postsApi")
router.register(r"api/(?P<post_pk>\d+)/postComment", views.PostCommentViewSet)
router.register(r"api/(?P<post_pk>\d+)/comments", views.CommentViewSet)


urlpatterns = [] + router.urls
