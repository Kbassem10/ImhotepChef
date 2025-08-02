from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
# Add your viewsets here when you create them

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('rest_framework.urls')),
]