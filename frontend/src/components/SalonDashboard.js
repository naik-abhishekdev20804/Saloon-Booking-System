import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const SalonDashboard = () => {
  const { user } = useAuth();
  const [salon, setSalon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    contact: '',
    email: '',
    description: '',
    image: '',
    isOpen: true
  });
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ name: '', price: '' });
  const [editingServiceIndex, setEditingServiceIndex] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (user && user.salonId) {
      fetchSalon();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchSalon = async () => {
    try {
      setLoading(true);
      let salonData;
      
      // Check if salonId is already populated (object) or just an ID (string)
      if (typeof user.salonId === 'object' && user.salonId.name) {
        // Already populated, use it directly
        salonData = user.salonId;
      } else {
        // Just an ID, fetch the salon
        const salonId = typeof user.salonId === 'object' ? user.salonId._id || user.salonId.id : user.salonId;
        const response = await axios.get(`http://localhost:5000/api/salons/${salonId}`);
        salonData = response.data;
      }
      
      setSalon(salonData);
      setFormData({
        name: salonData.name,
        location: salonData.location,
        contact: salonData.contact,
        email: salonData.email,
        description: salonData.description || '',
        image: salonData.image || '',
        isOpen: salonData.isOpen !== undefined ? salonData.isOpen : true
      });
      setServices(salonData.services || []);
    } catch (error) {
      console.error('Error fetching salon:', error);
      setMessage({ type: 'error', text: 'Failed to load salon data' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleToggleOpen = async () => {
    try {
      const salonId = typeof user.salonId === 'object' ? user.salonId._id || user.salonId.id : user.salonId;
      const updatedSalon = { ...formData, isOpen: !formData.isOpen };
      const response = await axios.put(`http://localhost:5000/api/salons/${salonId}`, updatedSalon);
      setSalon(response.data);
      setFormData(updatedSalon);
      setMessage({ type: 'success', text: `Salon is now ${updatedSalon.isOpen ? 'OPEN' : 'CLOSED'}` });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update salon status' });
    }
  };

  const handleUpdateSalon = async (e) => {
    e.preventDefault();
    try {
      const salonId = typeof user.salonId === 'object' ? user.salonId._id || user.salonId.id : user.salonId;
      const updateData = {
        ...formData,
        services: services
      };
      const response = await axios.put(`http://localhost:5000/api/salons/${salonId}`, updateData);
      setSalon(response.data);
      setEditing(false);
      setMessage({ type: 'success', text: 'Salon information updated successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to update salon' });
    }
  };

  const handleAddService = () => {
    if (newService.name && newService.price) {
      setServices([...services, { name: newService.name, price: parseFloat(newService.price) }]);
      setNewService({ name: '', price: '' });
      setMessage({ type: 'success', text: 'Service added. Click "Update Salon" to save changes.' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }
  };

  const handleEditService = (index) => {
    setEditingServiceIndex(index);
    setNewService({ name: services[index].name, price: services[index].price });
  };

  const handleUpdateService = () => {
    if (editingServiceIndex !== null && newService.name && newService.price) {
      const updatedServices = [...services];
      updatedServices[editingServiceIndex] = {
        name: newService.name,
        price: parseFloat(newService.price)
      };
      setServices(updatedServices);
      setEditingServiceIndex(null);
      setNewService({ name: '', price: '' });
      setMessage({ type: 'success', text: 'Service updated. Click "Update Salon" to save changes.' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }
  };

  const handleDeleteService = (index) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
    setMessage({ type: 'success', text: 'Service removed. Click "Update Salon" to save changes.' });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const cancelEdit = () => {
    setEditing(false);
    setEditingServiceIndex(null);
    setNewService({ name: '', price: '' });
    if (salon) {
      setFormData({
        name: salon.name,
        location: salon.location,
        contact: salon.contact,
        email: salon.email,
        description: salon.description || '',
        image: salon.image || '',
        isOpen: salon.isOpen !== undefined ? salon.isOpen : true
      });
      setServices(salon.services || []);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (!salon) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <p>Salon not found</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--light)', padding: '2rem 0' }}>
      <div className="container">
        <div style={{ 
          background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
          color: 'var(--white)',
          padding: '2rem',
          borderRadius: '10px',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{ marginBottom: '0.5rem' }}>Salon Dashboard</h1>
            <p style={{ opacity: 0.9 }}>Manage your salon information and services</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              padding: '0.5rem 1rem',
              backgroundColor: formData.isOpen ? '#4caf50' : '#f44336',
              borderRadius: '20px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <i className={`fas fa-${formData.isOpen ? 'check-circle' : 'times-circle'}`}></i>
              {formData.isOpen ? 'OPEN' : 'CLOSED'}
            </div>
            <button
              onClick={handleToggleOpen}
              style={{
                padding: '0.5rem 1.5rem',
                backgroundColor: 'var(--white)',
                color: 'var(--primary)',
                border: 'none',
                borderRadius: '4px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {formData.isOpen ? 'Close Shop' : 'Open Shop'}
            </button>
          </div>
        </div>

        {message.text && (
          <div style={{
            padding: '1rem',
            marginBottom: '1rem',
            borderRadius: '4px',
            backgroundColor: message.type === 'success' ? '#e8f5e9' : '#ffebee',
            color: message.type === 'success' ? '#2e7d32' : '#c62828',
            border: `1px solid ${message.type === 'success' ? '#4caf50' : '#f44336'}`
          }}>
            {message.text}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
          <div style={{ backgroundColor: 'var(--white)', padding: '2rem', borderRadius: '10px', boxShadow: 'var(--shadow)' }}>
            <h2 style={{ color: 'var(--primary-dark)', marginBottom: '1.5rem' }}>Salon Information</h2>
            {!editing ? (
              <div>
                <p><strong>Name:</strong> {salon.name}</p>
                <p><strong>Location:</strong> {salon.location}</p>
                <p><strong>Contact:</strong> {salon.contact}</p>
                <p><strong>Email:</strong> {salon.email}</p>
                <p><strong>Description:</strong> {salon.description || 'No description'}</p>
                <p><strong>Rating:</strong> {salon.rating}/5</p>
                <button
                  onClick={() => setEditing(true)}
                  className="view-btn"
                  style={{ marginTop: '1rem', width: '100%' }}
                >
                  Edit Information
                </button>
              </div>
            ) : (
              <form onSubmit={handleUpdateSalon}>
                <div className="form-group">
                  <label>Salon Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Contact Number *</label>
                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://..."
                  />
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button type="submit" className="booking-btn" style={{ flex: 1 }}>
                    Update Salon
                  </button>
                  <button type="button" onClick={cancelEdit} className="login-btn" style={{ flex: 1 }}>
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          <div style={{ backgroundColor: 'var(--white)', padding: '2rem', borderRadius: '10px', boxShadow: 'var(--shadow)' }}>
            <h2 style={{ color: 'var(--primary-dark)', marginBottom: '1.5rem' }}>Services & Pricing</h2>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Add New Service</h3>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Service Name"
                    value={editingServiceIndex !== null ? newService.name : newService.name}
                    onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    placeholder="Price ($)"
                    min="0"
                    step="0.01"
                    value={editingServiceIndex !== null ? newService.price : newService.price}
                    onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                  />
                </div>
              </div>
              {editingServiceIndex !== null ? (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={handleUpdateService} className="add-service-btn" style={{ flex: 1 }}>
                    Update Service
                  </button>
                  <button onClick={() => { setEditingServiceIndex(null); setNewService({ name: '', price: '' }); }} className="login-btn">
                    Cancel
                  </button>
                </div>
              ) : (
                <button onClick={handleAddService} className="add-service-btn" style={{ width: '100%' }}>
                  <i className="fas fa-plus"></i> Add Service
                </button>
              )}
            </div>

            <div>
              <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Current Services</h3>
              {services.length === 0 ? (
                <p style={{ color: '#666' }}>No services added yet</p>
              ) : (
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {services.map((service, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '1rem',
                      borderBottom: '1px solid var(--gray)',
                      backgroundColor: editingServiceIndex === index ? '#f5f5f5' : 'transparent'
                    }}>
                      <div>
                        <strong>{service.name}</strong>
                        <span style={{ marginLeft: '1rem', color: 'var(--primary)' }}>${service.price}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => handleEditService(index)}
                          style={{
                            padding: '0.3rem 0.8rem',
                            backgroundColor: 'var(--primary-light)',
                            color: 'var(--white)',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() => handleDeleteService(index)}
                          style={{
                            padding: '0.3rem 0.8rem',
                            backgroundColor: 'var(--secondary)',
                            color: 'var(--white)',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {editing && (
          <div style={{ backgroundColor: 'var(--white)', padding: '2rem', borderRadius: '10px', boxShadow: 'var(--shadow)' }}>
            <p style={{ color: '#666', fontStyle: 'italic' }}>
              <i className="fas fa-info-circle"></i> Remember to click "Update Salon" to save all changes including services.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalonDashboard;

