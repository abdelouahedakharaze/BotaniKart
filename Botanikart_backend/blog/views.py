# blog/views.py
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Post, Comment, Heart
from .serializers import PostSerializer, CommentSerializer, HeartSerializer
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]  # Allow read-only for everyone, modify only for authenticated users

    def perform_create(self, serializer):
        # Automatically assign the logged-in user as the author of the post
        serializer.save(author=self.request.user)

    # views.py
@action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
def add_comment(self, request, pk=None):
    post = self.get_object()
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(post=post, user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def add_heart(self, request, pk=None):
        post = self.get_object()
        user = request.user
        heart, created = Heart.objects.get_or_create(post=post, user=user)
        if created:
            return Response({'status': 'liked'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'status': 'already liked'}, status=status.HTTP_400_BAD_REQUEST)

    def get_permissions(self):
        if self.action in ['create', 'update', 'destroy']:
            self.permission_classes = [IsAuthenticated]
        elif self.action == 'add_comment':
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]  # Only authenticated users can create comments

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
