import re
from django.db import models
from django.conf import settings


class TimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class PostContentType(models.Model):
    type = models.CharField(max_length=32, unique=True)

    class Meta:
        verbose_name = "PostConetntType"
        verbose_name_plural = "PostConetntTypes"

    def __str__(self):
        return self.type

    @classmethod
    def get_value_obj(cls, value) -> int:
        obj = cls.objects.get_or_create(type=value)[0].pk
        return obj

    @classmethod
    def get_text_obj(cls):
        return cls.get_value_obj("text")


# W: Anyone | R: Anyone
class PostContent(models.Model):
    content = models.TextField()
    type = models.ForeignKey(
        PostContentType,
        on_delete=models.SET_DEFAULT,
        default=PostContentType.get_text_obj,
        related_name="contents",
    )

    class Meta:
        verbose_name = "PostContent"
        verbose_name_plural = "PostContents"

    def __str__(self):
        return f"({self.type}) {self.content[:50]}..."

    def get_content(self):
        renders = {
            "markdown": lambda md: "md_to_html(md)",
            "html": lambda html: html,
            "text": lambda text: "".join([f"<p>{t}</p>" for t in text.split("\n")]),
        }
        return self.content


class Post(TimestampedModel):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="post_set", on_delete=models.CASCADE
    )
    photo = models.ImageField(upload_to="itobss/post/%Y/%m/%d", blank=True)
    post_content = models.OneToOneField(
        PostContent, on_delete=models.PROTECT, related_name="post"
    )
    # TODO: 임시저장
    # existing_state = models.ForeignKey(ExistingState, on_delete=models.SET_DEFAULT,
    #                                    default=ExistingState.get_default_obj, related_name='posts')
    tag_set = models.ManyToManyField("Tag", blank=True)
    like_user_set = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        blank=True,
        related_name="like_post_set",
    )

    class Meta:
        verbose_name = "Post"
        verbose_name_plural = "Posts"

    def __str__(self):
        return f"({self.author}) ({self.created_at}) {self.post_content.content[:60]}"

    def extract_tag_list(self):
        tag_name_list = re.findall(r"#([a-zA-Z\dㄱ-힣]+)", self.content)
        tag_list = []
        for tag_name in tag_name_list:
            tag, _ = Tag.objects.get_or_create(name=tag_name)
            tag_list.append(tag)
        return tag_list


class Comment(TimestampedModel):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    message = models.TextField()

    # TODO: 메세지 알림
    class Meta:
        ordering = ["-id"]


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name
