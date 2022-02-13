import re
import datetime
from django.utils import timezone
from rest_framework.generics import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from .models import Post, Comment, PostComment, Tag
from .serializers import PostSerializer, CommentSerializer,PostCommentSerializer
from .pagination import PostPageNumberPagination

class PostViewSet(ModelViewSet):
    queryset = Post.objects.all().select_related("author")
    serializer_class = PostSerializer

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["id", "category"]
    permission_classes = [IsAuthenticatedOrReadOnly,]
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
    def retrieve(self,request,pk=None,*args,**kwargs):
        # 조회수 cookie https://moondol-ai.tistory.com/216
        instance = get_object_or_404(self.get_queryset(),pk=pk)
        # 밤 12시에 쿠키 초기화
        tomorrow =  datetime.datetime.replace(timezone.datetime.now(), hour=23, minute=59, second=0)
        expires = datetime.datetime.strftime(tomorrow, "%a, %d-%b-%Y %H:%M:%S GMT")

        # 쿠키 만들 준비
        serializer = self.get_serializer(instance)
        response = Response(serializer.data, status=status.HTTP_200_OK)

        # 쿠키 읽기 & 생성
        if request.COOKIES.get('hit') is not None:
            # 쿠키에 hit 값이 이미 있을 경우
            cookies = request.COOKES.get('hit')
            cookies_list = cookies.split('|')
            if str(pk) not in cookies_list:
                response.set_cookie('hit',cookies+f'|{pk}',expries=expires)
                with transaction.atomic():
                    instance.views += 1
                    instance.save()
            else:
                response.set_cookie('hit',pk, expires=expires)
                instance.views += 1
                instance.save()
        # views가 추가되면 해당 instance를 serializer에 표시
        serializer = self.get_serializer(instance)
        response = Response(serializer.data, status=status.HTTP_200_OK)
        return response

class PostCommentViewSet(ModelViewSet):
    queryset = PostComment.objects.all()
    serializer_class = PostCommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, ]

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
    permission_classes = [IsAuthenticatedOrReadOnly, ]

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
