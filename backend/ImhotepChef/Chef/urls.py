from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView,
)
from . import views
from .auth import register, login, logout

router = DefaultRouter()
# Add your viewsets here when you create them

urlpatterns = [
    path('', include(router.urls)),
    # JWT Authentication endpoints
    path('auth/login/', login.login_view, name='login'),
    path('auth/logout/', logout.logout_view, name='logout'),
    path('auth/register/', register.register_view, name='register'),
    path('auth/verify-email/', register.verify_email, name='verify_email'),
    path('auth/user/', views.user_view, name='user'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]