# 수정 사항
# search_fields = ["title"]
#
# def short_content(self, post):
#     return post.content[:15]
from django.contrib import admin

from .models import Post, PostComment, Comment, Tag


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "content",
        "created_at",
        "updated_at",
        "category",
        "author",
    )
    list_filter = ("created_at", "updated_at", "category", "author")
    date_hierarchy = "created_at"


@admin.register(PostComment)
class PostCommentAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "content",
        "created_at",
        "updated_at",
        "answer",
        "author",
    )
    list_filter = ("created_at", "updated_at", "answer", "author")
    date_hierarchy = "created_at"


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "author",
        "post",
        "content",
        "created_at",
        "updated_at",
    )
    list_filter = ("author", "post", "created_at", "updated_at")
    date_hierarchy = "created_at"


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)
