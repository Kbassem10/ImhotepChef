from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .auth import register

router = DefaultRouter()
# Add your viewsets here when you create them

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('rest_framework.urls')),
    path('auth/login/', views.login_view, name='login'),
    path('auth/register/', register.register_view, name='register'),
    path('auth/verify-email/', register.verify_email, name='verify_email'),
    path('auth/user/', views.user_view, name='user'),
]