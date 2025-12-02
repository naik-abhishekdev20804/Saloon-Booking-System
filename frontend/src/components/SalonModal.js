import React, { useState, useEffect } from 'react';
import { useSalonContext } from '../context/SalonContext';
import axios from 'axios';

const SalonModal = () => {
  const { selectedSalon, isModalOpen, closeModal } = useSalonContext();
  const [bookingData, setBookingData] = useState({
    clientName: '',
    clientPhone: '',
    service: '',
    date: '',
    time: ''
  });

  useEffect(() => {
    if (selectedSalon) {
      setBookingData(prev => ({
        ...prev,
        service: ''
      }));
    }
  }, [selectedSalon]);

  useEffect(() => {
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('bookingDate');
    if (dateInput) {
      dateInput.min = today;
    }
  }, [isModalOpen]);

  const handleInputChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedSalon) return;

    try {
      const bookingPayload = {
        salonId: selectedSalon._id || selectedSalon.id,
        clientName: bookingData.clientName,
        clientPhone: bookingData.clientPhone,
        service: bookingData.service,
        date: bookingData.date,
        time: bookingData.time
      };

      await axios.post('http://localhost:5000/api/bookings', bookingPayload);

      const formattedDate = new Date(bookingData.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      alert(`Booking Confirmed!\n\nSalon: ${selectedSalon.name}\nClient: ${bookingData.clientName}\nService: ${bookingData.service}\nDate: ${formattedDate}\nTime: ${bookingData.time}`);

      // Reset form
      setBookingData({
        clientName: '',
        clientPhone: '',
        service: '',
        date: '',
        time: ''
      });

      closeModal();
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to create booking. Please try again.');
    }
  };

  if (!selectedSalon) return null;

  return (
    <div className={`modal ${isModalOpen ? 'show' : ''}`} onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 id="modalSalonName">{selectedSalon.name}</h2>
          <button className="close-modal" onClick={closeModal}>&times;</button>
        </div>
        <div className="modal-body">
          <div className="salon-details">
            <div>
              <h3>Contact Information</h3>
              <p><i className="fas fa-phone"></i> <span id="modalContact">{selectedSalon.contact}</span></p>
              <p><i className="fas fa-map-marker-alt"></i> <span id="modalLocation">{selectedSalon.location}</span></p>
              <p><i className="fas fa-envelope"></i> <span id="modalEmail">{selectedSalon.email}</span></p>
              <p><i className="fas fa-star"></i> Rating: <span id="modalRating">{selectedSalon.rating}</span>/5</p>
              {selectedSalon.description && (
                <p style={{ marginTop: '1rem' }}>{selectedSalon.description}</p>
              )}
              <div className="services-list">
                <h3>Services & Prices</h3>
                <div id="modalServices">
                  {selectedSalon.services.map((service, index) => (
                    <div key={index} className="service-item">
                      <span>{service.name}</span>
                      <span>${service.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h3>Book an Appointment</h3>
              <form className="booking-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="bookingName">Your Name *</label>
                  <input
                    type="text"
                    id="bookingName"
                    name="clientName"
                    value={bookingData.clientName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bookingPhone">Phone Number *</label>
                  <input
                    type="tel"
                    id="bookingPhone"
                    name="clientPhone"
                    value={bookingData.clientPhone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bookingService">Select Service *</label>
                  <select
                    id="bookingService"
                    name="service"
                    value={bookingData.service}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Choose a service</option>
                    {selectedSalon.services.map((service, index) => (
                      <option key={index} value={service.name}>
                        {service.name} - ${service.price}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="bookingDate">Preferred Date *</label>
                  <input
                    type="date"
                    id="bookingDate"
                    name="date"
                    value={bookingData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bookingTime">Preferred Time *</label>
                  <select
                    id="bookingTime"
                    name="time"
                    value={bookingData.time}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select time</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">01:00 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="17:00">05:00 PM</option>
                  </select>
                </div>
                <button type="submit" className="booking-btn">Book Appointment</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonModal;

