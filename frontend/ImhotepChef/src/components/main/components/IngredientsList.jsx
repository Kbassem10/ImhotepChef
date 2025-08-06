export default function IngredientsList({ ingredients, getRecipe, removeIngredient, loading }) {
    const ingredientsListItems = ingredients.map(ingredient => (
        <li key={ingredient} className="ingredient-item group">
            <div className="chef-card rounded-xl p-4 shadow-md border border-white/30 backdrop-blur-xl transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-r from-white/90 to-white/70">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <div className="w-8 h-8 bg-chef-gradient rounded-lg shadow-sm flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                        </div>
                        <span className="ingredient-name text-gray-800 font-semibold text-sm sm:text-base truncate">
                            {ingredient}
                        </span>
                    </div>
                    
                    <button 
                        onClick={() => removeIngredient(ingredient)}
                        className="ingredient-remove ml-3 w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 rounded-lg transition-all duration-200 hover:scale-110 flex items-center justify-center group-hover:bg-red-50 flex-shrink-0"
                        aria-label={`Remove ${ingredient}`}
                        title={`Remove ${ingredient}`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </li>
    ));

    return (
        <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="chef-card rounded-2xl p-6 sm:p-8 shadow-lg border border-white/30 backdrop-blur-xl mb-8">
                <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-chef-gradient rounded-xl shadow-md flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0 0 2h1v11a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V9h1a1 1 0 0 0 0-2zM10 6a2 2 0 0 1 4 0v1h-4V6zm4 5v8a1 1 0 0 1-2 0v-8a1 1 0 0 1 2 0zm-4 0v8a1 1 0 0 1-2 0v-8a1 1 0 0 1 2 0z"/>
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold font-chef text-gray-800">
                            Ingredients on Hand
                        </h2>
                        <p className="text-gray-600 font-medium mt-1">
                            {ingredients.length} ingredient{ingredients.length !== 1 ? 's' : ''} ready for cooking
                        </p>
                    </div>
                </div>

                {/* Ingredients Count Badge */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="px-3 py-1 bg-primary-100 border border-primary-200 rounded-full">
                            <span className="text-primary-700 font-semibold text-sm">
                                {ingredients.length}/∞ ingredients
                            </span>
                        </div>
                        {ingredients.length >= 3 && (
                            <div className="px-3 py-1 bg-green-100 border border-green-200 rounded-full">
                                <span className="text-green-700 font-semibold text-sm flex items-center">
                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Recipe Ready
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Ingredients List */}
            {ingredients.length > 0 ? (
                <div className="mb-8">
                    <ul className="ingredients-list grid gap-3 sm:gap-4" aria-live="polite">
                        {ingredientsListItems}
                    </ul>
                </div>
            ) : (
                <div className="chef-card rounded-2xl p-8 sm:p-12 shadow-lg border border-white/30 backdrop-blur-xl text-center mb-8">
                    <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold font-chef text-gray-800 mb-2">
                        No Ingredients Yet
                    </h3>
                    <p className="text-gray-600 font-medium">
                        Start adding ingredients to create amazing recipes with AI assistance!
                    </p>
                </div>
            )}
            
            {/* Recipe Generation Section */}
            {ingredients.length >= 3 && (
                <div className="chef-card rounded-2xl p-6 sm:p-8 shadow-lg border border-white/30 backdrop-blur-xl bg-gradient-to-r from-green-50/80 to-emerald-50/80 mb-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-6">
                        <div className="flex-1 text-center sm:text-left">
                            <div className="flex items-center justify-center sm:justify-start space-x-2 mb-3">
                                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold font-chef text-gray-800">
                                    Ready for a Recipe?
                                </h3>
                            </div>
                            <p className="text-gray-700 font-medium">
                                Perfect! You have enough ingredients to generate a delicious AI-powered recipe.
                            </p>
                        </div>
                        
                        <button 
                            onClick={getRecipe} 
                            disabled={loading}
                            className="chef-button bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 sm:px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2 whitespace-nowrap"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Generating Recipe...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.5 2C13.9 2 15 3.1 15 4.5C15 5.9 13.9 7 12.5 7S10 5.9 10 4.5C10 3.1 11.1 2 12.5 2M20 7C20 8.11 19.11 9 18 9S16 8.11 16 7 16.89 5 18 5 20 5.89 20 7M8 7C8 8.11 7.11 9 6 9S4 8.11 4 7 4.89 5 6 5 8 5.89 8 7M18 11C18.7 11 19.37 11.13 20 11.35V20C20 21.11 19.11 22 18 22H6C4.89 22 4 21.11 4 20V11.35C4.63 11.13 5.3 11 6 11H18z"/>
                                    </svg>
                                    <span>Get a Recipe</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}
            
            {/* Hint Section for Insufficient Ingredients */}
            {ingredients.length > 0 && ingredients.length < 3 && (
                <div className="chef-card rounded-2xl p-6 sm:p-8 shadow-lg border border-white/30 backdrop-blur-xl bg-gradient-to-r from-amber-50/80 to-yellow-50/80">
                    <div className="flex items-center justify-center space-x-4">
                        <div className="w-12 h-12 bg-amber-500 rounded-xl shadow-md flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg sm:text-xl font-bold font-chef text-gray-800 mb-2">
                                Almost There!
                            </h3>
                            <p className="text-gray-700 font-medium">
                                Add <span className="font-bold text-amber-600">{3 - ingredients.length} more ingredient{3 - ingredients.length !== 1 ? 's' : ''}</span> to generate a recipe!
                            </p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-700">Progress to Recipe</span>
                            <span className="text-sm font-bold text-amber-600">
                                {Math.round((ingredients.length / 3) * 100)}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                            <div 
                                className="h-3 rounded-full transition-all duration-700 ease-out bg-gradient-to-r from-amber-400 to-yellow-500 shadow-sm"
                                style={{ width: `${(ingredients.length / 3) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}