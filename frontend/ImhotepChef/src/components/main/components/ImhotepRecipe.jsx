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

export default ImhotepRecipe;