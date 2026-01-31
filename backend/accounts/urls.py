from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import UserViewSet, LogoutView

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # Logout is client-side (delete token) but we can keep a blacklist view if needed.
    # For now, logical logout is just client side, but we can have an endpoint if blacklist is enabled.
    # We will keep the previous LogoutView or remove it if not used. 
    # Let's keep it but it might just return 200 OK.
    path('logout/', LogoutView.as_view({'post': 'create'}), name='logout'),
    path('', include(router.urls)),
]
