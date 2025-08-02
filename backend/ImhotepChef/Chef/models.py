from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    """
    Base user model for all user types in the system
    """
    
    email_verify = models.BooleanField(default=False, verbose_name="Email Verified")
    
    def __str__(self):
        return f"{self.username} ({self.email})"
    
    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"