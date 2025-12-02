import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogin = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  };

  const handleRegister = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <header>
        <div className="container header-container">
          <div className="logo">
            <i className="fas fa-spa"></i>
            <span>GlamBook</span>
          </div>
          <nav>
            <ul>
              <li>
                <a href="#home" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  <i className="fas fa-home"></i> Home
                </a>
              </li>
              <li>
                <a href="#salons" onClick={(e) => { e.preventDefault(); scrollToSection('salons'); }}>
                  <i className="fas fa-cut"></i> Salons
                </a>
              </li>
              {!isAuthenticated && (
                <li>
                  <a href="#register" onClick={(e) => { e.preventDefault(); scrollToSection('register'); }}>
                    <i className="fas fa-store"></i> Register Salon
                  </a>
                </li>
              )}
              <li>
                <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>
                  <i className="fas fa-info-circle"></i> About
                </a>
              </li>
            </ul>
          </nav>
          <div className="auth-buttons">
            {isAuthenticated ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ color: 'var(--white)' }}>
                  <i className="fas fa-user"></i> {user?.name}
                </span>
                <button className="login-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button className="login-btn" onClick={handleLogin}>Login</button>
                <button className="register-btn" onClick={handleRegister}>Sign Up</button>
              </>
            )}
          </div>
        </div>
      </header>
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToRegister={handleRegister}
      />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSwitchToLogin={handleLogin}
      />
    </>
  );
};

export default Header;

