const Salon = require('../models/Salon');

// Get all salons
exports.getAllSalons = async (req, res) => {
  try {
    const salons = await Salon.find().sort({ createdAt: -1 });
    res.json(salons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get salon by ID
exports.getSalonById = async (req, res) => {
  try {
    const salon = await Salon.findById(req.params.id);
    if (!salon) {
      return res.status(404).json({ message: 'Salon not found' });
    }
    res.json(salon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search salons
exports.searchSalons = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      const salons = await Salon.find();
      return res.json(salons);
    }

    const searchRegex = new RegExp(query, 'i');
    
    const salons = await Salon.find({
      $or: [
        { name: searchRegex },
        { location: searchRegex },
        { 'services.name': searchRegex }
      ]
    });

    res.json(salons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new salon
exports.createSalon = async (req, res) => {
  try {
    const { name, location, contact, email, description, services, image } = req.body;

    // Validate required fields
    if (!name || !location || !contact || !email || !services || services.length === 0) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const salon = new Salon({
      name,
      location,
      contact,
      email,
      description,
      services,
      image: image || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      rating: 4.0
    });

    const savedSalon = await salon.save();
    res.status(201).json(savedSalon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update salon
exports.updateSalon = async (req, res) => {
  try {
    const salon = await Salon.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!salon) {
      return res.status(404).json({ message: 'Salon not found' });
    }

    res.json(salon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get salon by owner ID
exports.getSalonByOwner = async (req, res) => {
  try {
    const salon = await Salon.findById(req.params.salonId);
    if (!salon) {
      return res.status(404).json({ message: 'Salon not found' });
    }
    res.json(salon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete salon
exports.deleteSalon = async (req, res) => {
  try {
    const salon = await Salon.findByIdAndDelete(req.params.id);
    
    if (!salon) {
      return res.status(404).json({ message: 'Salon not found' });
    }

    res.json({ message: 'Salon deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

