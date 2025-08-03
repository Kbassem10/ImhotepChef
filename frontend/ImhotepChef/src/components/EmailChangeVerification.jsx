import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import '../../App.css';

const EmailChangeVerification = () => {
  const { uid, token, new_email } = useParams();
  const navigate = useNavigate();
  const { updateUser, user } = useAuth();
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const verifyEmailChange = async () => {
      try {
        const response = await axios.post('/api/auth/verify-email-change/', {
          uid,
          token,
          new_email: decodeURIComponent(new_email),
        });
        
        setStatus('success');
        setMessage('Your email has been updated successfully!');
        
        // Update user context if user is logged in
        if (user) {
          const updatedUser = {
            ...user,
            email: decodeURIComponent(new_email),
            email_verify: true
          };
          updateUser(updatedUser);
        }
        
        // Start countdown
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              navigate('/dashboard');
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
  }, [uid, token, new_email, navigate, updateUser, user]);

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
        return 'Email Updated Successfully!';
      case 'error':
        return 'Verification Failed';
      default:
        return '';
    }
  };

  const getSubtitle = () => {
    switch (status) {
      case 'verifying':
        return 'Please wait while we verify your new email address...';
      case 'success':
        return `Your email has been successfully changed to ${decodeURIComponent(new_email)}. You can now use this email to log in.`;
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
              to="/dashboard"
              className="verification-button"
            >
              {status === 'success' ? 'Go to Dashboard' : 'Back to Dashboard'}
            </Link>
          </div>
        )}
        
        {status === 'success' && countdown > 0 && (
          <div className="verification-countdown">
            <p>Redirecting to dashboard in {countdown} seconds...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailChangeVerification;
