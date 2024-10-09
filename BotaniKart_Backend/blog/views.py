from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Article, Comment, Like
from .serializers import ArticleSerializer, CommentSerializer, LikeSerializer

class IsAuthorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.author == request.user

class ArticleList(generics.ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class ArticleDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthorOrReadOnly]

class CommentList(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Comment.objects.filter(article_id=self.kwargs['article_id'])

    def perform_create(self, serializer):
        article = Article.objects.get(pk=self.kwargs['article_id'])
        serializer.save(author=self.request.user, article=article)

class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthorOrReadOnly]

class LikeArticle(generics.CreateAPIView, generics.DestroyAPIView):
    serializer_class = LikeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Like.objects.filter(article_id=self.kwargs['article_id'], user=self.request.user)

    def create(self, request, *args, **kwargs):
        article = Article.objects.get(pk=self.kwargs['article_id'])
        like, created = Like.objects.get_or_create(user=request.user, article=article)
        if created:
            return Response({'status': 'liked'}, status=status.HTTP_201_CREATED)
        return Response({'status': 'already liked'}, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        article = Article.objects.get(pk=self.kwargs['article_id'])
        Like.objects.filter(user=request.user, article=article).delete()
        return Response({'status': 'unliked'}, status=status.HTTP_204_NO_CONTENT)