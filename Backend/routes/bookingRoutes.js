const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Create a booking
router.post('/', bookingController.createBooking);

// Get all bookings
router.get('/', bookingController.getAllBookings);

// Get booking by ID
router.get('/:id', bookingController.getBookingById);

// Get bookings by salon ID
router.get('/salon/:salonId', bookingController.getBookingsBySalon);

// Update booking status
router.put('/:id/status', bookingController.updateBookingStatus);

// Delete booking
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;

