import { useState, useEffect } from 'react';
import axios from 'axios';

const RecipeCount = ({ className = '', showLabel = true, variant = 'default' }) => {
    const [recipeCount, setRecipeCount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const maxRecipes = 30; // Monthly limit

    useEffect(() => {
        fetchRecipeCount();
    }, []);

    const fetchRecipeCount = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/user-data/usage-count/');
            setRecipeCount(response.data.user_count);
            setError(null);
        } catch (error) {
            console.error('Error fetching recipe count:', error);
            setError('Failed to load recipe count');
            setRecipeCount(0);
        } finally {
            setLoading(false);
        }
    };

    const getProgressPercentage = () => {
        if (recipeCount === null) return 0;
        return Math.min((recipeCount / maxRecipes) * 100, 100);
    };

    const getStatusColor = () => {
        const percentage = getProgressPercentage();
        if (percentage >= 90) return '#dc2626'; // Red when near limit
        if (percentage >= 70) return '#f59e0b'; // Orange when getting high
        return '#10b981'; // Green when plenty left
    };

    if (loading) {
        return (
            <div className={`recipe-count recipe-count-${variant} ${className}`}>
                {showLabel && <span className="recipe-count-label">Recipes this month: </span>}
                <span className="recipe-count-value">...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`recipe-count recipe-count-${variant} recipe-count-error ${className}`}>
                {showLabel && <span className="recipe-count-label">Recipes this month: </span>}
                <span className="recipe-count-value">--</span>
            </div>
        );
    }

    return (
        <div className={`recipe-count recipe-count-${variant} ${className}`}>
            {showLabel && <span className="recipe-count-label">Recipes this month: </span>}
            <span className="recipe-count-value" style={{ color: getStatusColor() }}>
                {recipeCount} / {maxRecipes}
            </span>
            {variant === 'card' && (
                <div className="recipe-count-progress">
                    <div 
                        className="recipe-count-progress-bar" 
                        style={{ 
                            width: `${getProgressPercentage()}%`,
                            backgroundColor: getStatusColor()
                        }}
                    ></div>
                </div>
            )}
            {variant === 'navbar' && (
                <div className="recipe-count-mini-progress">
                    <div 
                        className="recipe-count-mini-bar" 
                        style={{ 
                            width: `${getProgressPercentage()}%`,
                            backgroundColor: getStatusColor()
                        }}
                    ></div>
                </div>
            )}
        </div>
    );
};

export default RecipeCount;
