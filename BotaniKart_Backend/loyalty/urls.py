from django.urls import path
from .views import JoinLoyaltyProgramView, GetLoyaltyPointsView, RedeemRewardView, LoyaltyRewardListView, LoyaltyTransactionListView

urlpatterns = [
    path('join/<int:program_id>/', JoinLoyaltyProgramView.as_view(), name='join-loyalty-program'),
    path('points/', GetLoyaltyPointsView.as_view(), name='get-loyalty-points'),
    path('redeem/<int:reward_id>/', RedeemRewardView.as_view(), name='redeem-reward'),
    path('rewards/', LoyaltyRewardListView.as_view(), name='loyalty-rewards'),
    path('transactions/', LoyaltyTransactionListView.as_view(), name='loyalty-transactions'),
]