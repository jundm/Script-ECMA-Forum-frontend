from django.contrib import admin

from .models import PostContentType, PostContent, Post, Comment, Tag


@admin.register(PostContentType)
class PostContentTypeAdmin(admin.ModelAdmin):
    list_display = ("id", "type")


@admin.register(PostContent)
class PostContentAdmin(admin.ModelAdmin):
    list_display = ("id", "content", "type")
    list_filter = ("type",)


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "author",
        "post_content",
        "created_at",
        "updated_at",
        "photo",
    )
    list_filter = ("created_at", "updated_at", "author", "post_content")
    raw_id_fields = ("tag_set", "like_user_set")
    date_hierarchy = "created_at"


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "created_at",
        "updated_at",
        "author",
        "post",
        "message",
    )
    list_filter = ("created_at", "updated_at", "author", "post")
    date_hierarchy = "created_at"


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)
