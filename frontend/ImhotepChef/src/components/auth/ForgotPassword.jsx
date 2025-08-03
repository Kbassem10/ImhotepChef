import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const requestPasswordReset = async (email) => {
    try {
      const response = await axios.post('/api/auth/password-reset/', {
        email,
      });
      
      return { 
        success: true, 
        message: response.data.message 
      };
    } catch (error) {
      console.error('Password reset request failed:', error);
      
      let errorMessage = 'Password reset request failed';
      
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

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email) {
      setError('Email is required');
      setLoading(false);
      return;
    }

    const result = await requestPasswordReset(email);
    
    if (result.success) {
      setSuccess(true);
      setMessage(result.message);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  if (success) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="register-success">
            <div className="success-icon">
              ✓
            </div>
            <h2 className="register-success-title">
              Email Sent!
            </h2>
            <p className="register-success-text">
              {message}
            </p>
            <Link to="/login" className="register-success-button">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2 className="login-title">
            Reset Your Password
          </h2>
          <p className="login-subtitle">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>
        
        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label className="login-label">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={handleChange}
              required
              className="login-input"
              placeholder="Enter your email"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="login-button"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="login-footer">
          <p className="login-footer-text">
            Remember your password?{' '}
            <Link to="/login" className="login-link">
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
