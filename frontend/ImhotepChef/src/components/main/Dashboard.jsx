import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import IngredientsList from './IngredientsList'; // Fixed: Use default import instead of named import
import axios from 'axios';

const ImhotepRecipe = ({ recipes, loading, error }) => {
    if (loading) {
        return (
            <section className="suggested-recipe-container">
                <h2>Generating Your Recipe...</h2>
                <div className="recipe-loading">
                    <div className="spinner-ring"></div>
                    <p>Our AI chef is working on your perfect recipe!</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="suggested-recipe-container">
                <h2>Oops! Something went wrong</h2>
                <article className="suggested-recipe error">
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()} className="retry-button">
                        Try Again
                    </button>
                </article>
            </section>
        );
    }

    if (!recipes || recipes.length === 0) {
        return (
            <section className="suggested-recipe-container">
                <h2>Imhotep Chef Recommends:</h2>
                <article className="suggested-recipe">
                    <h3>Recipe coming soon...</h3>
                    <p>AI-generated recipe will appear here!</p>
                </article>
            </section>
        );
    }

    return (
        <section className="suggested-recipe-container">
            <h2>Imhotep Chef Recommends:</h2>
            {recipes.map((recipe, index) => (
                <article key={recipe.id || index} className="suggested-recipe">
                    <div className="recipe-header">
                        <h3>{recipe.name}</h3>
                        <div className="recipe-meta">
                            <span className="difficulty">{recipe.difficulty}</span>
                            <span className="time">{recipe.total_time}</span>
                            <span className="servings">{recipe.servings} servings</span>
                        </div>
                    </div>
                    
                    <p className="recipe-description">{recipe.description}</p>
                    
                    <div className="recipe-ingredients">
                        <h4>Main Ingredients:</h4>
                        <ul>
                            {recipe.main_ingredients?.map((ingredient, idx) => (
                                <li key={idx}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>

                    {recipe.additional_ingredients && recipe.additional_ingredients.length > 0 && (
                        <div className="recipe-ingredients">
                            <h4>Additional Ingredients:</h4>
                            <ul>
                                {recipe.additional_ingredients.map((ingredient, idx) => (
                                    <li key={idx}>
                                        {ingredient.amount} {ingredient.name}
                                        {ingredient.optional && <span className="optional"> (optional)</span>}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="recipe-instructions">
                        <h4>Instructions:</h4>
                        <ol>
                            {recipe.instructions?.map((step, idx) => (
                                <li key={idx}>{step}</li>
                            ))}
                        </ol>
                    </div>

                    {recipe.tips && recipe.tips.length > 0 && (
                        <div className="recipe-tips">
                            <h4>Chef's Tips:</h4>
                            <ul>
                                {recipe.tips.map((tip, idx) => (
                                    <li key={idx}>{tip}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {recipe.nutrition && (
                        <div className="recipe-nutrition">
                            <h4>Nutrition (per serving):</h4>
                            <div className="nutrition-grid">
                                <span>Calories: {recipe.nutrition.calories}</span>
                                <span>Protein: {recipe.nutrition.protein}</span>
                                <span>Carbs: {recipe.nutrition.carbs}</span>
                                <span>Fat: {recipe.nutrition.fat}</span>
                            </div>
                        </div>
                    )}
                </article>
            ))}
        </section>
    );
};

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