import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

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
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
      <div className="app-container">
        <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
          <h2 className="main-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            Registration Successful!
          </h2>
          <p className="card-text">
            Your account has been created successfully. Please check your email and click the verification link to activate your account before logging in.
          </p>
          <div style={{ marginTop: '1rem' }}>
            <a href="/login" style={{ color: 'var(--button-bg)' }}>Go to Login</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="main-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
          Register for ImhotepChef
        </h2>
        
        {error && (
          <div style={{ 
            backgroundColor: '#fee2e2', 
            color: '#dc2626', 
            padding: '0.75rem', 
            borderRadius: '0.25rem', 
            marginBottom: '1rem' 
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--border-color)',
                borderRadius: '0.25rem',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--border-color)',
                borderRadius: '0.25rem',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--border-color)',
                borderRadius: '0.25rem',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Confirm Password
            </label>
            <input
              type="password"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--border-color)',
                borderRadius: '0.25rem',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="count-button"
            style={{ width: '100%', padding: '0.75rem' }}
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p className="card-text" style={{ textAlign: 'center', marginTop: '1rem' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--button-bg)' }}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
