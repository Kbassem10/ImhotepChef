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
            <div className="flex justify-center items-center gap-2 my-8 flex-wrap">
                {/* Previous button */}
                <button 
                    onClick={() => handlePageChange(pagination.current_page - 1)}
                    disabled={!pagination.has_previous}
                    className={`chef-button ${!pagination.has_previous ? 'opacity-50 cursor-not-allowed' : 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700'} text-white flex items-center space-x-2`}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="hidden sm:inline">Previous</span>
                </button>

                {/* Page numbers */}
                {pageNumbers.map(pageNum => (
                    <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`chef-button ${pageNum === pagination.current_page 
                            ? 'bg-chef-gradient text-white' 
                            : 'bg-white/70 text-gray-700 hover:bg-white/90 border border-gray-300'
                        } w-10 h-10 flex items-center justify-center`}
                    >
                        {pageNum}
                    </button>
                ))}

                {/* Next button */}
                <button 
                    onClick={() => handlePageChange(pagination.current_page + 1)}
                    disabled={!pagination.has_next}
                    className={`chef-button ${!pagination.has_next ? 'opacity-50 cursor-not-allowed' : 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700'} text-white flex items-center space-x-2`}
                >
                    <span className="hidden sm:inline">Next</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 bg-chef-pattern">
                {/* Floating decorative elements */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
                    <div className="absolute top-40 right-20 w-24 h-24 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
                    <div className="absolute bottom-20 left-40 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{animationDelay: '4s'}}></div>
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                    {/* Header Section */}
                    <div className="chef-card rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl border border-white/30 backdrop-blur-xl text-center">
                        <div className="w-20 h-20 bg-chef-gradient rounded-full mb-6 shadow-lg flex items-center justify-center mx-auto">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-chef text-gray-800 mb-4">
                            Your Recipe History
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto">
                            Hello, <span className="font-bold text-primary-600">{user?.username}</span>! Here are all the amazing recipes you've created.
                        </p>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                        <a 
                            href="/dashboard" 
                            className="chef-button bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white flex items-center space-x-2 justify-center"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span>Back to Dashboard</span>
                        </a>
                        <a 
                            href="/profile" 
                            className="chef-button bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white flex items-center space-x-2 justify-center"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>Profile Settings</span>
                        </a>
                    </div>

                    <ImhotepRecipe recipes={[]} loading={true} error="" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 bg-chef-pattern">
                {/* Floating decorative elements */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-20 left-20 w-32 h-32 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
                    <div className="absolute top-40 right-20 w-24 h-24 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
                    <div className="absolute bottom-20 left-40 w-40 h-40 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{animationDelay: '4s'}}></div>
                </div>

                <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="chef-card rounded-2xl p-8 sm:p-12 shadow-lg border border-red-200 bg-red-50/80 backdrop-blur-xl text-center">
                        {/* Error Icon */}
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500 rounded-full mb-6 shadow-lg">
                            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        
                        <h1 className="text-2xl sm:text-3xl font-bold font-chef text-gray-800 mb-4">
                            Recipe History Error
                        </h1>
                        <p className="text-red-700 font-medium mb-8 leading-relaxed">
                            {error}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                            <button 
                                onClick={() => fetchRecipeHistory(1)} 
                                className="chef-button bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white flex items-center space-x-2 justify-center"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                <span>Try Again</span>
                            </button>
                            <a 
                                href="/dashboard" 
                                className="chef-button bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white flex items-center space-x-2 justify-center"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                <span>Back to Dashboard</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (pagination.total_count === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 bg-chef-pattern">
                {/* Floating decorative elements */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-20 left-20 w-32 h-32 bg-gray-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
                    <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
                    <div className="absolute bottom-20 left-40 w-40 h-40 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{animationDelay: '4s'}}></div>
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                    {/* Header Section */}
                    <div className="chef-card rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl border border-white/30 backdrop-blur-xl text-center">
                        <div className="w-20 h-20 bg-chef-gradient rounded-full mb-6 shadow-lg flex items-center justify-center mx-auto">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-chef text-gray-800 mb-4">
                            Your Recipe History
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto">
                            Hello, <span className="font-bold text-primary-600">{user?.username}</span>! Here are all the amazing recipes you've created.
                        </p>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                        <a 
                            href="/dashboard" 
                            className="chef-button bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white flex items-center space-x-2 justify-center"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span>Back to Dashboard</span>
                        </a>
                        <a 
                            href="/profile" 
                            className="chef-button bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white flex items-center space-x-2 justify-center"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>Profile Settings</span>
                        </a>
                    </div>

                    {/* Empty State */}
                    <div className="chef-card rounded-2xl p-8 sm:p-12 shadow-lg border border-white/30 backdrop-blur-xl text-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                            <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.5 2C13.9 2 15 3.1 15 4.5C15 5.9 13.9 7 12.5 7S10 5.9 10 4.5C10 3.1 11.1 2 12.5 2M20 7C20 8.11 19.11 9 18 9S16 8.11 16 7 16.89 5 18 5 20 5.89 20 7M8 7C8 8.11 7.11 9 6 9S4 8.11 4 7 4.89 5 6 5 8 5.89 8 7M18 11C18.7 11 19.37 11.13 20 11.35V20C20 21.11 19.11 22 18 22H6C4.89 22 4 21.11 4 20V11.35C4.63 11.13 5.3 11 6 11H18Z"/>
                            </svg>
                        </div>
                        
                        <h3 className="text-2xl font-bold font-chef text-gray-800 mb-4">
                            No Recipes Yet!
                        </h3>
                        <p className="text-gray-600 font-medium mb-8 leading-relaxed">
                            Start by generating your first recipe from ingredients you have on hand. Our AI chef is ready to help you create amazing dishes!
                        </p>
                        
                        <a 
                            href="/dashboard" 
                            className="chef-button bg-chef-gradient text-white inline-flex items-center space-x-2"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.5 2C13.9 2 15 3.1 15 4.5C15 5.9 13.9 7 12.5 7S10 5.9 10 4.5C10 3.1 11.1 2 12.5 2M20 7C20 8.11 19.11 9 18 9S16 8.11 16 7 16.89 5 18 5 20 5.89 20 7M8 7C8 8.11 7.11 9 6 9S4 8.11 4 7 4.89 5 6 5 8 5.89 8 7M18 11C18.7 11 19.37 11.13 20 11.35V20C20 21.11 19.11 22 18 22H6C4.89 22 4 21.11 4 20V11.35C4.63 11.13 5.3 11 6 11H18Z"/>
                            </svg>
                            <span>Generate Your First Recipe</span>
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-green-50 bg-chef-pattern">
            {/* Floating decorative elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-20 left-20 w-32 h-32 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
                <div className="absolute bottom-20 left-40 w-40 h-40 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{animationDelay: '4s'}}></div>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {/* Header Section */}
                <div className="chef-card rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl border border-white/30 backdrop-blur-xl text-center">
                    <div className="w-20 h-20 bg-chef-gradient rounded-full mb-6 shadow-lg flex items-center justify-center mx-auto">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-chef text-gray-800 mb-4">
                        Your Recipe History
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto">
                        Hello, <span className="font-bold text-primary-600">{user?.username}</span>! Here are all the amazing recipes you've created.
                    </p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                    <a 
                        href="/dashboard" 
                        className="chef-button bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white flex items-center space-x-2 justify-center"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span>Back to Dashboard</span>
                    </a>
                    <a 
                        href="/profile" 
                        className="chef-button bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white flex items-center space-x-2 justify-center"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Profile Settings</span>
                    </a>
                </div>

                {/* Recipe Count Info */}
                <div className="chef-card rounded-2xl p-6 shadow-lg border border-white/30 backdrop-blur-xl text-center">
                    <div className="flex items-center justify-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-chef-gradient rounded-xl shadow-md flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2.5 2.25l1.45-1.45L16.5 12.25l-1.45 1.45-1.45-1.45L12.25 13.5l1.45 1.45L12.25 16.5l1.45 1.45 1.45-1.45 1.45 1.45z"/>
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold font-chef text-gray-800">
                                Recipe History
                            </h2>
                            <p className="text-gray-600 font-medium">
                                <span className="font-bold text-primary-600">{pagination.total_count}</span> recipe{pagination.total_count !== 1 ? 's' : ''} found
                            </p>
                        </div>
                    </div>
                    
                    <div className="text-sm text-gray-500 font-medium">
                        Page {pagination.current_page} of {pagination.total_pages}
                    </div>
                </div>

                {/* Pagination controls at top */}
                <PaginationControls />

                {/* Recipe Cards */}
                <div className="space-y-6">
                    {recipes.map((recipe) => (
                        <div key={recipe.id} className="chef-card rounded-2xl p-6 sm:p-8 shadow-lg border border-white/30 backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                            {/* Recipe Header */}
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0 mb-6">
                                <div className="flex-1 lg:pr-6">
                                    <h3 className="text-2xl sm:text-3xl font-bold font-chef text-gray-800 mb-3">
                                        {recipe.name}
                                    </h3>
                                    <div className="flex flex-wrap gap-2 mb-3">
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
                                    <div className="flex items-center text-sm text-gray-500 font-medium">
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                        </svg>
                                        Created on {formatDate(recipe.created_at)}
                                    </div>
                                </div>
                                
                                <div className="flex-shrink-0 lg:self-start">
                                    <button 
                                        onClick={() => toggleRecipeDetails(recipe.id)}
                                        className={`chef-button ${expandedRecipe === recipe.id 
                                            ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600' 
                                            : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                                        } text-white flex items-center space-x-2 whitespace-nowrap`}
                                    >
                                        {expandedRecipe === recipe.id ? (
                                            <>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                </svg>
                                                <span>Show Less</span>
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                                <span>Show Details</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Expanded Recipe Details */}
                            {expandedRecipe === recipe.id && (
                                <div className="border-t border-gray-200/50 pt-6">
                                    <ImhotepRecipe 
                                        recipes={[recipe]} 
                                        loading={false} 
                                        error="" 
                                    />
                                </div>
                            )}
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
