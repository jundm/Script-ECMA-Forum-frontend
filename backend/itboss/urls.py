from rest_framework.routers import DefaultRouter
from . import views
from django.urls import path, include

router = DefaultRouter()
router.register("posts", views.PostViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
]
