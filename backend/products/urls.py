from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, DashboardStatsView

router = DefaultRouter()
router.register(r'products', ProductViewSet)

urlpatterns = [
    path('dashboard/stats/', DashboardStatsView.as_view(), name='dashboard-stats'),
    path('', include(router.urls)),
]
