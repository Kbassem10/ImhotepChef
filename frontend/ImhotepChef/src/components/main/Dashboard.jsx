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
        <div className="dashboard-container">
            <div className="card" style={{ maxWidth: '800px', width: '100%' }}>
                <h1 className="main-title">Welcome to Imhotep Chef</h1>
                <p className="card-text">
                    Hello, <strong>{user?.username}</strong>! Ready to cook something amazing?
                </p>
                
                <form onSubmit={addIngredient} className="add-ingredient-form" style={{ marginTop: '2rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <input
                            type="text"
                            placeholder="e.g. oregano"
                            aria-label="Add ingredient"
                            name="ingredient"
                            className="login-input"
                            style={{ flex: 1, margin: 0 }}
                            required
                        />
                        <button type="submit" className="count-button">Add ingredient</button>
                    </div>
                </form>

                {ingredients.length > 0 && (
                    <IngredientsList
                        ingredients={ingredients}
                        getRecipe={getRecipe}
                    />
                )}

                {recipeShown && <ClaudeRecipe />}
                
                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                    <Link 
                        to="/profile"
                        className="count-button"
                        style={{ textDecoration: 'none', textAlign: 'center' }}
                    >
                        Manage Profile
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;