from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Share, SocialPost, Like, Comment
from .serializers import ShareSerializer, SocialPostSerializer, LikeSerializer, CommentSerializer
from products.models import Product

class CreateShareView(generics.CreateAPIView):
    serializer_class = ShareSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        product = Product.objects.get(id=self.request.data.get('product'))
        serializer.save(user=self.request.user, product=product)

class SocialPostListCreateView(generics.ListCreateAPIView):
    serializer_class = SocialPostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return SocialPost.objects.all().order_by('-created_at')

class SocialPostDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SocialPost.objects.all()
    serializer_class = SocialPostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        if self.request.user == serializer.instance.user:
            serializer.save()
        else:
            raise permissions.PermissionDenied("You don't have permission to edit this post.")

    def perform_destroy(self, instance):
        if self.request.user == instance.user:
            instance.delete()
        else:
            raise permissions.PermissionDenied("You don't have permission to delete this post.")

class LikeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, post_id):
        post = SocialPost.objects.get(id=post_id)
        like, created = Like.objects.get_or_create(user=request.user, post=post)
        if not created:
            like.delete()
            return Response({'message': 'Like removed'}, status=status.HTTP_200_OK)
        return Response({'message': 'Post liked'}, status=status.HTTP_201_CREATED)

class CommentListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        post = SocialPost.objects.get(id=self.kwargs['post_id'])
        serializer.save(user=self.request.user, post=post)

    def get_queryset(self):
        return Comment.objects.filter(post_id=self.kwargs['post_id']).order_by('-created_at')