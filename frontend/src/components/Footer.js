import React from 'react';

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="about">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>GlamBook</h3>
            <p>Your one-stop solution for discovering and booking appointments at the best salons in your area. Connecting beauty professionals with clients since 2023.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="#home" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  Home
                </a>
              </li>
              <li>
                <a href="#salons" onClick={(e) => { e.preventDefault(); scrollToSection('salons'); }}>
                  Find Salons
                </a>
              </li>
              <li>
                <a href="#register" onClick={(e) => { e.preventDefault(); scrollToSection('register'); }}>
                  Register Salon
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p><i className="fas fa-envelope"></i> support@glambook.com</p>
            <p><i className="fas fa-phone"></i> +1 (800) 123-4567</p>
            <p><i className="fas fa-map-marker-alt"></i> 123 Beauty Street, Fashion City</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 GlamBook Salon Booking System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

