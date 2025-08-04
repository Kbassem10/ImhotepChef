import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const [navbarOpen, setNavbarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setNavbarOpen(!mobile);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (loading) {
    return (
      <div className="app-container">
        <div className="card">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="protected-layout">
      <Navbar onToggle={setNavbarOpen} />
      <main className={`main-content ${!navbarOpen ? 'navbar-collapsed' : ''}`}>
        {children}
      </main>
    </div>
  );
};

export default ProtectedRoute;
