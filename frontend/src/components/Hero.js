import React, { useState } from 'react';
import { useSalonContext } from '../context/SalonContext';

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { performSearch } = useSalonContext();

  const handleSearch = () => {
    performSearch(searchTerm);
    // Scroll to salons section
    const element = document.getElementById('salons');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-container">
          <h1>Find & Book the Best Salons Near You</h1>
          <p>Discover top-rated salons, compare services and prices, and book appointments instantly. For salon owners, register your business to reach more customers.</p>
          <div className="search-box">
            <input
              type="text"
              id="searchInput"
              placeholder="Search for salons, services, or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button id="searchBtn" onClick={handleSearch}>
              <i className="fas fa-search"></i> Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

