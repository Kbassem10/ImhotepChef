from ..models import User, RecipeHistory
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from ..utils.ai_get_recipe import get_recipe_from_gemini

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def get_ingredients(request):
    try:
        # Get ingredients from request
        array_of_ingredients = request.data.get('ingredients', [])

        if not array_of_ingredients:
            return Response(
                {'error': 'Ingredients array is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not isinstance(array_of_ingredients, list):
            return Response(
                {'error': 'Ingredients must be provided as an array'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if len(array_of_ingredients) < 3:
            return Response(
                {'error': 'The array of ingredients must contain at least 3 items'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Validate that ingredients are strings and not empty
        valid_ingredients = []
        for ingredient in array_of_ingredients:
            if isinstance(ingredient, str) and ingredient.strip():
                valid_ingredients.append(ingredient.strip())
        
        if len(valid_ingredients) < 3:
            return Response(
                {'error': 'At least 3 valid ingredient names are required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Get recipes from Gemini AI
        recipe_data, error_message = get_recipe_from_gemini(valid_ingredients)
        
        # Save recipes to database
        saved_recipes = []
        if recipe_data.get('recipes'):
            for recipe in recipe_data['recipes']:
                try:
                    recipe_history = RecipeHistory.objects.create(
                        user=request.user,
                        recipe_name=recipe.get('name', 'Untitled Recipe'),
                        recipe_description=recipe.get('description', ''),
                        recipe_difficulty=recipe.get('difficulty', 'Easy'),
                        prep_time=recipe.get('prep_time', ''),
                        cook_time=recipe.get('cook_time', ''),
                        total_time=recipe.get('total_time', ''),
                        servings=recipe.get('servings', 1),
                        main_ingredients=recipe.get('main_ingredients', []),
                        additional_ingredients=recipe.get('additional_ingredients', []),
                        instructions=recipe.get('instructions', []),
                        tips=recipe.get('tips', []),
                        nutrition=recipe.get('nutrition', {})
                    )
                    saved_recipes.append(recipe_history.id)
                except Exception as save_error:
                    print(f"Error saving recipe: {save_error}")
        
        # Prepare response
        response_data = {
            'success': recipe_data.get('success', True),
            'recipes': recipe_data.get('recipes', []),
            'message': recipe_data.get('message', 'Recipes generated successfully'),
            'ingredients_used': valid_ingredients,
            'saved_recipe_ids': saved_recipes
        }
        
        # Add error message if AI failed but fallback was used
        if error_message:
            response_data['ai_error'] = error_message
            response_data['fallback_used'] = True
        
        return Response(response_data, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response(
            {
                'error': 'An error occurred while generating recipes',
                'details': str(e),
                'success': False
            }, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
