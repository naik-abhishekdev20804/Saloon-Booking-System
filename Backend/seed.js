const mongoose = require('mongoose');
const Salon = require('./models/Salon');
const dotenv = require('dotenv');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/salon-booking';

const sampleSalons = [
  {
    name: "Luxe Beauty Salon",
    location: "New York, NY",
    contact: "+1 (212) 555-1234",
    email: "info@luxebeauty.com",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Premium beauty salon offering top-notch services in the heart of New York.",
    services: [
      { name: "Haircut", price: 45 },
      { name: "Hair Coloring", price: 120 },
      { name: "Manicure", price: 35 },
      { name: "Pedicure", price: 45 },
      { name: "Facial", price: 80 }
    ]
  },
  {
    name: "Urban Cuts Barbershop",
    location: "Brooklyn, NY",
    contact: "+1 (718) 555-9876",
    email: "bookings@urbancuts.com",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Modern barbershop specializing in men's grooming and styling.",
    services: [
      { name: "Men's Haircut", price: 30 },
      { name: "Beard Trim", price: 20 },
      { name: "Haircut & Beard", price: 45 },
      { name: "Hot Towel Shave", price: 25 }
    ]
  },
  {
    name: "Bliss Spa & Salon",
    location: "Manhattan, NY",
    contact: "+1 (646) 555-4567",
    email: "bliss@blissspa.com",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Luxurious spa and salon providing relaxation and beauty treatments.",
    services: [
      { name: "Massage Therapy", price: 100 },
      { name: "Full Body Spa", price: 180 },
      { name: "Aromatherapy", price: 75 },
      { name: "Skin Treatment", price: 120 }
    ]
  },
  {
    name: "Style & Grace Salon",
    location: "Queens, NY",
    contact: "+1 (347) 555-2345",
    email: "stylegrace@salon.com",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Elegant salon offering bridal and special occasion makeup and styling.",
    services: [
      { name: "Bridal Makeup", price: 150 },
      { name: "Hair Styling", price: 60 },
      { name: "Makeup Application", price: 50 },
      { name: "Eyebrow Shaping", price: 25 }
    ]
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing salons
    await Salon.deleteMany({});
    console.log('Cleared existing salons');

    // Insert sample salons
    await Salon.insertMany(sampleSalons);
    console.log('Sample salons inserted successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

