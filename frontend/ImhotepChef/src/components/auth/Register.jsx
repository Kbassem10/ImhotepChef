import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [showPasswordState, setShowPasswordState] = useState(false);
  const [showPasswordState2, setShowPasswordState2] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.password2) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const result = await register(
      formData.username, 
      formData.email, 
      formData.password, 
      formData.password2
    );
    
    if (result.success) {
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setError(typeof result.error === 'string' ? result.error : 'Registration failed');
    }
    
    setLoading(false);
  };

  if (success) {
    return (
      <div className="register-container">
        <div className="register-card">
          <div className="register-success">
            <div className="success-icon">
              ✓
            </div>
            <h2 className="register-success-title">
              Registration Successful!
            </h2>
            <p className="register-success-text">
              Your account has been created successfully. Please check your email and click the verification link to activate your account before logging in.
            </p>
            <Link to="/login" className="register-success-button">
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  function ShowPassword(){
    setShowPasswordState(!showPasswordState)
  }

  function ShowPassword2(){
    setShowPasswordState2(!showPasswordState2)
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2 className="register-title">
            Join Imhotep Chef
          </h2>
          <p className="register-subtitle">
            Create your account to start cooking
          </p>
        </div>
        
        {error && (
          <div className="register-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="register-field">
            <label className="register-label">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="register-input"
            />
          </div>

          <div className="register-field">
            <label className="register-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="register-input"
            />
          </div>

          <div className="register-field">
            <label className="register-label">
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPasswordState ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="register-input"
                style={{ paddingRight: '2.5rem' }}
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
                onMouseEnter={(e) => e.target.style.color = '#333'}
                onMouseLeave={(e) => e.target.style.color = '#666'}
              >
                {showPasswordState ? (
                  // Eye slash icon (password visible)
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  // Eye icon (password hidden)
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="register-field">
            <label className="register-label">
              Confirm Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPasswordState2 ? "text" : "password"}
                name="password2"
                value={formData.password2}
                onChange={handleChange}
                required
                className="register-input"
                style={{ paddingRight: '2.5rem' }}
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
                onMouseEnter={(e) => e.target.style.color = '#333'}
                onMouseLeave={(e) => e.target.style.color = '#666'}
              >
                {showPasswordState2 ? (
                  // Eye slash icon (password visible)
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  // Eye icon (password hidden)
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
            className="register-button"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="register-footer">
          <p className="register-footer-text">
            Already have an account?{' '}
            <Link to="/login" className="register-link">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
