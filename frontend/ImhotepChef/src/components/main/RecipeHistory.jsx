import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import ImhotepRecipe from './components/ImhotepRecipe';

const RecipeHistory = () => {
    const { user } = useAuth();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [expandedRecipe, setExpandedRecipe] = useState(null);
    const [pagination, setPagination] = useState({
        current_page: 1,
        total_pages: 1,
        total_count: 0,
        page_size: 5,
        has_next: false,
        has_previous: false
    });

    useEffect(() => {
        fetchRecipeHistory(1);
    }, []);

    const fetchRecipeHistory = async (page = 1) => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/user-data/recipe/history/?page=${page}`);
            
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
                setPagination(response.data.pagination);
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

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.total_pages) {
            fetchRecipeHistory(newPage);
            setExpandedRecipe(null); // Close any expanded recipe when changing pages
        }
    };

    const toggleRecipeDetails = (recipeId) => {
        setExpandedRecipe(expandedRecipe === recipeId ? null : recipeId);
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

    const PaginationControls = () => {
        if (pagination.total_pages <= 1) return null;

        const pageNumbers = [];
        const maxVisiblePages = 5;
        const startPage = Math.max(1, pagination.current_page - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(pagination.total_pages, startPage + maxVisiblePages - 1);

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                gap: '0.5rem', 
                margin: '2rem 0',
                flexWrap: 'wrap'
            }}>
                {/* Previous button */}
                <button 
                    onClick={() => handlePageChange(pagination.current_page - 1)}
                    disabled={!pagination.has_previous}
                    className="dashboard-button"
                    style={{ 
                        padding: '0.5rem 1rem',
                        opacity: pagination.has_previous ? 1 : 0.5,
                        cursor: pagination.has_previous ? 'pointer' : 'not-allowed'
                    }}
                >
                    ← Previous
                </button>

                {/* Page numbers */}
                {pageNumbers.map(pageNum => (
                    <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`dashboard-button ${pageNum === pagination.current_page ? 'active' : ''}`}
                        style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: pageNum === pagination.current_page ? 'var(--button-bg)' : 'transparent',
                            color: pageNum === pagination.current_page ? 'white' : 'var(--button-bg)',
                            border: '1px solid var(--button-bg)'
                        }}
                    >
                        {pageNum}
                    </button>
                ))}

                {/* Next button */}
                <button 
                    onClick={() => handlePageChange(pagination.current_page + 1)}
                    disabled={!pagination.has_next}
                    className="dashboard-button"
                    style={{ 
                        padding: '0.5rem 1rem',
                        opacity: pagination.has_next ? 1 : 0.5,
                        cursor: pagination.has_next ? 'pointer' : 'not-allowed'
                    }}
                >
                    Next →
                </button>
            </div>
        );
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
                        <button onClick={() => fetchRecipeHistory(1)} className="retry-button">
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (pagination.total_count === 0) {
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
                    <strong>{pagination.total_count}</strong> recipe{pagination.total_count !== 1 ? 's' : ''} found
                    <span style={{ marginLeft: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        Page {pagination.current_page} of {pagination.total_pages}
                    </span>
                </div>

                {/* Pagination controls at top */}
                <PaginationControls />

                {/* Compact recipe cards */}
                <div className="suggested-recipe-container">
                    {recipes.map((recipe) => (
                        <div key={recipe.id} style={{ marginBottom: '1rem' }}>
                            {/* Compact recipe card */}
                            <article className="suggested-recipe" style={{ padding: '1rem' }}>
                                <div style={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'flex-start',
                                    marginBottom: '1rem'
                                }}>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>
                                            {recipe.name}
                                        </h3>
                                        <div className="recipe-meta">
                                            <span className="difficulty">{recipe.difficulty}</span>
                                            <span className="time">{recipe.total_time}</span>
                                            <span className="servings">{recipe.servings} servings</span>
                                        </div>
                                        <div style={{ 
                                            fontSize: '0.85rem', 
                                            color: 'var(--text-secondary)',
                                            fontStyle: 'italic',
                                            marginTop: '0.5rem'
                                        }}>
                                            Created on {formatDate(recipe.created_at)}
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => toggleRecipeDetails(recipe.id)}
                                        className="dashboard-button"
                                        style={{ 
                                            padding: '0.5rem 1rem',
                                            marginLeft: '1rem',
                                            flexShrink: 0
                                        }}
                                    >
                                        {expandedRecipe === recipe.id ? 'Show Less' : 'Show More'}
                                    </button>
                                </div>

                                {/* Expanded details */}
                                {expandedRecipe === recipe.id && (
                                    <div style={{ 
                                        borderTop: '1px solid var(--border-color, #e0e0e0)', 
                                        paddingTop: '1rem',
                                        marginTop: '1rem'
                                    }}>
                                        <ImhotepRecipe 
                                            recipes={[recipe]} 
                                            loading={false} 
                                            error="" 
                                        />
                                    </div>
                                )}
                            </article>
                        </div>
                    ))}
                </div>

                {/* Pagination controls at bottom */}
                <PaginationControls />
            </div>
        </div>
    );
};

export default RecipeHistory;
