from django.urls import path
from .views import PostList, PostDetail, CategoryList, CategoryDetail, TagList, TagDetail, CommentList, CommentDetail, UserPostList

urlpatterns = [
    path('posts/', PostList.as_view(), name='post-list'),
    path('posts/<int:pk>/', PostDetail.as_view(), name='post-detail'),
    path('categories/', CategoryList.as_view(), name='category-list'),
    path('categories/<int:pk>/', CategoryDetail.as_view(), name='category-detail'),
    path('tags/', TagList.as_view(), name='tag-list'),
    path('tags/<int:pk>/', TagDetail.as_view(), name='tag-detail'),
    path('posts/<int:post_id>/comments/', CommentList.as_view(), name='comment-list'),
    path('comments/<int:pk>/', CommentDetail.as_view(), name='comment-detail'),
    path('user/posts/', UserPostList.as_view(), name='user-post-list'),
]