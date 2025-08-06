const ImhotepRecipe = ({ recipes, loading, error }) => {
    if (loading) {
        return (
            <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="chef-card rounded-2xl p-8 sm:p-12 shadow-lg border border-white/30 backdrop-blur-xl text-center">
                    {/* Loading Icon */}
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-chef-gradient rounded-full mb-6 shadow-lg">
                        <svg className="animate-spin w-8 h-8 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                    
                    <h2 className="text-2xl sm:text-3xl font-bold font-chef text-gray-800 mb-4">
                        Generating Your Recipe...
                    </h2>
                    <p className="text-gray-600 font-medium mb-8 leading-relaxed">
                        Our AI chef is working on your perfect recipe! This won't take long.
                    </p>
                    
                    {/* Loading Progress */}
                    <div className="mt-6">
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                            <div className="bg-chef-gradient h-3 rounded-full animate-pulse" style={{width: '60%'}}></div>
                        </div>
                        <p className="text-gray-500 text-sm mt-3">Analyzing ingredients and creating magic...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="chef-card rounded-2xl p-8 sm:p-12 shadow-lg border border-red-200 bg-red-50/80 backdrop-blur-xl text-center">
                    {/* Error Icon */}
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500 rounded-full mb-6 shadow-lg">
                        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                    
                    <h2 className="text-2xl sm:text-3xl font-bold font-chef text-gray-800 mb-4">
                        Oops! Something went wrong
                    </h2>
                    <p className="text-red-700 font-medium mb-8 leading-relaxed">
                        {error}
                    </p>
                    
                    <button 
                        onClick={() => window.location.reload()} 
                        className="chef-button bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white flex items-center space-x-2 mx-auto"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span>Try Again</span>
                    </button>
                </div>
            </section>
        );
    }

    if (!recipes || recipes.length === 0) {
        return (
            <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="chef-card rounded-2xl p-8 sm:p-12 shadow-lg border border-white/30 backdrop-blur-xl text-center">
                    {/* Empty State Icon */}
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6 shadow-lg">
                        <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.5 2C13.9 2 15 3.1 15 4.5C15 5.9 13.9 7 12.5 7S10 5.9 10 4.5C10 3.1 11.1 2 12.5 2M20 7C20 8.11 19.11 9 18 9S16 8.11 16 7 16.89 5 18 5 20 5.89 20 7M8 7C8 8.11 7.11 9 6 9S4 8.11 4 7 4.89 5 6 5 8 5.89 8 7M18 11C18.7 11 19.37 11.13 20 11.35V20C20 21.11 19.11 22 18 22H6C4.89 22 4 21.11 4 20V11.35C4.63 11.13 5.3 11 6 11H18z"/>
                        </svg>
                    </div>
                    
                    <h2 className="text-2xl sm:text-3xl font-bold font-chef text-gray-800 mb-4">
                        Imhotep Chef Recommends:
                    </h2>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                        Recipe coming soon...
                    </h3>
                    <p className="text-gray-600 font-medium">
                        AI-generated recipe will appear here!
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Header Section */}
            <div className="chef-card rounded-2xl p-6 sm:p-8 shadow-lg border border-white/30 backdrop-blur-xl">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-chef-gradient rounded-xl shadow-md flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.5 2C13.9 2 15 3.1 15 4.5C15 5.9 13.9 7 12.5 7S10 5.9 10 4.5C10 3.1 11.1 2 12.5 2M20 7C20 8.11 19.11 9 18 9S16 8.11 16 7 16.89 5 18 5 20 5.89 20 7M8 7C8 8.11 7.11 9 6 9S4 8.11 4 7 4.89 5 6 5 8 5.89 8 7M18 11C18.7 11 19.37 11.13 20 11.35V20C20 21.11 19.11 22 18 22H6C4.89 22 4 21.11 4 20V11.35C4.63 11.13 5.3 11 6 11H18z"/>
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold font-chef text-gray-800">
                            Imhotep Chef Recommends:
                        </h2>
                        <p className="text-gray-600 font-medium mt-1">
                            {recipes.length} AI-crafted recipe{recipes.length !== 1 ? 's' : ''} just for you
                        </p>
                    </div>
                </div>
            </div>

            {/* Recipes List */}
            <div className="space-y-8">
                {recipes.map((recipe, index) => (
                    <article key={recipe.id || index} className="chef-card rounded-2xl p-6 sm:p-8 shadow-lg border border-white/30 backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                        {/* Recipe Header */}
                        <div className="mb-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-4">
                                <h3 className="text-2xl sm:text-3xl font-bold font-chef text-gray-800">
                                    {recipe.name}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-primary-100 border border-primary-200 rounded-full text-primary-700 font-semibold text-sm">
                                        {recipe.difficulty}
                                    </span>
                                    <span className="px-3 py-1 bg-secondary-100 border border-secondary-200 rounded-full text-secondary-700 font-semibold text-sm flex items-center">
                                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                        </svg>
                                        {recipe.total_time}
                                    </span>
                                    <span className="px-3 py-1 bg-green-100 border border-green-200 rounded-full text-green-700 font-semibold text-sm flex items-center">
                                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                        {recipe.servings} servings
                                    </span>
                                </div>
                            </div>
                            
                            <p className="text-gray-700 font-medium leading-relaxed text-base sm:text-lg">
                                {recipe.description}
                            </p>
                        </div>
                        
                        {/* Main Ingredients Section */}
                        <div className="mb-6">
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                    </svg>
                                </div>
                                <h4 className="text-lg sm:text-xl font-bold font-chef text-gray-800">Main Ingredients:</h4>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {recipe.main_ingredients?.map((ingredient, idx) => (
                                    <div key={idx} className="flex items-center space-x-2 p-2 bg-green-50 rounded-lg border border-green-200">
                                        <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-green-800 font-medium text-sm">{ingredient}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Additional Ingredients Section */}
                        {recipe.additional_ingredients && recipe.additional_ingredients.length > 0 && (
                            <div className="mb-6">
                                <div className="flex items-center space-x-2 mb-4">
                                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <h4 className="text-lg sm:text-xl font-bold font-chef text-gray-800">Additional Ingredients:</h4>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {recipe.additional_ingredients.map((ingredient, idx) => (
                                        <div key={idx} className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
                                            <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-blue-800 font-medium text-sm">
                                                {ingredient.amount} {ingredient.name}
                                                {ingredient.optional && <span className="text-blue-500 italic"> (optional)</span>}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Instructions Section */}
                        <div className="mb-6">
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h4 className="text-lg sm:text-xl font-bold font-chef text-gray-800">Instructions:</h4>
                            </div>
                            <div className="space-y-3">
                                {recipe.instructions?.map((step, idx) => (
                                    <div key={idx} className="flex space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                                        <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                                            {idx + 1}
                                        </div>
                                        <p className="text-orange-800 font-medium text-sm leading-relaxed">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Chef's Tips Section */}
                        {recipe.tips && recipe.tips.length > 0 && (
                            <div className="mb-6">
                                <div className="flex items-center space-x-2 mb-4">
                                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <h4 className="text-lg sm:text-xl font-bold font-chef text-gray-800">Chef's Tips:</h4>
                                </div>
                                <div className="space-y-2">
                                    {recipe.tips.map((tip, idx) => (
                                        <div key={idx} className="flex items-start space-x-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
                                            <svg className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                            </svg>
                                            <p className="text-purple-800 font-medium text-sm leading-relaxed">{tip}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Nutrition Section */}
                        {recipe.nutrition && (
                            <div className="bg-gradient-to-r from-gray-50 to-white p-4 sm:p-6 rounded-xl border border-gray-200">
                                <div className="flex items-center space-x-2 mb-4">
                                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <h4 className="text-lg sm:text-xl font-bold font-chef text-gray-800">Nutrition (per serving):</h4>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    <div className="text-center p-3 bg-white rounded-lg shadow-sm border border-gray-200">
                                        <div className="text-2xl font-bold text-gray-800">{recipe.nutrition.calories}</div>
                                        <div className="text-sm font-medium text-gray-600">Calories</div>
                                    </div>
                                    <div className="text-center p-3 bg-white rounded-lg shadow-sm border border-gray-200">
                                        <div className="text-2xl font-bold text-gray-800">{recipe.nutrition.protein}</div>
                                        <div className="text-sm font-medium text-gray-600">Protein</div>
                                    </div>
                                    <div className="text-center p-3 bg-white rounded-lg shadow-sm border border-gray-200">
                                        <div className="text-2xl font-bold text-gray-800">{recipe.nutrition.carbs}</div>
                                        <div className="text-sm font-medium text-gray-600">Carbs</div>
                                    </div>
                                    <div className="text-center p-3 bg-white rounded-lg shadow-sm border border-gray-200">
                                        <div className="text-2xl font-bold text-gray-800">{recipe.nutrition.fat}</div>
                                        <div className="text-sm font-medium text-gray-600">Fat</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </article>
                ))}
            </div>
        </section>
    );
};

export default ImhotepRecipe;