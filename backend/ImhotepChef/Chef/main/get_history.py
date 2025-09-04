from ..models import User, RecipeHistory
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_history(request):
    try:
        # Get pagination parameters from query string
        page = request.GET.get('page', 1)
        page_size = 5  # Fixed to 5 items per page
        
        # Convert page to integer and validate
        try:
            page = int(page)
        except (ValueError, TypeError):
            page = 1

        # Get all recipes for the user
        recipe_queryset = RecipeHistory.objects.filter(user=request.user).order_by('-created_at')
        
        # Create paginator
        paginator = Paginator(recipe_queryset, page_size)
        total_pages = paginator.num_pages
        total_count = paginator.count
        
        try:
            recipe_page = paginator.page(page)
        except PageNotAnInteger:
            recipe_page = paginator.page(1)
            page = 1
        except EmptyPage:
            recipe_page = paginator.page(paginator.num_pages)
            page = paginator.num_pages

        # Serialize the recipe history data
        serialized_recipes = []
        for recipe in recipe_page:
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

        # Prepare response with pagination info
        response_data = {
            'success': True,
            'user_recipe_history': serialized_recipes,
            'pagination': {
                'current_page': page,
                'total_pages': total_pages,
                'total_count': total_count,
                'page_size': page_size,
                'has_next': recipe_page.has_next(),
                'has_previous': recipe_page.has_previous(),
                'next_page': recipe_page.next_page_number() if recipe_page.has_next() else None,
                'previous_page': recipe_page.previous_page_number() if recipe_page.has_previous() else None,
            }
        }
        
        return Response(response_data, status=status.HTTP_200_OK)
        
    except Exception:
        return Response(
            {
                'error': 'An error occurred while fetching recipe history',
                'success': False
            }, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
