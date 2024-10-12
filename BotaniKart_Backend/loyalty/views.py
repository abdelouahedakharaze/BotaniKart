from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import LoyaltyProgram, LoyaltyMember, LoyaltyReward, LoyaltyTransaction
from .serializers import LoyaltyProgramSerializer, LoyaltyMemberSerializer, LoyaltyRewardSerializer, LoyaltyTransactionSerializer
from django.shortcuts import get_object_or_404

class JoinLoyaltyProgramView(generics.CreateAPIView):
    serializer_class = LoyaltyMemberSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        program = get_object_or_404(LoyaltyProgram, id=self.kwargs['program_id'])
        serializer.save(user=self.request.user, program=program)

class GetLoyaltyPointsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        member = get_object_or_404(LoyaltyMember, user=request.user)
        return Response({'points': member.points})

class RedeemRewardView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, reward_id):
        member = get_object_or_404(LoyaltyMember, user=request.user)
        reward = get_object_or_404(LoyaltyReward, id=reward_id)

        if member.points >= reward.points_required:
            member.points -= reward.points_required
            member.save()

            LoyaltyTransaction.objects.create(
                member=member,
                points=-reward.points_required,
                description=f"Redeemed reward: {reward.name}"
            )

            return Response({'message': 'Reward redeemed successfully'})
        else:
            return Response({'error': 'Insufficient points'}, status=status.HTTP_400_BAD_REQUEST)

class LoyaltyRewardListView(generics.ListAPIView):
    serializer_class = LoyaltyRewardSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        member = get_object_or_404(LoyaltyMember, user=self.request.user)
        return LoyaltyReward.objects.filter(program=member.program)

class LoyaltyTransactionListView(generics.ListAPIView):
    serializer_class = LoyaltyTransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        member = get_object_or_404(LoyaltyMember, user=self.request.user)
        return LoyaltyTransaction.objects.filter(member=member).order_by('-created_at')