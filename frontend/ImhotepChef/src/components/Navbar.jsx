import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ onToggle }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      const shouldBeOpen = !mobile;
      setIsOpen(shouldBeOpen);
      if (onToggle) onToggle(shouldBeOpen);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [onToggle]);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const toggleNavbar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (onToggle) onToggle(newState);
  };

  const closeNavbar = () => {
    if (isMobile) {
      setIsOpen(false);
      if (onToggle) onToggle(false);
    }
  };

  return (
    <>
      {/* Toggle Button - Always visible */}
      <button 
        className="navbar-toggle"
        onClick={toggleNavbar}
        aria-label="Toggle navigation"
        title={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        <svg 
          className={`navbar-toggle-icon ${isOpen ? 'open' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Navbar Container */}
      <nav className={`navbar ${isMobile ? (isOpen ? 'navbar-open' : '') : (isOpen ? '' : 'navbar-collapsed')}`}>
        <div className="navbar-content">
          {/* Logo/Brand */}
          <div className="navbar-brand">
            <h2 className="navbar-title">Imhotep Chef</h2>
          </div>

          {/* User Info */}
          <div className="navbar-user">
            <div className="navbar-avatar">
              {user?.first_name ? user.first_name.charAt(0).toUpperCase() : user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="navbar-user-info">
              <p className="navbar-username">
                {user?.first_name && user?.last_name 
                  ? `${user.first_name} ${user.last_name}`
                  : user?.username || 'User'
                }
              </p>
              <p className="navbar-email">{user?.email}</p>
              {!user?.email_verify && (
                <span className="navbar-unverified">Email not verified</span>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="navbar-nav">
            <Link 
              to="/dashboard" 
              className={`navbar-link ${isActive('/dashboard') ? 'active' : ''}`}
              onClick={closeNavbar}
            >
              <svg className="navbar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
              </svg>
              Dashboard
            </Link>
            
            <Link 
              to="/profile" 
              className={`navbar-link ${isActive('/profile') ? 'active' : ''}`}
              onClick={closeNavbar}
            >
              <svg className="navbar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </Link>
          </div>

          {/* Logout Button */}
          <div className="navbar-footer">
            <button 
              onClick={handleLogout}
              className="navbar-logout"
            >
              <svg className="navbar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile only */}
      {isMobile && isOpen && <div className="navbar-overlay" onClick={closeNavbar}></div>}
    </>
  );
};

export default Navbar;