from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import BaseUserManager
from django.utils.translation import gettext as _

# https://krakensystems.co/blog/2020/custom-users-using-django-rest-framework
# https://dev.to/raghavmalawat/custom-user-manager-django-rest-framework-5578
# https://docs.djangoproject.com/en/4.0/topics/db/managers/


class CustomUserManager(BaseUserManager):
    def create_user(self, email, name, username, password=None):
        if not email:
            raise ValueError(_("User must have an email"))
        if not password:
            raise ValueError(_("User must have a password"))
        if not name:
            raise ValueError(_("User must have a name"))
        if not username:
            raise ValueError(_("User must have a username"))

        user = self.model(email=self.normalize_email(email))
<<<<<<< HEAD
=======
        user.name = name
>>>>>>> 2d0cac79333aaa0f888ff12252cde9a93a475488
        user.username = username
        user.set_password(password)  # change password to hash
        user.is_admin = False
        user.is_staff = False
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, username, password=None):
        if not email:
            raise ValueError(_("User must have an email"))
        if not password:
            raise ValueError(_("User must have a password"))
        if not name:
            raise ValueError(_("User must have a  name"))
        if not username:
            raise ValueError(_("User must have a username"))

        user = self.model(email=self.normalize_email(email))
<<<<<<< HEAD
=======
        user.name = name
>>>>>>> 2d0cac79333aaa0f888ff12252cde9a93a475488
        user.username = username
        user.set_password(password)  # change password to hash
        user.is_admin = True
        user.is_staff = True
        user.save(using=self._db)
        return user

<<<<<<< HEAD
    def create_staffuser(self, email, username, nickname, password=None):
=======
    def create_staffuser(self, email, name, username, password=None):
>>>>>>> 2d0cac79333aaa0f888ff12252cde9a93a475488
        if not email:
            raise ValueError(_("User must have an email"))
        if not password:
            raise ValueError(_("User must have a password"))
        if not name:
            raise ValueError(_("User must have a  name"))
        if not username:
            raise ValueError(_("User must have a username"))

        user = self.model(email=self.normalize_email(email))
<<<<<<< HEAD
=======
        user.name = name
>>>>>>> 2d0cac79333aaa0f888ff12252cde9a93a475488
        user.username = username
        user.set_password(password)  # change password to hash
        user.is_admin = False
        user.is_staff = True
        user.save(using=self._db)
        return user
