from django.test import TestCase
from accounts.models import CustomUser
from backend.settings.common import INSTALLED_APPS
from backend.settings.common import AUTH_USER_MODEL
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status

# User Setting Test
class SettingsTest(TestCase):
    def test_account_is_configured(self):
        assert "accounts" in INSTALLED_APPS
        assert "accounts.CustomUser" == AUTH_USER_MODEL


# Model Test
class UserModelCreateTest(TestCase):
    def setUp(self):
        self.email = "test1@test.com"
        self.name = "박으뜸"
        self.username = "uttum"
        self.password = "1212"
        self.test_user = CustomUser.objects.create_user(
            email=self.email,
            name=self.name,
            username=self.username,
            password=self.password,
        )

    def test_create_user(self):
        assert isinstance(self.test_user, CustomUser)

    def test_default_user_is_active(self):
        assert self.test_user.is_active

    def test_default_user_is_staff(self):
        assert not self.test_user.is_staff

    def test_default_user_is_superuser(self):
        assert not self.test_user.is_superuser

    def test_default_email(self):
        assert self.test_user.email.__str__() == self.email


# API Test
class UserAPITest(APITestCase):
    def setUp(self):
        self.email = "super@test.com"
        self.name = "jun"
        self.username = "lazyjun"
        self.password = "1212"
        self.test_superuser = CustomUser.objects.create_user(
            email=self.email,
            name=self.name,
            username=self.username,
            password=self.password,
        )

    def test_can_create_user(self):
        assert isinstance(self.test_superuser, CustomUser)
