import re
from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Post, Comment, PostComment


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


class PostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    tag_set = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Post
        fields = [
            "id",
            "category",
            "author",
            "title",
            "content",
            "tag_set",
            "created_at",
            "updated_at",
        ]


class PostCommentSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    tag_set = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = PostComment
        fields = [
            "id",
            "author",
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
