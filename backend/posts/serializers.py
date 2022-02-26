import re
from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Post, Comment, PostComment, CommentReply


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
    comment = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()
    isLikes = serializers.SerializerMethodField()

    def get_likes(self, post):
        return post.like_user_set.count()
        # return like_user_set.objects.filter(post=post).count()

    def get_comment(self, post):
        return Comment.objects.filter(post=post).count()

    def get_isLikes(self, post):
        if "request" in self.context:
            user = self.context["request"].user
            return post.like_user_set.filter(pk=user.pk).exists()
        else:
            return False

    class Meta:
        model = Post
        fields = [
            "id",
            "category",
            "hit",
            "likes",
            "isLikes",
            "author",
            "title",
            "content",
            "tag_set",
            "comment",
            "created_at",
            "updated_at",
        ]


class HotPostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    tag_set = serializers.StringRelatedField(many=True, read_only=True)
    comment = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()

    def get_likes(self, post):
        return post.like_user_set.count()

    def get_comment(self, post):
        return Comment.objects.filter(post=post).count()

    class Meta:
        model = Post
        fields = [
            "id",
            "category",
            "hit",
            # "like_user_set",
            "likes",
            "comment",
            "author",
            "title",
            "content",
            "tag_set",
            "created_at",
            "updated_at",
        ]


class PostCommentSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    likes = serializers.SerializerMethodField()
    isLikes = serializers.SerializerMethodField()

    def get_likes(self, post):
        return post.like_user_set.count()

    def get_isLikes(self, post):
        if "request" in self.context:
            user = self.context["request"].user
            return post.like_user_set.filter(pk=user.pk).exists()
        else:
            return False

    class Meta:
        model = PostComment
        fields = [
            "id",
            "author",
            "title",
            "content",
            "likes",
            "isLikes",
            "created_at",
            "updated_at",
        ]


class CommentSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    likes = serializers.SerializerMethodField()
    isLikes = serializers.SerializerMethodField()

    def get_likes(self, post):
        return post.like_user_set.count()

    def get_isLikes(self, post):
        if "request" in self.context:
            user = self.context["request"].user
            return post.like_user_set.filter(pk=user.pk).exists()
        else:
            return False

    class Meta:
        model = Comment
        fields = [
            "id",
            "author",
            "likes",
            "content",
            "isLikes",
            "created_at",
            "updated_at",
        ]


class CommentReplySerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    likes = serializers.SerializerMethodField()
    isLikes = serializers.SerializerMethodField()

    def get_likes(self, post):
        return post.like_user_set.count()

    def get_isLikes(self, post):
        if "request" in self.context:
            user = self.context["request"].user
            return post.like_user_set.filter(pk=user.pk).exists()
        else:
            return False

    class Meta:
        model = CommentReply
        fields = [
            "id",
            "author",
            "likes",
            "content",
            "isLikes",
            "created_at",
            "updated_at",
        ]
