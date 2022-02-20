import re
import datetime
from django.db import transaction
from django.utils import timezone
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework import status, generics
from rest_framework.permissions import (
    IsAuthenticatedOrReadOnly,
    IsAuthenticated,
    AllowAny,
)
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from .models import Post, Comment, PostComment, Tag
from .serializers import (
    PostSerializer,
    CommentSerializer,
    PostCommentSerializer,
    HotPostSerializer,
)
from .pagination import PostPageNumberPagination


class PostViewSet(ModelViewSet):
    queryset = (
        Post.objects.all()
        .select_related("author")
        .prefetch_related("tag_set", "like_user_set")
    )
    serializer_class = PostSerializer

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["id", "category"]
    permission_classes = [
        IsAuthenticatedOrReadOnly,
    ]
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

    def retrieve(self, request, pk=None, *args, **kwargs):
        # 조회수 cookie https://moondol-ai.tistory.com/216
        instance = get_object_or_404(self.get_queryset(), pk=pk)
        # 밤 12시에 쿠키 초기화
        tomorrow = datetime.datetime.replace(
            timezone.datetime.now(), hour=23, minute=59, second=0
        )
        expires = datetime.datetime.strftime(tomorrow, "%a, %d-%b-%Y %H:%M:%S GMT")

        # 쿠키 만들 준비
        serializer = self.get_serializer(instance)
        response = Response(serializer.data, status=status.HTTP_200_OK)

        # 쿠키 읽기 & 생성
        if request.COOKIES.get("hit") is not None:
            # 쿠키에 hit 값이 이미 있을 경우
            cookies = request.COOKES.get("hit")
            print("retrieve", cookies)
            cookies_list = cookies.split("|")
            if str(pk) not in cookies_list:
                response.set_cookie("hit", cookies + f"|{pk}", expries=expires)
                with transaction.atomic():
                    instance.hit += 1
                    instance.save()
        else:
            response.set_cookie("hit", pk, expires=expires)
            print("retrieve", response)
            instance.hit += 1
            instance.save()
        # views가 추가되면 해당 instance를 serializer에 표시
        serializer = self.get_serializer(instance)
        response = Response(serializer.data, status=status.HTTP_200_OK)
        return response

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        # context.update({"request": self.request})
        return context

    @action(detail=True, methods=["POST"])
    def like(self, request, pk):
        post = self.get_object()
        post.like_user_set.add(self.request.user)
        return Response(status.HTTP_201_CREATED)

    @like.mapping.delete
    def unlike(self, request, pk):
        post = self.get_object()
        post.like_user_set.remove(self.request.user)
        return Response(status.HTTP_204_NO_CONTENT)


class HotPost(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = HotPostSerializer
    permission_classes = [
        IsAuthenticatedOrReadOnly,
    ]
    pagination_class = PostPageNumberPagination

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        timesince = timezone.now() - datetime.timedelta(days=7)

        queryset = (
            queryset.exclude(like_user_set__isnull=True)
            .filter(created_at__gte=timesince)
            .order_by("-like_user_set")
        )[0:60]

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class PostCommentViewSet(ModelViewSet):
    queryset = PostComment.objects.all()
    serializer_class = PostCommentSerializer
    permission_classes = [
        IsAuthenticatedOrReadOnly,
    ]

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
    permission_classes = [
        IsAuthenticatedOrReadOnly,
    ]

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
