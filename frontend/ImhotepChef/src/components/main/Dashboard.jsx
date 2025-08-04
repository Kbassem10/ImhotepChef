import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const IngredientsList = ({ ingredients, getRecipe }) => {
    return (
        <section>
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list">
                {ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <div className="get-recipe-container">
                <div>
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button onClick={getRecipe} className="count-button">Get a recipe</button>
            </div>
        </section>
    );
};

const ClaudeRecipe = () => {
    return (
        <section className="suggested-recipe-container">
            <h2>Chef Claude Recommends:</h2>
            <article className="suggested-recipe">
                <h3>Recipe coming soon...</h3>
                <p>AI-generated recipe will appear here!</p>
            </article>
        </section>
    );
};

const Dashboard = () => {
    const { user } = useAuth();
    const [ingredients, setIngredients] = useState([]);
    const [recipeShown, setRecipeShown] = useState(false);

    function getRecipe() {
        setRecipeShown(prevShown => !prevShown);
    }

    function addIngredient(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newIngredient = formData.get("ingredient");
        
        if (newIngredient && newIngredient.trim()) {
            setIngredients(prevIngredients => [...prevIngredients, newIngredient.trim()]);
            e.target.reset(); // Clear the form
        }
    }

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
                    />
                )}

                {recipeShown && <ClaudeRecipe />}
            </div>
        </div>
    );
};

export default Dashboard;