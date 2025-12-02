import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(formData.email, formData.password);

    if (result.success) {
      onClose();
      setFormData({ email: '', password: '' });
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal show" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Login</h2>
          <button className="close-modal" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ 
                backgroundColor: '#ffebee', 
                color: '#c62828', 
                padding: '1rem', 
                borderRadius: '4px', 
                marginBottom: '1rem' 
              }}>
                {error}
              </div>
            )}
            <div className="form-group">
              <label htmlFor="loginEmail">Email Address *</label>
              <input
                type="email"
                id="loginEmail"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="loginPassword">Password *</label>
              <input
                type="password"
                id="loginPassword"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="booking-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <p>
                Don't have an account?{' '}
                <a 
                  href="#register" 
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                    onSwitchToRegister();
                  }}
                  style={{ color: 'var(--primary)', cursor: 'pointer' }}
                >
                  Register here
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

