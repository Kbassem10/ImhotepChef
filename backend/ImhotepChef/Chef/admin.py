from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model
from .models import RecipeHistory

User = get_user_model()

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """Admin interface for the custom User model"""
    
    # Fields to display in the user list
    list_display = ('username', 'email', 'first_name', 'last_name', 'email_verify', 'recipes_last_month', 'is_staff', 'date_joined')
    list_filter = ('email_verify', 'is_staff', 'is_superuser', 'is_active', 'date_joined')
    search_fields = ('username', 'email', 'first_name', 'last_name')
    ordering = ('-date_joined',)
    
    # Add the custom fields to the user edit form
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Email Verification', {
            'fields': ('email_verify',)
        }),
        ('Recipe Statistics', {
            'fields': ('recipe_count_this_month',)
        }),
    )
    
    # Add custom fields to the user creation form
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('Personal Info', {
            'fields': ('first_name', 'last_name', 'email', 'email_verify')
        }),
    )
    
    # Make email_verify editable in the list view
    list_editable = ('email_verify',)
    
    # Add actions for bulk operations
    actions = ['mark_email_verified', 'mark_email_unverified']
    
    def mark_email_verified(self, request, queryset):
        """Mark selected users as email verified"""
        updated = queryset.update(email_verify=True)
        self.message_user(request, f'{updated} users marked as email verified.')
    mark_email_verified.short_description = 'Mark selected users as email verified'
    
    def mark_email_unverified(self, request, queryset):
        """Mark selected users as email unverified"""
        updated = queryset.update(email_verify=False)
        self.message_user(request, f'{updated} users marked as email unverified.')
    mark_email_unverified.short_description = 'Mark selected users as email unverified'
    
    def recipes_last_month(self, obj):
        """Display the number of recipes created by the user in the current calendar month"""
        return obj.get_recipes_last_month_count()
    recipes_last_month.short_description = 'Recipes (This Month)'
    recipes_last_month.admin_order_field = 'recipe_count_last_month'
    
    def get_queryset(self, request):
        """Optimize query by prefetching recipe history"""
        return super().get_queryset(request).prefetch_related('user_recipe_history')

@admin.register(RecipeHistory)
class RecipeHistoryAdmin(admin.ModelAdmin):
    """Admin interface for the RecipeHistory model"""
    
    # Fields to display in the recipe list
    list_display = ('recipe_name', 'user', 'recipe_difficulty', 'servings', 'prep_time', 'cook_time', 'created_at')
    list_filter = ('recipe_difficulty', 'created_at', 'servings')
    search_fields = ('recipe_name', 'user__username', 'user__email', 'recipe_description')
    ordering = ('-created_at',)
    
    # Fields to display in the recipe detail view
    fieldsets = (
        ('Basic Information', {
            'fields': ('user', 'recipe_name', 'recipe_description', 'recipe_difficulty')
        }),
        ('Timing & Servings', {
            'fields': ('prep_time', 'cook_time', 'total_time', 'servings')
        }),
        ('Ingredients', {
            'fields': ('main_ingredients', 'additional_ingredients'),
            'classes': ('collapse',)
        }),
        ('Instructions & Tips', {
            'fields': ('instructions', 'tips'),
            'classes': ('collapse',)
        }),
        ('Nutrition Information', {
            'fields': ('nutrition',),
            'classes': ('collapse',)
        }),
        ('Metadata', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )
    
    # Make created_at read-only
    readonly_fields = ('created_at',)
    
    # Number of recipes per page
    list_per_page = 25
    
    # Add actions for bulk operations
    actions = ['mark_as_easy', 'mark_as_medium', 'mark_as_hard']
    
    def mark_as_easy(self, request, queryset):
        """Mark selected recipes as Easy difficulty"""
        updated = queryset.update(recipe_difficulty='Easy')
        self.message_user(request, f'{updated} recipes marked as Easy.')
    mark_as_easy.short_description = 'Mark selected recipes as Easy'
    
    def mark_as_medium(self, request, queryset):
        """Mark selected recipes as Medium difficulty"""
        updated = queryset.update(recipe_difficulty='Medium')
        self.message_user(request, f'{updated} recipes marked as Medium.')
    mark_as_medium.short_description = 'Mark selected recipes as Medium'
    
    def mark_as_hard(self, request, queryset):
        """Mark selected recipes as Hard difficulty"""
        updated = queryset.update(recipe_difficulty='Hard')
        self.message_user(request, f'{updated} recipes marked as Hard.')
    mark_as_hard.short_description = 'Mark selected recipes as Hard'
    
    # Custom display methods
    def get_queryset(self, request):
        """Optimize query by selecting related user data"""
        return super().get_queryset(request).select_related('user')
