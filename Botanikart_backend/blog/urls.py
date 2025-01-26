from django.urls import path
from .views import PostViewSet, CommentViewSet

urlpatterns = [
    # Post URLs
    path('posts/', PostViewSet.as_view({'get': 'list', 'post': 'create'}), name='post-list'),
    path('posts/<int:pk>/', PostViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='post-detail'),
    path('posts/<int:pk>/add_comment/', PostViewSet.as_view({'post': 'add_comment'}), name='post-add-comment'),
    path('posts/<int:pk>/toggle_heart/', PostViewSet.as_view({'post': 'add_heart'}), name='post-toggle-heart'),

    # Comment URLs
    path('comments/', CommentViewSet.as_view({'get': 'list', 'post': 'create'}), name='comment-list'),
    path('comments/<int:pk>/', CommentViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='comment-detail'),
]