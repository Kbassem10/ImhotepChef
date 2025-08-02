import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../../App.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [showPasswordState, setShowPasswordState] = useState(false);
  
  const { login, getGoogleAuthUrl } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear messages when user starts typing
    if (error) setError('');
    if (info) setInfo('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setInfo('');

    const result = await login(formData.username, formData.password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
      // Set info message if available
      if (result.info) {
        setInfo(result.info);
      }
    }
    
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    if (googleLoading) return;
    
    try {
      setGoogleLoading(true);
      const authUrl = await getGoogleAuthUrl();
      window.location.href = authUrl;
    } catch (error) {
      setError('Failed to initiate Google login');
      setGoogleLoading(false);
    }
  };

  function ShowPassword(){
    setShowPasswordState(!showPasswordState)
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2 className="login-title">
            Welcome Back
          </h2>
          <p className="login-subtitle">
            Sign in to your Imhotep Chef account
          </p>
        </div>
        
        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        {info && (
          <div className="login-info">
            {info}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label className="login-label">
              Username or Email
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="login-input"
            />
          </div>

          <div className="login-field">
            <label className="login-label">
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPasswordState ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="login-input"
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

          <button
            type="submit"
            disabled={loading}
            className="login-button"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-divider">
          <span>or</span>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading || googleLoading}
          className="google-login-button"
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: googleLoading ? '#f5f5f5' : 'white',
            color: '#333',
            fontSize: '1rem',
            cursor: googleLoading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '1rem'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {googleLoading ? 'Redirecting...' : 'Continue with Google'}
        </button>

        <div className="login-footer">
          <p className="login-footer-text">
            Don't have an account?{' '}
            <Link to="/register" className="login-link">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;