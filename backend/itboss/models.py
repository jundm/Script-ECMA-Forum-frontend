from django.db import models
from django.urls import reverse
from django.conf import settings
import re

# 추상화
class TimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Post(TimestampedModel):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="my_post_set", on_delete=models.CASCADE
    )
    photo = models.ImageField(upload_to="itboss/post/%Y/%m/%d")
    content = models.TextField()
    tag_set = models.ManyToManyField("Tag", blank=True)
    like_user_set = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="like_post_set", blank=True
    )

    def __str__(self):
        return self.content

    def extract_tag_list(self):
        tag_name_list = re.findall(r"#([a-zA-Z\dㄱ-힣]+)", self.content)
        tag_list = []
        for tag_name in tag_name_list:
            tag, _ = Tag.objects.get_or_create(name=tag_name)
            tag_list.append(tag)
        return tag_list

    def get_absolute_url(self):
        return reverse("itboss:post_detail", args=[self.pk])

    def is_like_user(self, user):
        return self.like_user_set.filter(pk=user.pk).exists()

    class Meta:
        ordering = ["-id"]


class Comment(TimestampedModel):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    message = models.TextField()

    class Meta:
        ordering = ["-id"]


class Tag(TimestampedModel):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name
