import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import UserRegistrationForm from './UserRegistrationForm';
import SalonRegistrationForm from './SalonRegistrationForm';

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [registerType, setRegisterType] = useState(null); // null, 'user', or 'salon'

  if (!isOpen) return null;

  return (
    <div className="modal show" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Register</h2>
          <button className="close-modal" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {!registerType ? (
            <div>
              <h3 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--primary-dark)' }}>
                Choose Your Account Type
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div
                  onClick={() => setRegisterType('user')}
                  style={{
                    padding: '2rem',
                    border: '2px solid var(--primary-light)',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    backgroundColor: 'var(--light)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary-light)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <i className="fas fa-user" style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1rem' }}></i>
                  <h3 style={{ color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>User</h3>
                  <p style={{ color: '#666' }}>Book appointments at salons</p>
                </div>
                <div
                  onClick={() => setRegisterType('salon')}
                  style={{
                    padding: '2rem',
                    border: '2px solid var(--primary-light)',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    backgroundColor: 'var(--light)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary-light)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <i className="fas fa-store" style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1rem' }}></i>
                  <h3 style={{ color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>Salon Owner</h3>
                  <p style={{ color: '#666' }}>Register your salon business</p>
                </div>
              </div>
              <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <p>
                  Already have an account?{' '}
                  <a
                    href="#login"
                    onClick={(e) => {
                      e.preventDefault();
                      onClose();
                      onSwitchToLogin();
                    }}
                    style={{ color: 'var(--primary)', cursor: 'pointer' }}
                  >
                    Login here
                  </a>
                </p>
              </div>
            </div>
          ) : registerType === 'user' ? (
            <UserRegistrationForm
              onSuccess={() => {
                onClose();
                setRegisterType(null);
              }}
              onBack={() => setRegisterType(null)}
            />
          ) : (
            <SalonRegistrationForm
              onSuccess={() => {
                onClose();
                setRegisterType(null);
              }}
              onBack={() => setRegisterType(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;

