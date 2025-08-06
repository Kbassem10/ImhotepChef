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

    const getStatusInfo = () => {
        const percentage = getProgressPercentage();
        if (percentage >= 90) {
            return {
                color: '#dc2626',
                bgColor: 'bg-red-50',
                borderColor: 'border-red-200',
                textColor: 'text-red-700',
                icon: 'warning',
                status: 'Critical'
            };
        }
        if (percentage >= 70) {
            return {
                color: '#f59e0b',
                bgColor: 'bg-amber-50',
                borderColor: 'border-amber-200',
                textColor: 'text-amber-700',
                icon: 'caution',
                status: 'Warning'
            };
        }
        return {
            color: '#10b981',
            bgColor: 'bg-emerald-50',
            borderColor: 'border-emerald-200',
            textColor: 'text-emerald-700',
            icon: 'good',
            status: 'Good'
        };
    };

    const getStatusIcon = (iconType) => {
        switch (iconType) {
            case 'warning':
                return (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                );
            case 'caution':
                return (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                );
            default:
                return (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                );
        }
    };

    const statusInfo = getStatusInfo();

    if (loading) {
        return (
            <div className={`${className} ${
                variant === 'navbar' 
                    ? 'p-3 bg-white/50 backdrop-blur-lg rounded-xl border border-white/30' 
                    : variant === 'card'
                    ? 'chef-card rounded-2xl p-4 shadow-lg border border-white/30 backdrop-blur-xl'
                    : 'inline-flex items-center space-x-2 p-2 bg-gray-50 rounded-lg'
            }`}>
                <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-gray-300 rounded-full animate-pulse"></div>
                    {showLabel && (
                        <span className="text-sm font-medium text-gray-500">
                            Loading recipes...
                        </span>
                    )}
                    <div className="w-8 h-4 bg-gray-300 rounded animate-pulse"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`${className} ${
                variant === 'navbar' 
                    ? 'p-3 bg-red-50/80 backdrop-blur-lg rounded-xl border border-red-200/50' 
                    : variant === 'card'
                    ? 'chef-card rounded-2xl p-4 shadow-lg border border-red-200 bg-red-50/80 backdrop-blur-xl'
                    : 'inline-flex items-center space-x-2 p-2 bg-red-50 rounded-lg border border-red-200'
            }`}>
                <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {showLabel && (
                        <span className="text-sm font-medium text-red-700">
                            Recipes this month:
                        </span>
                    )}
                    <span className="text-sm font-bold text-red-600">--</span>
                </div>
            </div>
        );
    }

    // Default variant (inline)
    if (variant === 'default') {
        return (
            <div className={`inline-flex items-center space-x-2 p-2 ${statusInfo.bgColor} ${statusInfo.borderColor} border rounded-lg transition-all duration-300 hover:shadow-md ${className}`}>
                <div className="flex items-center space-x-2">
                    <div className={`p-1 bg-white rounded-full shadow-sm ${statusInfo.textColor}`}>
                        {getStatusIcon(statusInfo.icon)}
                    </div>
                    {showLabel && (
                        <span className={`text-sm font-medium ${statusInfo.textColor}`}>
                            Recipes this month:
                        </span>
                    )}
                    <span className={`text-sm font-bold ${statusInfo.textColor}`}>
                        {recipeCount} / {maxRecipes}
                    </span>
                </div>
            </div>
        );
    }

    // Navbar variant
    if (variant === 'navbar') {
        return (
            <div className={`p-3 bg-white/50 backdrop-blur-lg rounded-xl border border-white/30 shadow-md transition-all duration-300 hover:shadow-lg ${className}`}>
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                        <div className={`p-1 bg-white rounded-full shadow-sm ${statusInfo.textColor}`}>
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.5 2C13.9 2 15 3.1 15 4.5C15 5.9 13.9 7 12.5 7S10 5.9 10 4.5C10 3.1 11.1 2 12.5 2M20 7C20 8.11 19.11 9 18 9S16 8.11 16 7 16.89 5 18 5 20 5.89 20 7M8 7C8 8.11 7.11 9 6 9S4 8.11 4 7 4.89 5 6 5 8 5.89 8 7M18 11C18.7 11 19.37 11.13 20 11.35V20C20 21.11 19.11 22 18 22H6C4.89 22 4 21.11 4 20V11.35C4.63 11.13 5.3 11 6 11H18Z"/>
                            </svg>
                        </div>
                        <span className="text-xs font-semibold text-gray-700">Recipes</span>
                    </div>
                    <span className="text-xs font-bold text-gray-800">
                        {recipeCount}/{maxRecipes}
                    </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                        className="h-2 rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-primary-400 to-primary-600"
                        style={{ 
                            width: `${getProgressPercentage()}%`,
                            backgroundColor: statusInfo.color
                        }}
                    ></div>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-600">Monthly Limit</span>
                    <div className={`flex items-center space-x-1 ${statusInfo.textColor}`}>
                        {getStatusIcon(statusInfo.icon)}
                        <span className="text-xs font-medium">{statusInfo.status}</span>
                    </div>
                </div>
            </div>
        );
    }

    // Card variant
    if (variant === 'card') {
        return (
            <div className={`chef-card rounded-2xl p-6 shadow-lg border border-white/30 backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:scale-105 ${className}`}>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-chef-gradient rounded-xl shadow-md flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.5 2C13.9 2 15 3.1 15 4.5C15 5.9 13.9 7 12.5 7S10 5.9 10 4.5C10 3.1 11.1 2 12.5 2M20 7C20 8.11 19.11 9 18 9S16 8.11 16 7 16.89 5 18 5 20 5.89 20 7M8 7C8 8.11 7.11 9 6 9S4 8.11 4 7 4.89 5 6 5 8 5.89 8 7M18 11C18.7 11 19.37 11.13 20 11.35V20C20 21.11 19.11 22 18 22H6C4.89 22 4 21.11 4 20V11.35C4.63 11.13 5.3 11 6 11H18Z"/>
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold font-chef text-gray-800">Recipe Usage</h3>
                            <p className="text-sm text-gray-600">Monthly Progress</p>
                        </div>
                    </div>
                    
                    <div className={`px-3 py-1 ${statusInfo.bgColor} ${statusInfo.borderColor} border rounded-full flex items-center space-x-1`}>
                        {getStatusIcon(statusInfo.icon)}
                        <span className={`text-xs font-medium ${statusInfo.textColor}`}>
                            {statusInfo.status}
                        </span>
                    </div>
                </div>

                {/* Count Display */}
                <div className="text-center mb-4">
                    <div className="text-4xl font-bold font-chef text-gray-800 mb-1">
                        {recipeCount}
                        <span className="text-2xl text-gray-500 font-normal">/{maxRecipes}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                        recipes created this month
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm font-bold" style={{ color: statusInfo.color }}>
                            {Math.round(getProgressPercentage())}%
                        </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                        <div 
                            className="h-3 rounded-full transition-all duration-700 ease-out shadow-sm bg-gradient-to-r"
                            style={{ 
                                width: `${getProgressPercentage()}%`,
                                background: `linear-gradient(to right, ${statusInfo.color}CC, ${statusInfo.color})`
                            }}
                        ></div>
                    </div>
                </div>

                {/* Footer Info */}
                <div className={`p-3 ${statusInfo.bgColor} ${statusInfo.borderColor} border rounded-xl`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-sm font-medium ${statusInfo.textColor}`}>
                                {maxRecipes - recipeCount} recipes remaining
                            </p>
                            <p className="text-xs text-gray-600">
                                Resets next month
                            </p>
                        </div>
                        <button 
                            onClick={fetchRecipeCount}
                            className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                            title="Refresh count"
                        >
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default RecipeCount;
