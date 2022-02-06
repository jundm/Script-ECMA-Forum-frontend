import re

from rest_framework.generics import get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from .models import Post, Comment, PostComment, Tag
from .serializers import PostSerializer, CommentSerializer, PostCommentSerializer
from .pagination import PostPageNumberPagination


class PostViewSet(ModelViewSet):
    queryset = Post.objects.all().select_related("author")
    serializer_class = PostSerializer

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["id", "category"]
    permission_classes = [AllowAny]
    pagination_class = PostPageNumberPagination

    def perform_create(self, serializer):
        author = self.request.user
        serializer.save(author=author)

        post = serializer.instance

        tag_name_set = self.request.data.get("content")
        re_tag = re.findall(r"#([a-zA-Z\dㄱ-힣]+)", tag_name_set)

        tag_list = []
        for word in re_tag:
            tag_name = word.strip()
            tag, __ = Tag.objects.get_or_create(name=tag_name)
            tag_list.append(tag)

        post.tag_set.add(*tag_list)


class PostCommentViewSet(ModelViewSet):

    queryset = PostComment.objects.all()
    serializer_class = PostCommentSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

    def get_queryset(self):
        qs = super().get_queryset()
        qs = qs.filter(post__pk=self.kwargs["post_pk"])
        return qs

    def perform_create(self, serializer):
        answer = get_object_or_404(Post, pk=self.kwargs["post_pk"])
        serializer.save(author=self.request.user, answer=answer)
        post = serializer.instance

        tag_name_set = self.request.data.get("content")
        re_tag = re.findall(r"#([a-zA-Z\dㄱ-힣]+)", tag_name_set)

        tag_list = []
        for word in re_tag:
            tag_name = word.strip()
            tag, __ = Tag.objects.get_or_create(name=tag_name)
            tag_list.append(tag)

        post.tag_set.add(*tag_list)



class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

    def get_queryset(self):
        qs = super().get_queryset()
        qs = qs.filter(post__pk=self.kwargs["post_pk"])
        return qs

    def perform_create(self, serializer):
        post = get_object_or_404(Post, pk=self.kwargs["post_pk"])
        serializer.save(author=self.request.user, post=post)
        return super().perform_create(serializer)
