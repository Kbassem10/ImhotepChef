from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import User

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_view(request):
    """
    Get current authenticated user details
    """
    user = request.user
    return Response({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email_verify': getattr(user, 'email_verify', False),
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_usage_count(request):
    """
    Get the user number of recipes generated this month
    """
    user = request.user
    user_count = user.get_recipes_last_month_count()
    return Response({
        'success': True,
        'user_id': user.id,
        'user_count': user_count,
        'message': f'User has generated {user_count} recipes this month'
    })