import { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth(); // Remove googleAuth
  const [status, setStatus] = useState('processing');
  const [message, setMessage] = useState('Processing Google authentication...');
  const hasProcessed = useRef(false);

  const googleAuth = async (code) => {
    try {
      const response = await axios.post('/api/auth/google/authenticate/', {
        code,
      });
      
      const { access, refresh, user: userData, is_new_user } = response.data;
      
      return { 
        success: true, 
        isNewUser: is_new_user || false,
        data: { access, refresh, user: userData }
      };
    } catch (error) {
      console.error('Google authentication failed:', error);
      
      let errorMessage = 'Google authentication failed';
      
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      }
      
      return { 
        success: false, 
        error: errorMessage
      };
    }
  };

  useEffect(() => {
    const handleGoogleCallback = async () => {
      // Prevent multiple executions
      if (hasProcessed.current) return;
      hasProcessed.current = true;
      
      const code = searchParams.get('code');
      const error = searchParams.get('error');

      if (error) {
        setStatus('error');
        setMessage('Google authentication was cancelled or failed.');
        setTimeout(() => navigate('/login'), 3000);
        return;
      }

      if (!code) {
        setStatus('error');
        setMessage('No authorization code received from Google.');
        setTimeout(() => navigate('/login'), 3000);
        return;
      }

      try {
        const result = await googleAuth(code);
        
        if (result.success) {
          login(result.data);
          setStatus('success');
          if (result.isNewUser) {
            setMessage('Welcome to ImhotepChef! Your account has been created successfully.');
          } else {
            setMessage('Login successful! Redirecting to dashboard...');
          }
          setTimeout(() => navigate('/dashboard'), 2000);
        } else {
          setStatus('error');
          setMessage(result.error || 'Google authentication failed.');
          setTimeout(() => navigate('/login'), 3000);
        }
      } catch (error) {
        setStatus('error');
        setMessage('An unexpected error occurred during authentication.');
        setTimeout(() => navigate('/login'), 3000);
      }
    };

    handleGoogleCallback();
  }, [searchParams, login, navigate]);

  const getIcon = () => {
    switch (status) {
      case 'processing':
        return (
          <div className="verification-spinner">
            <div className="spinner-ring"></div>
          </div>
        );
      case 'success':
        return <div className="verification-icon success-icon">✓</div>;
      case 'error':
        return <div className="verification-icon error-icon">✕</div>;
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (status) {
      case 'processing':
        return 'Authenticating with Google...';
      case 'success':
        return 'Authentication Successful!';
      case 'error':
        return 'Authentication Failed';
      default:
        return '';
    }
  };

  return (
    <div className="verification-container">
      <div className="verification-card">
        <div className="verification-header">
          <div className="verification-icon-container">
            {getIcon()}
          </div>
          
          <h1 className="verification-title">
            {getTitle()}
          </h1>
          
          <p className="verification-subtitle">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoogleCallback;
