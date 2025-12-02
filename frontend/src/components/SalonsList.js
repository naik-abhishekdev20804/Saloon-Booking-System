import React from 'react';
import { useSalonContext } from '../context/SalonContext';
import SalonCard from './SalonCard';

const SalonsList = () => {
  const { salons, openModal } = useSalonContext();

  const handleViewDetails = (salon) => {
    openModal(salon);
  };

  return (
    <>
      <h2 className="section-title" id="salons">Featured Salons</h2>
      <div className="salons-container">
        {salons.length > 0 ? (
          salons.map((salon) => (
            <SalonCard
              key={salon._id || salon.id}
              salon={salon}
              onViewDetails={handleViewDetails}
            />
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
            <p>No salons found. Be the first to register your salon!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default SalonsList;

