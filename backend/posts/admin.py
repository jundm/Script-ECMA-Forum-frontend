from django.contrib import admin

from .models import PostType, Post, Comment, Tag


@admin.register(PostType)
class PostTypeAdmin(admin.ModelAdmin):
    list_display = ("id", "is_type")


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "type",
        "title",
        "content",
        "author",
        "created_at",
    )
    list_filter = ("type", "author", "created_at", "updated_at")
    date_hierarchy = "created_at"
    search_fields = ["title"]

    def short_content(self, post):
        return post.content[:15]


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
