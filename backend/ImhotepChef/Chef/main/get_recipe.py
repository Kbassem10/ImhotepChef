from ..models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt

@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
def get_ingredients(request):
        array_of_ingredients = request.data.get('ingredients')
        if len(array_of_ingredients) < 3:
            return Response(
                {'error': 'The array of ingredients must be at least 3 items'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response({})
        