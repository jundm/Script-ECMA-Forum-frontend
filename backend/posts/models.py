from django.conf import settings
from django.db import models
from django.utils.translation import gettext as _


class PostModel(models.Model):
    title = models.CharField(_("제목"), max_length=100, null=False)
    content = models.TextField(_("내용"), null=False)
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
    tag_set = models.ManyToManyField("Tag", blank=True, verbose_name=_("태그"))
    hit = models.IntegerField(default=0)

    # 정참조 select_releated
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="PostAuthor_set",
        on_delete=models.CASCADE,
        verbose_name=_("작성자"),
    )
    # 역참조 prefetch_related
    like_user_set = models.ManyToManyField(
        settings.AUTH_USER_MODEL, blank=True, related_name="like_post_set"
    )

    class Meta:
        ordering = ["-id"]


class PostComment(PostModel):
    answer = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        verbose_name=_("원글"),
        related_name="PostAnswer_set",
    )
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="PostCommentAuthor_set",
        on_delete=models.CASCADE,
        verbose_name=_("답변작성자"),
    )
    like_user_set = models.ManyToManyField(
        settings.AUTH_USER_MODEL, blank=True, related_name="like_post_comment_set"
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
    like_user_set = models.ManyToManyField(
        settings.AUTH_USER_MODEL, blank=True, related_name="like_comment_set"
    )

    created_at = models.DateTimeField(_("작성일"), auto_now_add=True)
    updated_at = models.DateTimeField(_("수정일"), auto_now=True)

    class Meta:
        ordering = ["-id"]

    def __str__(self):
        return f"{self.author},{self.post},{self.content}"


class CommentReply(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="CommentReplyAuthor_set",
        verbose_name=_("대댓글작성자"),
    )

    post = models.ForeignKey(Comment, on_delete=models.CASCADE)
    content = models.TextField(_("내용"), null=False)
    like_user_set = models.ManyToManyField(
        settings.AUTH_USER_MODEL, blank=True, related_name="like_comment_reply_set"
    )

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
