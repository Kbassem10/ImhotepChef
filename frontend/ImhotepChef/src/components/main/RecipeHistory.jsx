import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import ImhotepRecipe from './components/ImhotepRecipe';

const RecipeHistory = () => {
    const { user } = useAuth();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchRecipeHistory();
    }, []);

    const fetchRecipeHistory = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/user-data/recipe/history/');
            
            if (response.data.success) {
                // Transform the data to match ImhotepRecipe component expectations
                const transformedRecipes = response.data.user_recipe_history.map(recipe => ({
                    id: recipe.id,
                    name: recipe.recipe_name,
                    description: recipe.recipe_description,
                    difficulty: recipe.recipe_difficulty,
                    prep_time: recipe.prep_time,
                    cook_time: recipe.cook_time,
                    total_time: recipe.total_time,
                    servings: recipe.servings,
                    main_ingredients: recipe.main_ingredients,
                    additional_ingredients: recipe.additional_ingredients,
                    instructions: recipe.instructions,
                    tips: recipe.tips,
                    nutrition: recipe.nutrition,
                    created_at: recipe.created_at
                }));
                setRecipes(transformedRecipes);
            } else {
                setError('Failed to fetch recipe history');
            }
        } catch (error) {
            console.error('Error fetching recipe history:', error);
            setError(
                error.response?.data?.error || 
                'Failed to fetch recipe history. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="dashboard-page-container">
                <div className="dashboard-card">
                    <h1 className="dashboard-title">Your Recipe History</h1>
                    <p className="dashboard-subtitle">
                        Hello, <strong>{user?.username}</strong>! Here are all the recipes you've generated.
                    </p>
                    
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
                        <a href="/dashboard" className="dashboard-button" style={{ textDecoration: 'none', padding: '0.5rem 1rem' }}>
                            ← Back to Dashboard
                        </a>
                        <a href="/profile" className="dashboard-button" style={{ textDecoration: 'none', padding: '0.5rem 1rem' }}>
                            Profile Settings
                        </a>
                    </div>

                    <ImhotepRecipe recipes={[]} loading={true} error="" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="dashboard-page-container">
                <div className="dashboard-card">
                    <h1 className="dashboard-title">Recipe History</h1>
                    <div className="recipe-error">
                        {error}
                        <button onClick={fetchRecipeHistory} className="retry-button">
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (recipes.length === 0) {
        return (
            <div className="dashboard-page-container">
                <div className="dashboard-card">
                    <h1 className="dashboard-title">Your Recipe History</h1>
                    <p className="dashboard-subtitle">
                        Hello, <strong>{user?.username}</strong>! Here are all the recipes you've generated.
                    </p>
                    
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
                        <a href="/dashboard" className="dashboard-button" style={{ textDecoration: 'none', padding: '0.5rem 1rem' }}>
                            ← Back to Dashboard
                        </a>
                        <a href="/profile" className="dashboard-button" style={{ textDecoration: 'none', padding: '0.5rem 1rem' }}>
                            Profile Settings
                        </a>
                    </div>

                    <div className="suggested-recipe-container">
                        <div className="suggested-recipe">
                            <h3>No recipes yet!</h3>
                            <p>Start by generating your first recipe from ingredients you have.</p>
                            <a href="/dashboard" className="dashboard-button">
                                Generate Recipe
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-page-container">
            <div className="dashboard-card">
                <h1 className="dashboard-title">Your Recipe History</h1>
                <p className="dashboard-subtitle">
                    Hello, <strong>{user?.username}</strong>! Here are all the recipes you've generated.
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
                    <a href="/dashboard" className="dashboard-button" style={{ textDecoration: 'none', padding: '0.5rem 1rem' }}>
                        ← Back to Dashboard
                    </a>
                    <a href="/profile" className="dashboard-button" style={{ textDecoration: 'none', padding: '0.5rem 1rem' }}>
                        Profile Settings
                    </a>
                </div>

                <div style={{ marginBottom: '1rem', color: 'var(--text-color)', textAlign: 'center' }}>
                    <strong>{recipes.length}</strong> recipe{recipes.length !== 1 ? 's' : ''} found
                </div>

                {/* Enhanced recipes with creation dates */}
                <div>
                    {recipes.map((recipe) => (
                        <div key={recipe.id} style={{ marginBottom: '2rem' }}>
                            <div style={{ 
                                textAlign: 'center', 
                                marginBottom: '0.5rem', 
                                fontSize: '0.9rem', 
                                color: 'var(--text-secondary)',
                                fontStyle: 'italic'
                            }}>
                                Created on {formatDate(recipe.created_at)}
                            </div>
                            <ImhotepRecipe 
                                recipes={[recipe]} 
                                loading={false} 
                                error="" 
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecipeHistory;
