from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView,
)
from . import views
from .auth import register, login, logout, google_auth

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
    # Google OAuth endpoints
    path('auth/google/url/', google_auth.google_login_url, name='google_login_url'),
    path('auth/google/authenticate/', google_auth.google_auth, name='google_auth'),
    path('auth/google/callback/', google_auth.google_callback, name='google_callback'),
]