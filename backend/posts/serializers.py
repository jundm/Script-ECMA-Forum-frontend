import re
from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.relations import PrimaryKeyRelatedField, StringRelatedField

from .models import Post, Comment, PostComment, PostType


class AuthorSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField("avatar_url_field")

    class Meta:
        model = get_user_model()
        fields = ["username", "name", "avatar_url"]

    def avatar_url_field(self, author):
        if re.match(r"^https?://", author.avatar_url):
            return author.avatar_url
        if "request" in self.context:
            scheme = self.context["request"].scheme
            host = self.context["request"].get_host()
            return scheme + "://" + host + author.avatar_url


class PostTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostType
        fields = ["is_category"]


class PostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    category = StringRelatedField()
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=PostType.objects.all(), source="category", write_only=True
    )

    class Meta:
        model = Post
        fields = [
            "id",
            "category",
            "category_id",
            "author",
            "title",
            "content",
            "tag_set",
            "created_at",
            "updated_at",
        ]


class PostCommentSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = PostComment
        fields = [
            "id",
            "author",
            "answer",
            "title",
            "content",
            "tag_set",
            "created_at",
            "updated_at",
        ]


class CommentSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ["id", "author", "content", "created_at"]
