from django.contrib import admin

from .models import Post


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
