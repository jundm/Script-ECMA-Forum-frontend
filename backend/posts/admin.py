from django.contrib import admin

from .models import Post, Tag, Comment


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "short_content",
        "author",
        "created_at",
        "updated_at",
    )
    list_display_links = ("title", "short_content", "author")
    list_filter = ("author", "created_at", "updated_at")
    search_fields = ["title"]
    date_hierarchy = "created_at"

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
