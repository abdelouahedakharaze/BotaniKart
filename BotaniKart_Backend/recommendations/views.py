from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import UserProductInteraction, ProductSimilarity
from products.models import Product
from .serializers import ProductRecommendationSerializer
from django.db.models import Sum

class RecordProductInteractionView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        product_id = request.data.get('product_id')
        interaction_type = request.data.get('interaction_type')  # 'view' or 'purchase'

        interaction, created = UserProductInteraction.objects.get_or_create(
            user=request.user,
            product_id=product_id
        )

        if interaction_type == 'view':
            interaction.view_count += 1
        elif interaction_type == 'purchase':
            interaction.purchase_count += 1

        interaction.save()

        return Response({'status': 'success'})

class GetProductRecommendationsView(generics.ListAPIView):
    serializer_class = ProductRecommendationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        
        # Get user's most interacted products
        user_interactions = UserProductInteraction.objects.filter(user=user).order_by('-view_count', '-purchase_count')[:5]
        
        recommended_products = set()
        for interaction in user_interactions:
            similar_products = ProductSimilarity.objects.filter(product1=interaction.product).order_by('-similarity_score')[:3]
            recommended_products.update([sp.product2 for sp in similar_products])
        
        # If not enough recommendations, add popular products
        if len(recommended_products) < 10:
            popular_products = Product.objects.annotate(
                total_interactions=Sum('userproductinteraction__view_count') + Sum('userproductinteraction__purchase_count')
            ).order_by('-total_interactions')
            
            recommended_products.update(popular_products[:10 - len(recommended_products)])
        
        return list(recommended_products)[:10]