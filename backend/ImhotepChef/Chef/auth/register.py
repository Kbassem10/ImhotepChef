#all of the auth related function
from django.shortcuts import render, redirect
from ..models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout, get_backends, get_user_model
from django.contrib.auth.decorators import login_required
from django.core.mail import send_mail
from django.urls import reverse
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.template.loader import render_to_string
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.forms import PasswordResetForm, SetPasswordForm
from django.contrib.auth.hashers import make_password
from ImhotepChef.settings import SITE_DOMAIN
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password

#the register route
@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    try:
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        password2 = request.data.get('password2')
        first_name = request.data.get('first_name', '')
        last_name = request.data.get('last_name', '')

        # Check if all required fields are provided
        if not all([username, email, password, password2]):
            return Response(
                {'error': 'All fields are required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check if username contains '@'
        if '@' in username:
            return Response(
                {'error': 'Username cannot contain @ in it'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check if email contains '@'
        if '@' not in email:
            return Response(
                {'error': 'Email must contain @ in it'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check if passwords match
        if password != password2:
            return Response(
                {'error': 'Passwords do not match'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check if username already exists
        try:
            if User.objects.filter(username=username).exists():
                return Response(
                    {'error': 'Username already exists'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
        except Exception as db_error:
            return Response(
                {'error': 'Database connection error. Please ensure migrations are run and database is accessible.'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
        # Check if email already exists
        try:
            if User.objects.filter(email=email).exists():
                return Response(
                    {'error': 'Email already exists'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
        except Exception as db_error:
            return Response(
                {'error': 'Database connection error. Please ensure migrations are run and database is accessible.'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
        # Create a new user
        try:
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password,
                email_verify=True,
                first_name=first_name,
                last_name=last_name
            )
            user.save()
        except Exception as create_error:
            return Response(
                {'error': f'Failed to create user: {str(create_error)}'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        # Send verification email
        # mail_subject = 'Activate your account.'
        # current_site = SITE_DOMAIN.rstrip('/')  # Remove trailing slash if present
        # message = render_to_string('activate_mail_send.html', {
        #     'user': user,
        #     'domain': current_site,
        #     'uid': urlsafe_base64_encode(force_bytes(user.pk)),
        #     'token': default_token_generator.make_token(user),
        # })
        # send_mail(mail_subject, message, 'imhoteptech1@gmail.com', [email], html_message=message)

        return Response(
            {'message': 'User created successfully'}, 
            status=status.HTTP_201_CREATED
        )
            
    except Exception as e:
        return Response(
            {'error': f'An error occurred during registration: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
