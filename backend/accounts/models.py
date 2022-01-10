# https://medium.com/chanjongs-programming-diary/django-rest-framework로-소셜-로그인-api-구현해보기-google-kakao-github-2ccc4d49a781
# https://wisdom-990629.tistory.com/44
# https://dev.to/lymaa/authenticate-with-djoser-2kf7
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext as _
from accounts.managers import CustomUserManager


<<<<<<< HEAD
class CustomUser(AbstractBaseUser):
    ADMIN = "admin"
    STAFF = "staff"
    STATUS = [
        (ADMIN, _("Admin User")),
        (STAFF, _("Staff User")),
    ]
    email = models.EmailField(_("이메일 주소"), unique=True)
    username = models.CharField(_("실명"), max_length=30)
    nickname = models.CharField(_("닉네임"), max_length=30, unique=True)
=======
class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_("이메일 주소"), max_length=50, unique=True)
    name = models.CharField(_("실명"), max_length=30)
    username = models.CharField(_("닉네임"), max_length=30, unique=True)
>>>>>>> 2d0cac79333aaa0f888ff12252cde9a93a475488
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)  # a admin user; non super-user
    is_admin = models.BooleanField(default=False)

<<<<<<< HEAD
    USERNAME_FIELD = "nickname"
    REQUIRED_FIELDS = ["email", "username"]
=======
    date_joined = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email", "name"]
>>>>>>> 2d0cac79333aaa0f888ff12252cde9a93a475488

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
