import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSalonContext } from '../context/SalonContext';

const SalonRegistrationForm = ({ onSuccess, onBack }) => {
  const { registerSalon } = useAuth();
  const { fetchSalons } = useSalonContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    shopName: '',
    contactNumber: '',
    location: '',
    description: ''
  });
  const [services, setServices] = useState([
    { name: '', price: '' }
  ]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleServiceChange = (index, field, value) => {
    const newServices = [...services];
    newServices[index][field] = value;
    setServices(newServices);
  };

  const addServiceField = () => {
    setServices([...services, { name: '', price: '' }]);
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

    const validServices = services.filter(
      service => service.name.trim() && service.price
    );

    if (validServices.length === 0) {
      setError('Please add at least one service');
      return;
    }

    setLoading(true);

    const result = await registerSalon({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      shopName: formData.shopName,
      contactNumber: formData.contactNumber,
      location: formData.location,
      description: formData.description,
      services: validServices.map(service => ({
        name: service.name,
        price: parseFloat(service.price)
      }))
    });

    if (result.success) {
      // Refresh salons list
      if (fetchSalons) {
        fetchSalons();
      }
      onSuccess();
      // Scroll to salons section
      const element = document.getElementById('salons');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
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
      <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary-dark)' }}>Salon Owner Registration</h3>
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

        <h4 style={{ marginBottom: '1rem', color: 'var(--primary-dark)' }}>Account Information</h4>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="ownerName">Owner Name *</label>
            <input
              type="text"
              id="ownerName"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="ownerEmail">Email Address *</label>
            <input
              type="email"
              id="ownerEmail"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="ownerPhone">Phone Number</label>
            <input
              type="tel"
              id="ownerPhone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div>
          <div className="form-group">
            <label htmlFor="ownerPassword">Password *</label>
            <input
              type="password"
              id="ownerPassword"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter password (min 6 characters)"
              minLength="6"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="ownerConfirmPassword">Confirm Password *</label>
          <input
            type="password"
            id="ownerConfirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm your password"
          />
        </div>

        <h4 style={{ marginTop: '2rem', marginBottom: '1rem', color: 'var(--primary-dark)' }}>Salon Information</h4>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="shopName">Shop Name *</label>
            <input
              type="text"
              id="shopName"
              name="shopName"
              value={formData.shopName}
              onChange={handleChange}
              required
              placeholder="Enter salon name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="contactNumber">Contact Number *</label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              placeholder="Enter salon contact number"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="location">Location *</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="City, Address"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Salon Description</label>
          <textarea
            id="description"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your salon"
          ></textarea>
        </div>

        <h4 style={{ marginTop: '2rem', marginBottom: '1rem', color: 'var(--primary-dark)' }}>Services & Pricing</h4>
        <div id="servicesContainer">
          {services.map((service, index) => (
            <div key={index} className="service-entry form-row">
              <div className="form-group">
                <label>Service Name</label>
                <input
                  type="text"
                  className="service-name"
                  placeholder="e.g., Haircut, Manicure"
                  value={service.name}
                  onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Price ($)</label>
                <input
                  type="number"
                  className="service-price"
                  min="0"
                  step="0.01"
                  value={service.price}
                  onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                  required
                />
              </div>
            </div>
          ))}
        </div>
        <button type="button" className="add-service-btn" onClick={addServiceField}>
          <i className="fas fa-plus"></i> Add Another Service
        </button>
        <button type="submit" className="booking-btn" disabled={loading} style={{ marginTop: '1rem' }}>
          {loading ? 'Registering...' : 'Register Salon'}
        </button>
      </form>
    </div>
  );
};

export default SalonRegistrationForm;

