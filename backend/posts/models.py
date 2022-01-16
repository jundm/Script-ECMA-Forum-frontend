import re
from django.conf import settings
from django.db import models
from django.utils.translation import gettext as _


class PostType(models.Model):
    is_category = models.CharField(_("카테고리"), max_length=50)

    def __str__(self):
        return self.is_category


class PostModel(models.Model):
    title = models.CharField(_("제목"), max_length=100, null=False)
    content = models.TextField(_("내용"), null=False)
    tag_set = models.ManyToManyField(
        "Tag",
        blank=True,
        verbose_name=_("태그"),
    )
    created_at = models.DateTimeField(_("작성일"), auto_now_add=True)
    updated_at = models.DateTimeField(_("수정일"), auto_now=True)

    class Meta:
        abstract = True

    def __str__(self):
        return f"{self.title},{self.content},{self.author}"

    def extract_tag_list(self):
        tag_name_list = re.findall(r"#([a-zA-Z\dㄱ-힣]+)", self.content)
        tag_list = []
        for tag_name in tag_name_list:
            tag, _ = Tag.objects.get_or_create(name=tag_name)
            tag_list.append(tag)
        return tag_list


class Post(PostModel):
    category = models.ForeignKey(
        PostType,
        on_delete=models.CASCADE,
        related_name="category",
        verbose_name=_("주제"),
    )
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="PostAuthor_set",
        on_delete=models.CASCADE,
        verbose_name=_("작성자"),
    )


class PostComment(PostModel):
    answer = models.ForeignKey(Post, on_delete=models.CASCADE, verbose_name=_("원글"))
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="PostCommentAuthor_set",
        on_delete=models.CASCADE,
        verbose_name=_("답변작성자"),
    )


class Comment(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
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
