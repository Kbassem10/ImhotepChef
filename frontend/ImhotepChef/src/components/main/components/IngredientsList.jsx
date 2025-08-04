export default function IngredientsList({ ingredients, getRecipe, removeIngredient, loading }) {
    const ingredientsListItems = ingredients.map(ingredient => (
        <li key={ingredient} className="ingredient-item">
            <span className="ingredient-name">{ingredient}</span>
            <button 
                onClick={() => removeIngredient(ingredient)}
                className="ingredient-remove"
                aria-label={`Remove ${ingredient}`}
                title={`Remove ${ingredient}`}
            >
                ×
            </button>
        </li>
    ));

    return (
        <section>
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">
                {ingredientsListItems}
            </ul>
            
            {ingredients.length >= 3 && (
                <div className="get-recipe-container">
                    <div>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button 
                        onClick={getRecipe} 
                        disabled={loading}
                        className="count-button"
                    >
                        {loading ? 'Generating Recipe...' : 'Get a recipe'}
                    </button>
                </div>
            )}
            
            {ingredients.length > 0 && ingredients.length < 3 && (
                <div className="ingredient-hint">
                    <p>Add {3 - ingredients.length} more ingredient{3 - ingredients.length !== 1 ? 's' : ''} to generate a recipe!</p>
                </div>
            )}
        </section>
    );
}