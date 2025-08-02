import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';

const EmailVerification = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.post('/api/auth/verify-email/', {
          uid,
          token,
        });
        
        setStatus('success');
        setMessage('Your email has been verified successfully!');
        
        // Start countdown
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              navigate('/login', { 
                state: { message: 'Email verified! You can now log in.' }
              });
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        
        return () => clearInterval(timer);
        
      } catch (error) {
        setStatus('error');
        setMessage(
          error.response?.data?.error || 
          'The verification link is invalid or has expired.'
        );
      }
    };

    if (uid && token) {
      verifyEmail();
    } else {
      setStatus('error');
      setMessage('Invalid verification link.');
    }
  }, [uid, token, navigate]);

  const getIcon = () => {
    switch (status) {
      case 'verifying':
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
      case 'verifying':
        return 'Verifying Your Email...';
      case 'success':
        return 'Email Verified Successfully!';
      case 'error':
        return 'Verification Failed';
      default:
        return '';
    }
  };

  const getSubtitle = () => {
    switch (status) {
      case 'verifying':
        return 'Please wait while we verify your email address...';
      case 'success':
        return 'Welcome to ImhotepChef! You can now log in and start your culinary journey.';
      case 'error':
        return message;
      default:
        return '';
    }
  };

  const getButtonText = () => {
    switch (status) {
      case 'success':
        return 'Continue to Login';
      case 'error':
        return 'Register Again';
      default:
        return null;
    }
  };

  const getButtonLink = () => {
    switch (status) {
      case 'success':
        return '/login';
      case 'error':
        return '/register';
      default:
        return '/';
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
            {getSubtitle()}
          </p>
        </div>
        
        {status !== 'verifying' && (
          <div className="verification-actions">
            <Link 
              to={getButtonLink()}
              className="verification-button"
            >
              {getButtonText()}
            </Link>
          </div>
        )}
        
        {status === 'success' && countdown > 0 && (
          <div className="verification-countdown">
            <p>Redirecting to login in {countdown} seconds...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
