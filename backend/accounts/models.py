
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.db import models
from django.shortcuts import resolve_url


class User(AbstractUser):
    class GenderChoices(models.TextChoices):
        MALE = "M", "Mail"
        FEMAIL = "F", "Femail"

    follower_set = models.ManyToManyField("self", blank=True)
    following_set = models.ManyToManyField("self", blank=True)

    website_url = models.URLField(blank=True)
    bio = models.TextField(blank=True)
    phone_number = models.CharField(
        blank=True,
        max_length=14,
        validators=[RegexValidator(r"^010-?[1-9]\d{4}-?\d{4}")],
    )
    gender = models.CharField(blank=True, max_length=1, choices=GenderChoices.choices)
    avatar = models.ImageField(
        blank=True, upload_to="accounts/avatar/%Y/%m/%d", help_text="본인을 표현할 수 있는 사진으로 올려주세요"
    )

    @property
    def name(self):
        return f"{self.first_name} {self.last_name}".strip()

    @property
    def avatar_url(self):
        if self.avatar:
            return self.avatar.url
        else:
            return resolve_url("pydenticon_image", self.username)