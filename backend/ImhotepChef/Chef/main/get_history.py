from ..models import User, RecipeHistory
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_history(request):
    try:
        recipe_history = RecipeHistory.objects.filter(user=request.user).order_by('-created_at')

        # Serialize the recipe history data
        serialized_recipes = []
        for recipe in recipe_history:
            serialized_recipes.append({
                'id': recipe.id,
                'recipe_name': recipe.recipe_name,
                'recipe_description': recipe.recipe_description,
                'recipe_difficulty': recipe.recipe_difficulty,
                'prep_time': recipe.prep_time,
                'cook_time': recipe.cook_time,
                'total_time': recipe.total_time,
                'servings': recipe.servings,
                'main_ingredients': recipe.main_ingredients,
                'additional_ingredients': recipe.additional_ingredients,
                'instructions': recipe.instructions,
                'tips': recipe.tips,
                'nutrition': recipe.nutrition,
                'created_at': recipe.created_at.isoformat(),
            })

        # Prepare response
        response_data = {
            'success': True,
            'user_recipe_history': serialized_recipes,
            'number_of_recipes': len(serialized_recipes),
        }
        
        return Response(response_data, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response(
            {
                'error': 'An error occurred while fetching recipe history',
                'details': str(e),
                'success': False
            }, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
