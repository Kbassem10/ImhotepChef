import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <div className="card" style={{ maxWidth: '600px', width: '100%' }}>
        <h1 className="main-title">Welcome to Imhotep Chef</h1>
        <p className="card-text">
          Hello, <strong>{user?.username}</strong>! You are successfully logged in.
        </p>
        <p className="card-text">
          Email: {user?.email}
          {!user?.email_verify && (
            <span style={{ color: 'orange', marginLeft: '8px' }}>
              (Not verified)
            </span>
          )}
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <Link 
            to="/profile"
            className="count-button"
            style={{ textDecoration: 'none', textAlign: 'center' }}
          >
            Manage Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;