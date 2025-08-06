import json
from .config import Gemini_Config

def get_recipe_from_gemini(array_of_ingredients):
    """
    Get recipe suggestions from Gemini AI based on provided ingredients
    
    Args:
        array_of_ingredients (list): List of ingredients to create recipes from
        
    Returns:
        tuple: (recipe_data, error_message)
    """
    
    # Create the prompt for Gemini
    ingredients_list = ", ".join(array_of_ingredients)
    
    prompt = f'''
You are a professional chef AI assistant. Create 1 detailed recipe suggestion using the following ingredients: {ingredients_list}

Requirements:
1. Use as many of the provided ingredients as possible (at least 3)
2. Minimize additional ingredients - only add essential ones that are commonly found in most kitchens
3. Focus on simple, practical cooking techniques
4. Provide detailed cooking instructions
5. Include preparation and cooking times
6. Specify serving size
7. Add difficulty level (Easy, Medium, Hard)

Please respond with a valid JSON format following this exact structure:

{{
    "recipes": [
        {{
            "id": 1,
            "name": "Recipe Name",
            "description": "Brief description of the dish",
            "difficulty": "Easy/Medium/Hard",
            "prep_time": "15 minutes",
            "cook_time": "30 minutes",
            "total_time": "45 minutes",
            "servings": 4,
            "main_ingredients": ["ingredient1", "ingredient2", "ingredient3"],
            "additional_ingredients": [
                {{
                    "name": "ingredient name",
                    "amount": "1 cup",
                    "optional": false
                }}
            ],
            "instructions": [
                "Step 1: Detailed instruction",
                "Step 2: Detailed instruction",
                "Step 3: Detailed instruction"
            ],
            "tips": [
                "Helpful cooking tip 1",
                "Helpful cooking tip 2"
            ],
            "nutrition": {{
                "calories": 350,
                "protein": "25g",
                "carbs": "30g",
                "fat": "15g"
            }}
        }}
    ],
    "success": true,
    "message": "Recipe generated successfully"
}}

IMPORTANT: Keep additional ingredients to a minimum (maximum 5 items). Only include basic pantry staples like salt, pepper, oil, garlic, onion if absolutely necessary. Make sure the JSON is properly formatted and valid.
'''

    error_message = None
    
    # Try each API key in sequence
    for key_index in range(len(Gemini_Config.API_KEYS)):
        try:
            print(f"Trying API key {key_index+1} of {len(Gemini_Config.API_KEYS)}...")
            
            # Set the current API key index in Gemini_Config
            Gemini_Config._current_key_index = key_index
            
            # Get a new model instance with the current key
            model = Gemini_Config.get_model()
            chat_session = model.start_chat(history=[])
            
            # Send the request
            response = chat_session.send_message(prompt)
            response_text = response.text.replace('```json', '').replace('```', '').strip()
            
            # Parse the JSON response
            recipe_data = json.loads(response_text)
            
            # Validate the response structure
            if "recipes" in recipe_data and len(recipe_data["recipes"]) > 0:
                print(f"Success with API key {key_index+1}")
                return recipe_data, None
            else:
                raise ValueError("Invalid response structure from Gemini API")
            
        except json.JSONDecodeError as e:
            print(f"JSON parsing error with API key {key_index+1}: {str(e)}")
            error_message = f"Failed to parse AI response: {str(e)}"
            continue
            
        except Exception as e:
            print(f"Error with API key {key_index+1}: {str(e)}")
            error_message = str(e)
            continue
    
    # If we get here, all keys failed
    if not error_message:
        error_message = "All API keys failed. Please check the Gemini API configuration."
    
    print(f"All API keys failed: {error_message}")
    
    # Return fallback data
    fallback_data = {
        "recipes": [
            {
                "id": 1,
                "name": "Simple Mixed Ingredients Dish",
                "description": f"A basic recipe using {', '.join(array_of_ingredients[:3])}",
                "difficulty": "Easy",
                "prep_time": "10 minutes",
                "cook_time": "20 minutes",
                "total_time": "30 minutes",
                "servings": 2,
                "main_ingredients": array_of_ingredients[:3],
                "additional_ingredients": [
                    {"name": "salt", "amount": "to taste", "optional": False},
                    {"name": "pepper", "amount": "to taste", "optional": False},
                    {"name": "olive oil", "amount": "2 tbsp", "optional": False}
                ],
                "instructions": [
                    "Prepare all ingredients by washing and chopping as needed",
                    "Heat olive oil in a pan over medium heat",
                    "Add main ingredients and cook until tender",
                    "Season with salt and pepper to taste",
                    "Serve hot and enjoy"
                ],
                "tips": [
                    "Adjust cooking time based on ingredient types",
                    "Taste and adjust seasoning as needed"
                ],
                "nutrition": {
                    "calories": 200,
                    "protein": "10g",
                    "carbs": "20g",
                    "fat": "8g"
                }
            }
        ],
        "success": False,
        "message": "AI service unavailable. Showing fallback recipe."
    }
    
    return fallback_data, error_message
