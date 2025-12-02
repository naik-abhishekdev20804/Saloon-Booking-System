import React from 'react';
import { useAuth } from './context/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import SalonsList from './components/SalonsList';
import SalonRegistration from './components/SalonRegistration';
import SalonModal from './components/SalonModal';
import SalonDashboard from './components/SalonDashboard';
import Footer from './components/Footer';
import './App.css';

function App() {
  const { user, isAuthenticated } = useAuth();

  // Show dashboard for salon owners
  if (isAuthenticated && user?.userType === 'salon') {
    return (
      <div className="App">
        <Header />
        <SalonDashboard />
        <Footer />
      </div>
    );
  }

  // Show main page for regular users or guests
  return (
    <div className="App">
      <Header />
      <Hero />
      <main className="container">
        <SalonsList />
        {!isAuthenticated && <SalonRegistration />}
      </main>
      <SalonModal />
      <Footer />
    </div>
  );
}

export default App;
