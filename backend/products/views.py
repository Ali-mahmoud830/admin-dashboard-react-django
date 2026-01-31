from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .models import Product
from .serializers import ProductSerializer

User = get_user_model()

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    # Protected routes: only authenticated users can manage products
    permission_classes = [permissions.IsAuthenticated]

class DashboardStatsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        total_users = User.objects.count()
        total_products = Product.objects.count()
        # Example of logic: Products with stock < 5
        low_stock = Product.objects.filter(stock__lt=5).count()
        
        return Response({
            'total_users': total_users,
            'total_products': total_products,
            'low_stock': low_stock
        })

