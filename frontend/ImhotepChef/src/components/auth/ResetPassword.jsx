import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    new_password: '',
    confirm_password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [success, setSuccess] = useState(false);
  
  const [showPasswordState, setShowPasswordState] = useState(false);
  const [showPasswordState2, setShowPasswordState2] = useState(false);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const uid = searchParams.get('uid');
  const token = searchParams.get('token');

  const validatePasswordResetToken = async (uid, token) => {
    try {
      const response = await axios.post('/api/auth/password-reset/validate/', {
        uid,
        token,
      });
      
      return { 
        success: true, 
        valid: response.data.valid,
        email: response.data.email 
      };
    } catch (error) {
      console.error('Password reset validation failed:', error);
      
      return { 
        success: false, 
        valid: false,
        error: error.response?.data?.error || 'Invalid or expired reset link'
      };
    }
  };

  const confirmPasswordReset = async (uid, token, newPassword, confirmPassword) => {
    try {
      const response = await axios.post('/api/auth/password-reset/confirm/', {
        uid,
        token,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });
      
      return { 
        success: true, 
        message: response.data.message 
      };
    } catch (error) {
      console.error('Password reset confirmation failed:', error);
      
      let errorMessage = 'Password reset failed';
      
      if (error.response?.data?.error) {
        errorMessage = Array.isArray(error.response.data.error) 
          ? error.response.data.error.join(', ')
          : error.response.data.error;
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
    const validateToken = async () => {
      if (!uid || !token) {
        setError('Invalid password reset link');
        setValidating(false);
        return;
      }

      const result = await validatePasswordResetToken(uid, token);
      
      if (result.success && result.valid) {
        setIsValidToken(true);
        setUserEmail(result.email);
      } else {
        setError(result.error || 'Invalid or expired password reset link');
      }
      
      setValidating(false);
    };

    validateToken();
  }, [uid, token]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.new_password !== formData.confirm_password) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.new_password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    const result = await confirmPasswordReset(
      uid, 
      token, 
      formData.new_password, 
      formData.confirm_password
    );
    
    if (result.success) {
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  function ShowPassword() {
    setShowPasswordState(!showPasswordState);
  }

  function ShowPassword2() {
    setShowPasswordState2(!showPasswordState2);
  }

  if (validating) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2 className="login-title">Validating...</h2>
            <p className="login-subtitle">Please wait while we validate your reset link</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isValidToken) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-error" style={{ marginBottom: '1rem' }}>
            {error}
          </div>
          <Link to="/forgot-password" className="login-button">
            Request New Reset Link
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="register-success">
            <div className="success-icon">
              ✓
            </div>
            <h2 className="register-success-title">
              Password Reset Successful!
            </h2>
            <p className="register-success-text">
              Your password has been successfully reset. You can now login with your new password.
            </p>
            <Link to="/login" className="register-success-button">
              Go to Login
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
            Set New Password
          </h2>
          <p className="login-subtitle">
            Enter a new password for {userEmail}
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
              New Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPasswordState ? "text" : "password"}
                name="new_password"
                value={formData.new_password}
                onChange={handleChange}
                required
                className="login-input"
                style={{ paddingRight: '2.5rem' }}
                minLength={8}
              />
              <button
                type="button"
                onClick={ShowPassword}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  color: '#666',
                  padding: '0.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {showPasswordState ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="login-field">
            <label className="login-label">
              Confirm New Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPasswordState2 ? "text" : "password"}
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                required
                className="login-input"
                style={{ paddingRight: '2.5rem' }}
                minLength={8}
              />
              <button
                type="button"
                onClick={ShowPassword2}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  color: '#666',
                  padding: '0.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {showPasswordState2 ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="login-button"
          >
            {loading ? 'Resetting Password...' : 'Reset Password'}
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

export default ResetPassword;
