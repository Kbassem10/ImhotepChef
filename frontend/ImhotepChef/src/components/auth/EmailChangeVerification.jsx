import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';

const EmailChangeVerification = () => {
  const { uid, token, new_email } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const verifyEmailChange = async () => {
      try {
        const response = await axios.post('/api/profile/verify-email-change/', {
          uid,
          token,
          new_email: new_email, // This is already the encoded email from URL params
        });
        
        setStatus('success');
        setMessage('Your email has been changed successfully!');
        
        // Start countdown
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              navigate('/login', { 
                state: { message: 'Email changed successfully! Please log in again.' }
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

    if (uid && token && new_email) {
      verifyEmailChange();
    } else {
      setStatus('error');
      setMessage('Invalid verification link.');
    }
  }, [uid, token, new_email, navigate]);

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
        return 'Verifying Email Change...';
      case 'success':
        return 'Email Changed Successfully!';
      case 'error':
        return 'Verification Failed';
      default:
        return '';
    }
  };

  const getSubtitle = () => {
    switch (status) {
      case 'verifying':
        return 'Please wait while we verify your email change...';
      case 'success':
        return 'Your email address has been updated successfully. Please log in again.';
      case 'error':
        return message;
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
            {getSubtitle()}
          </p>
        </div>
        
        {status !== 'verifying' && (
          <div className="verification-actions">
            <Link 
              to="/login"
              className="verification-button"
            >
              Go to Login
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

export default EmailChangeVerification;