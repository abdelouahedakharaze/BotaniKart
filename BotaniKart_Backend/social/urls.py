from django.urls import path
from .views import CreateShareView, SocialPostListCreateView, SocialPostDetailView, LikeView, CommentListCreateView

urlpatterns = [
    path('share/', CreateShareView.as_view(), name='create-share'),
    path('posts/', SocialPostListCreateView.as_view(), name='social-post-list-create'),
    path('posts/<int:pk>/', SocialPostDetailView.as_view(), name='social-post-detail'),
    path('posts/<int:post_id>/like/', LikeView.as_view(), name='like-post'),
    path('posts/<int:post_id>/comments/', CommentListCreateView.as_view(), name='comment-list-create'),
]