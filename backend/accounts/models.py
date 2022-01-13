# https://medium.com/chanjongs-programming-diary/django-rest-framework로-소셜-로그인-api-구현해보기-google-kakao-github-2ccc4d49a781
# https://wisdom-990629.tistory.com/44
# https://dev.to/lymaa/authenticate-with-djoser-2kf7
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.shortcuts import resolve_url
from django.utils.translation import gettext as _
from accounts.managers import CustomUserManager


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_("이메일 주소"), max_length=50, unique=True)
    name = models.CharField(_("실명"), max_length=30)
    username = models.CharField(_("닉네임"), max_length=30, unique=True)
    avatar = models.ImageField(
        _("프로필 사진"),
        blank=True,
        upload_to="accounts/avatar/%Y/%m/%d",
        help_text="개성을 표현할 수 있는 사진을 올려주세요!",
    )

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)  # a admin user; non super-user
    is_admin = models.BooleanField(default=False)

    date_joined = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "name"]

    objects = CustomUserManager()

    @staticmethod
    def has_perm(perm, obj=None):
        # "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    @staticmethod
    def has_module_perms(app_label):
        # "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    def __str__(self):
        return "{}".format(self.email)

    def get_short_name(self):
        return self.username

    @property
    def avatar_url(self):
        if self.avatar:
            return self.avatar.url
        else:
            return resolve_url("pydenticon_image", self.username)
