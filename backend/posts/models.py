from django.conf import settings
from django.db import models
from django.utils.translation import gettext as _


class Post(models.Model):
    title = models.CharField(_("제목"), max_length=100, null=False)
    content = models.TextField(_("내용"), null=False)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="postAuthor_set",
        on_delete=models.CASCADE,
    )
    created_at = models.DateTimeField(_("작성일"), auto_now_add=True)
    updated_at = models.DateTimeField(_("수정일"), auto_now=True)

    def __str__(self):
        return f"{self.title},{self.content},{self.author}"
