import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const EmailVerification = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.post('/api/auth/verify-email/', {
          uid,
          token,
        });
        
        setStatus('success');
        setMessage('Your email has been verified successfully!');
        
        // Redirect to login after 10 seconds
        setTimeout(() => {
          navigate('/login', { 
            state: { message: 'Email verified! You can now log in.' }
          });
        }, 10000);
        
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
          <div className="spinner">
            <svg className="animate-spin" width="48" height="48" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray="31.416"
                strokeDashoffset="31.416"
                style={{
                  animation: 'spin 2s linear infinite',
                }}
              />
            </svg>
          </div>
        );
      case 'success':
        return <div style={{ fontSize: '48px', color: '#059669' }}>✅</div>;
      case 'error':
        return <div style={{ fontSize: '48px', color: '#dc2626' }}>❌</div>;
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
    <div className="app-container">
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .spinner svg {
            animation: spin 2s linear infinite;
            color: var(--button-bg);
          }
        `}
      </style>
      
      <div className="card" style={{ maxWidth: '500px', width: '100%', textAlign: 'center' }}>
        <div style={{ marginBottom: '2rem' }}>
          {getIcon()}
        </div>
        
        <h1 
          className="main-title" 
          style={{ 
            fontSize: '1.5rem', 
            marginBottom: '1rem',
            color: status === 'success' ? '#059669' : status === 'error' ? '#dc2626' : 'var(--text-primary)'
          }}
        >
          {getTitle()}
        </h1>
        
        <p className="card-text" style={{ marginBottom: '2rem' }}>
          {status === 'verifying' && 'Please wait while we verify your email address...'}
          {status === 'success' && 'Welcome to ImhotepChef! You can now log in and start your culinary journey.'}
          {status === 'error' && message}
        </p>
        
        {status !== 'verifying' && (
          <Link 
            to={getButtonLink()}
            className="count-button"
            style={{ 
              textDecoration: 'none', 
              display: 'inline-block',
              padding: '0.75rem 1.5rem'
            }}
          >
            {getButtonText()}
          </Link>
        )}
        
        {status === 'success' && (
          <p className="card-text" style={{ marginTop: '1rem', fontSize: '0.875rem' }}>
            Redirecting to login in 3 seconds...
          </p>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
