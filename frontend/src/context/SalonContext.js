import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const SalonContext = createContext();

export const useSalonContext = () => {
  const context = useContext(SalonContext);
  if (!context) {
    throw new Error('useSalonContext must be used within SalonProvider');
  }
  return context;
};

export const SalonProvider = ({ children }) => {
  const [salons, setSalons] = useState([]);
  const [filteredSalons, setFilteredSalons] = useState([]);
  const [selectedSalon, setSelectedSalon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const API_URL = 'http://localhost:5000/api/salons';

  // Fetch salons from API
  useEffect(() => {
    fetchSalons();
  }, []);

  const fetchSalons = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setSalons(response.data);
      setFilteredSalons(response.data);
    } catch (error) {
      console.error('Error fetching salons:', error);
      // If API fails, use sample data
      const sampleSalons = [
        {
          _id: 1,
          name: "Luxe Beauty Salon",
          location: "New York, NY",
          contact: "+1 (212) 555-1234",
          email: "info@luxebeauty.com",
          rating: 4.8,
          image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          services: [
            { name: "Haircut", price: 45 },
            { name: "Hair Coloring", price: 120 },
            { name: "Manicure", price: 35 },
            { name: "Pedicure", price: 45 },
            { name: "Facial", price: 80 }
          ]
        },
        {
          _id: 2,
          name: "Urban Cuts Barbershop",
          location: "Brooklyn, NY",
          contact: "+1 (718) 555-9876",
          email: "bookings@urbancuts.com",
          rating: 4.5,
          image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          services: [
            { name: "Men's Haircut", price: 30 },
            { name: "Beard Trim", price: 20 },
            { name: "Haircut & Beard", price: 45 },
            { name: "Hot Towel Shave", price: 25 }
          ]
        },
        {
          _id: 3,
          name: "Bliss Spa & Salon",
          location: "Manhattan, NY",
          contact: "+1 (646) 555-4567",
          email: "bliss@blissspa.com",
          rating: 4.9,
          image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          services: [
            { name: "Massage Therapy", price: 100 },
            { name: "Full Body Spa", price: 180 },
            { name: "Aromatherapy", price: 75 },
            { name: "Skin Treatment", price: 120 }
          ]
        },
        {
          _id: 4,
          name: "Style & Grace Salon",
          location: "Queens, NY",
          contact: "+1 (347) 555-2345",
          email: "stylegrace@salon.com",
          rating: 4.7,
          image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          services: [
            { name: "Bridal Makeup", price: 150 },
            { name: "Hair Styling", price: 60 },
            { name: "Makeup Application", price: 50 },
            { name: "Eyebrow Shaping", price: 25 }
          ]
        }
      ];
      setSalons(sampleSalons);
      setFilteredSalons(sampleSalons);
    } finally {
      setLoading(false);
    }
  };

  const performSearch = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredSalons(salons);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/search`, {
        params: { query: searchTerm }
      });
      setFilteredSalons(response.data);
    } catch (error) {
      console.error('Search error:', error);
      // Fallback to client-side search
      const filtered = salons.filter(salon => {
        const term = searchTerm.toLowerCase();
        return (
          salon.name.toLowerCase().includes(term) ||
          salon.location.toLowerCase().includes(term) ||
          salon.services.some(service => service.name.toLowerCase().includes(term))
        );
      });
      setFilteredSalons(filtered);
    }
  };

  const addSalon = (newSalon) => {
    setSalons([...salons, newSalon]);
    setFilteredSalons([...filteredSalons, newSalon]);
  };

  const openModal = (salon) => {
    setSelectedSalon(salon);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSalon(null);
  };

  const value = {
    salons: filteredSalons,
    selectedSalon,
    isModalOpen,
    loading,
    performSearch,
    addSalon,
    openModal,
    closeModal,
    fetchSalons
  };

  return (
    <SalonContext.Provider value={value}>
      {children}
    </SalonContext.Provider>
  );
};

