import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import IngredientsList from './components/IngredientsList';
import axios from 'axios';
import ImhotepRecipe from './components/ImhotepRecipe';

const Dashboard = () => {
    const { user } = useAuth();
    const [ingredients, setIngredients] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showRecipes, setShowRecipes] = useState(false);

    const addIngredient = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newIngredient = formData.get("ingredient");
        
        if (newIngredient && newIngredient.trim()) {
            const trimmedIngredient = newIngredient.trim();
            // Check if ingredient already exists (case-insensitive)
            const exists = ingredients.some(
                ingredient => ingredient.toLowerCase() === trimmedIngredient.toLowerCase()
            );
            
            if (!exists) {
                setIngredients(prevIngredients => [...prevIngredients, trimmedIngredient]);
                e.target.reset(); // Clear the form
            }
        }
    };

    const removeIngredient = (ingredientToRemove) => {
        setIngredients(prevIngredients => 
            prevIngredients.filter(ingredient => ingredient !== ingredientToRemove)
        );
        
        // Hide recipes if we have less than 3 ingredients
        if (ingredients.length <= 3) {
            setShowRecipes(false);
            setRecipes([]);
        }
    };

    const getRecipe = async () => {
        if (ingredients.length < 3) {
            setError('You need at least 3 ingredients to generate a recipe.');
            return;
        }

        setLoading(true);
        setError('');
        setShowRecipes(true);

        try {
            const response = await axios.post('/api/recipes/generate/', {
                ingredients: ingredients
            });

            if (response.data.success && response.data.recipes) {
                setRecipes(response.data.recipes);
                if (response.data.ai_error) {
                    console.warn('AI service had issues, using fallback:', response.data.ai_error);
                }
            } else {
                setError('Failed to generate recipes. Please try again.');
            }
        } catch (error) {
            console.error('Recipe generation failed:', error);
            setError(
                error.response?.data?.error || 
                'Failed to generate recipes. Please check your internet connection and try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-page-container">
            <div className="dashboard-card">
                <h1 className="dashboard-title">Welcome to Imhotep Chef</h1>
                <p className="dashboard-subtitle">
                    Hello, <strong>{user?.username}</strong>! Ready to cook something amazing?
                </p>
                
                <form onSubmit={addIngredient} className="add-ingredient-form">
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <input
                            type="text"
                            placeholder="e.g. oregano"
                            aria-label="Add ingredient"
                            name="ingredient"
                            className="dashboard-input"
                            style={{ flex: 1, margin: 0 }}
                            required
                        />
                        <button type="submit" className="dashboard-button">Add ingredient</button>
                    </div>
                </form>

                {ingredients.length > 0 && (
                    <IngredientsList
                        ingredients={ingredients}
                        getRecipe={getRecipe}
                        removeIngredient={removeIngredient}
                        loading={loading}
                    />
                )}

                {error && (
                    <div className="recipe-error">
                        {error}
                    </div>
                )}

                {showRecipes && (
                    <ImhotepRecipe 
                        recipes={recipes} 
                        loading={loading} 
                        error={error}
                    />
                )}
            </div>
        </div>
    );
};

export default Dashboard;