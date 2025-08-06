from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from datetime import timedelta

class User(AbstractUser):
    """
    Base user model for all user types in the system
    """
    
    email_verify = models.BooleanField(default=False, verbose_name="Email Verified")
    
    def get_recipes_last_month_count(self):
        """Calculate the number of recipes created by this user in the current calendar month"""
        now = timezone.now()
        current_month_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        return self.user_recipe_history.filter(created_at__gte=current_month_start).count()
    
    def __str__(self):
        return f"{self.username} ({self.email})"
    
    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"

class RecipeHistory(models.Model):

    RECIPE_DIFFICULTY_CHOICES = (
        ('Easy', 'Easy'),
        ('Medium', 'Medium'),
        ('Hard', 'Hard')
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_recipe_history')
    recipe_name = models.CharField(max_length=200)
    recipe_description = models.TextField()
    recipe_difficulty = models.CharField(max_length=6, choices=RECIPE_DIFFICULTY_CHOICES)
    prep_time = models.CharField(max_length=50)
    cook_time = models.CharField(max_length=50)
    total_time = models.CharField(max_length=50)
    servings = models.IntegerField()
    main_ingredients = models.JSONField(default=list)
    additional_ingredients = models.JSONField(default=list)
    instructions = models.JSONField(default=list)
    tips = models.JSONField(default=list)
    nutrition = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.recipe_name} - {self.user.username}"
    
    class Meta:
        verbose_name = "Recipe History"
        verbose_name_plural = "Recipe Histories"
        ordering = ['-created_at']
