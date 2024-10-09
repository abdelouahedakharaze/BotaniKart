from django.urls import path
from .views import ArticleList, ArticleDetail, CommentList, CommentDetail, LikeArticle

urlpatterns = [
    path('articles/', ArticleList.as_view(), name='article-list'),
    path('articles/<int:pk>/', ArticleDetail.as_view(), name='article-detail'),
    path('articles/<int:article_id>/comments/', CommentList.as_view(), name='comment-list'),
    path('comments/<int:pk>/', CommentDetail.as_view(), name='comment-detail'),
    path('articles/<int:article_id>/like/', LikeArticle.as_view(), name='like-article'),
]
