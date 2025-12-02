import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const UserRegistrationForm = ({ onSuccess, onBack }) => {
  const { registerUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
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

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    const result = await registerUser({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone
    });

    if (result.success) {
      onSuccess();
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div>
      <button
        onClick={onBack}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--primary)',
          cursor: 'pointer',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        <i className="fas fa-arrow-left"></i> Back
      </button>
      <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary-dark)' }}>User Registration</h3>
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
          <label htmlFor="userName">Full Name *</label>
          <input
            type="text"
            id="userName"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="userEmail">Email Address *</label>
          <input
            type="email"
            id="userEmail"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="userPhone">Phone Number</label>
          <input
            type="tel"
            id="userPhone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="userPassword">Password *</label>
            <input
              type="password"
              id="userPassword"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter password (min 6 characters)"
              minLength="6"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password *</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
            />
          </div>
        </div>
        <button type="submit" className="booking-btn" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default UserRegistrationForm;

