import React from 'react';

const SalonCard = ({ salon, onViewDetails }) => {
  return (
    <div className="salon-card">
      <div className="salon-img" style={{ backgroundImage: `url('${salon.image}')` }}>
        <div className="salon-rating">
          <i className="fas fa-star"></i> {salon.rating}
        </div>
      </div>
      <div className="salon-info">
        <h3 className="salon-name">{salon.name}</h3>
        <p className="salon-location">
          <i className="fas fa-map-marker-alt"></i> {salon.location}
        </p>
        <div className="salon-services">
          {salon.services.slice(0, 3).map((service, index) => (
            <span key={index} className="service-tag">{service.name}</span>
          ))}
          {salon.services.length > 3 && (
            <span className="service-tag">+{salon.services.length - 3} more</span>
          )}
        </div>
        <div className="salon-footer">
          <div className="salon-contact">
            <i className="fas fa-phone"></i> {salon.contact}
          </div>
          <button className="view-btn" onClick={() => onViewDetails(salon)}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalonCard;

