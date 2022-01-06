from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import BaseUserManager
from django.utils.translation import gettext as _

# https://krakensystems.co/blog/2020/custom-users-using-django-rest-framework
# https://dev.to/raghavmalawat/custom-user-manager-django-rest-framework-5578
# https://docs.djangoproject.com/en/4.0/topics/db/managers/

class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, nickname, password=None):
        if not email:
            raise ValueError(_("User must have an email"))
        if not password:
            raise ValueError(_("User must have a password"))
        if not username:
            raise ValueError(_("User must have a username"))
        if not nickname:
            raise ValueError(_("User must have a nickname"))

        user = self.model(
            email=self.normalize_email(email)
        )
        user.username = username
        user.nickname = nickname
        user.set_password(password)  # change password to hash
        user.is_admin = False
        user.is_staff = False
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, nickname, password=None):
        if not email:
            raise ValueError(_("User must have an email"))
        if not password:
            raise ValueError(_("User must have a password"))
        if not username:
            raise ValueError(_("User must have a  username"))
        if not nickname:
            raise ValueError(_("User must have a nickname"))

        user = self.model(
            email=self.normalize_email(email)
        )
        user.username = username
        user.nickname = nickname
        user.set_password(password)  # change password to hash
        user.is_admin = True
        user.is_staff = True
        user.save(using=self._db)
        return user

    def create_staffuser(self, email, username, nickname,  password=None):
        if not email:
            raise ValueError(_("User must have an email"))
        if not password:
            raise ValueError(_("User must have a password"))
        if not username:
            raise ValueError(_("User must have a  username"))
        if not nickname:
            raise ValueError(_("User must have a nickname"))

        user = self.model(
            email=self.normalize_email(email)
        )
        user.username = username
        user.nickname = nickname
        user.set_password(password)  # change password to hash
        user.is_admin = False
        user.is_staff = True
        user.save(using=self._db)
        return user
