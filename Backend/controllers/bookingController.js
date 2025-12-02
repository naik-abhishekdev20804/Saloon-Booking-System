const Booking = require('../models/Booking');
const Salon = require('../models/Salon');

// Create a booking
exports.createBooking = async (req, res) => {
  try {
    const { salonId, clientName, clientPhone, service, date, time } = req.body;

    // Validate required fields
    if (!salonId || !clientName || !clientPhone || !service || !date || !time) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if salon exists
    const salon = await Salon.findById(salonId);
    if (!salon) {
      return res.status(404).json({ message: 'Salon not found' });
    }

    // Create booking
    const booking = new Booking({
      salonId,
      salonName: salon.name,
      clientName,
      clientPhone,
      service,
      date: new Date(date),
      time,
      status: 'pending'
    });

    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('salonId').sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('salonId');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get bookings by salon ID
exports.getBookingsBySalon = async (req, res) => {
  try {
    const bookings = await Booking.find({ salonId: req.params.salonId }).sort({ date: 1, time: 1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete booking
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

