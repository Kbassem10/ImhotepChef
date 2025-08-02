from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model

User = get_user_model()

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """Admin interface for the custom User model"""
    
    # Fields to display in the user list
    list_display = ('username', 'email', 'first_name', 'last_name', 'email_verify', 'is_staff', 'date_joined')
    list_filter = ('email_verify', 'is_staff', 'is_superuser', 'is_active', 'date_joined')
    search_fields = ('username', 'email', 'first_name', 'last_name')
    ordering = ('-date_joined',)
    
    # Add the custom fields to the user edit form
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Email Verification', {
            'fields': ('email_verify',)
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
