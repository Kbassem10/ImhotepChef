import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="app-container">
      <div className="card" style={{ maxWidth: '600px', width: '100%' }}>
        <h1 className="main-title">Welcome to Imhotep Chef</h1>
        <p className="card-text">
          Hello, <strong>{user?.username}</strong>! You are successfully logged in.
        </p>
        <p className="card-text">
          Email: {user?.email}
        </p>
        <button 
          onClick={logout}
          className="count-button"
          style={{ marginTop: '1rem' }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
