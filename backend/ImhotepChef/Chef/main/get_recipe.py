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
                valid_ingredients.append(ingredient.strip().lower())
        
        if len(valid_ingredients) < 3:
            return Response(
                {'error': 'At least 3 valid ingredient names are required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Sort ingredients for consistent comparison
        sorted_ingredients = sorted(valid_ingredients)
        
        # Check if we have existing recipes with the same ingredients (from any user)
        existing_recipes = RecipeHistory.objects.filter(
            main_ingredients=sorted_ingredients
        ).order_by('-created_at')
        
        if existing_recipes.exists():
            # Use existing recipe data - convert from database format
            source_recipe = existing_recipes.first()
            recipe_data = {
                'success': True,
                'recipes': [{
                    'name': source_recipe.recipe_name,
                    'description': source_recipe.recipe_description,
                    'difficulty': source_recipe.recipe_difficulty,
                    'prep_time': source_recipe.prep_time,
                    'cook_time': source_recipe.cook_time,
                    'total_time': source_recipe.total_time,
                    'servings': source_recipe.servings,
                    'main_ingredients': source_recipe.main_ingredients,
                    'additional_ingredients': source_recipe.additional_ingredients,
                    'instructions': source_recipe.instructions,
                    'tips': source_recipe.tips,
                    'nutrition': source_recipe.nutrition
                }],
                'message': 'Recipe retrieved from our database'
            }
            error_message = None
            print(f"Using cached recipe: {source_recipe.recipe_name}")
        else:
            # Get new recipes from Gemini AI
            print("Generating new recipes from AI...")
            recipe_data, error_message = get_recipe_from_gemini(valid_ingredients)
            
            # Update main_ingredients in recipe data to use sorted ingredients
            if recipe_data and recipe_data.get('recipes'):
                for recipe in recipe_data['recipes']:
                    recipe['main_ingredients'] = sorted_ingredients
        
        # Handle saving recipes to database for this user
        saved_recipes = []
        if recipe_data and recipe_data.get('recipes'):
            for recipe in recipe_data['recipes']:
                try:
                    recipe_name = recipe.get('name', 'Untitled Recipe')
                    
                    # Check if this user already has a recipe with this exact name
                    existing_user_recipe = RecipeHistory.objects.filter(
                        user=request.user,
                        recipe_name=recipe_name
                    ).first()
                    
                    if existing_user_recipe:
                        # User already has a recipe with this name, don't save again
                        saved_recipes.append(existing_user_recipe.id)
                        print(f"User already has recipe with name: {recipe_name}")
                    else:
                        # Create new recipe entry for this user
                        recipe_history = RecipeHistory.objects.create(
                            user=request.user,
                            recipe_name=recipe_name,
                            recipe_description=recipe.get('description', ''),
                            recipe_difficulty=recipe.get('difficulty', 'Easy'),
                            prep_time=recipe.get('prep_time', ''),
                            cook_time=recipe.get('cook_time', ''),
                            total_time=recipe.get('total_time', ''),
                            servings=recipe.get('servings', 1),
                            main_ingredients=recipe.get('main_ingredients', sorted_ingredients),
                            additional_ingredients=recipe.get('additional_ingredients', []),
                            instructions=recipe.get('instructions', []),
                            tips=recipe.get('tips', []),
                            nutrition=recipe.get('nutrition', {})
                        )
                        saved_recipes.append(recipe_history.id)
                        print(f"Saved new recipe for user: {recipe_name}")
                        
                except Exception as save_error:
                    print(f"Error saving recipe: {save_error}")
                    continue
        
        # Prepare response
        response_data = {
            'success': recipe_data.get('success', True) if recipe_data else False,
            'recipes': recipe_data.get('recipes', []) if recipe_data else [],
            'message': recipe_data.get('message', 'Recipes generated successfully') if recipe_data else 'Failed to generate recipes',
            'ingredients_used': sorted_ingredients,
            'saved_recipe_ids': saved_recipes,
            'from_cache': existing_recipes.exists() if 'existing_recipes' in locals() else False
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
