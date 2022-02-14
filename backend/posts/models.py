import re
from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext as _


class PostModel(models.Model):
    title = models.CharField(_("제목"), max_length=100, null=False)
    content = models.TextField(_("내용"), null=False)
    tag_set = models.ManyToManyField("Tag", blank=True, verbose_name=_("태그"))
    created_at = models.DateTimeField(_("작성일"), auto_now_add=True)
    updated_at = models.DateTimeField(_("수정일"), auto_now=True)

    class Meta:
        abstract = True

    def __str__(self):
        return f"{self.title},{self.content},{self.author}"


class Post(PostModel):
    Choices = (
        ("free", "free"),
        ("question", "question"),
        ("hot", "hot"),
        ("news", "news"),
    )
    category = models.CharField(max_length=12, choices=Choices)
    hit = models.IntegerField(default=0)

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="PostAuthor_set",
        on_delete=models.CASCADE,
        verbose_name=_("작성자"),
    )
    like_user_set = models.ManyToManyField(
        settings.AUTH_USER_MODEL, blank=True, related_name="like_post_set"
    )

    class Meta:
        ordering = ["-id"]


class PostLikes(models.Model):
    user = models.ForeignKey(
        verbose_name="좋아요(유저)",
        related_name="User_likes",
        to=settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        blank=True,
    )
    post = models.ForeignKey(
        verbose_name="좋아요(게시글)",
        related_name="Post_likes",
        to=Post,
        on_delete=models.CASCADE,
        blank=True,
    )
    created_at = models.DateTimeField(_("작성일"), auto_now_add=True)
    updated_at = models.DateTimeField(_("수정일"), auto_now=True)

    def __str__(self):
        return f"Like from user {self.user_id}"


#
# class PostDisLikes(models.Model):
#     user = models.ForeignKey(
#         verbose_name="안좋아요(유저)",
#         related_name="User_Dislikes",
#         to=settings.AUTH_USER_MODEL,
#         on_delete=models.CASCADE,
#         blank=True,
#     )
#     post = models.ForeignKey(
#         verbose_name="안좋아요(게시글)",
#         related_name="Post_Dislikes",
#         to=Post,
#         on_delete=models.CASCADE,
#         blank=True,
#     )
#     created_at = models.DateTimeField(_("작성일"), auto_now_add=True)
#     updated_at = models.DateTimeField(_("수정일"), auto_now=True)
#
#     def __str__(self):
#         return f"DisLike from user {self.user_id}"


class PostComment(PostModel):
    answer = models.ForeignKey(Post, on_delete=models.CASCADE, verbose_name=_("원글"))
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="PostCommentAuthor_set",
        on_delete=models.CASCADE,
        verbose_name=_("답변작성자"),
    )

    class Meta:
        ordering = ["-id"]

    def __str__(self):
        return f"{self.author},{self.title},{self.content}"


class Comment(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="CommentAuthor_set",
        verbose_name=_("댓글작성자"),
    )

    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    content = models.TextField(_("내용"), null=False)

    created_at = models.DateTimeField(_("작성일"), auto_now_add=True)
    updated_at = models.DateTimeField(_("수정일"), auto_now=True)

    class Meta:
        ordering = ["-id"]

    def __str__(self):
        return f"{self.author},{self.post},{self.content}"


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name
