const express = require('express');
const router = express.Router();
const salonController = require('../controllers/salonController');

// Get all salons
router.get('/', salonController.getAllSalons);

// Search salons
router.get('/search', salonController.searchSalons);

// Get salon by owner
router.get('/owner/:salonId', salonController.getSalonByOwner);

// Get salon by ID
router.get('/:id', salonController.getSalonById);

// Create new salon
router.post('/', salonController.createSalon);

// Update salon
router.put('/:id', salonController.updateSalon);

// Delete salon
router.delete('/:id', salonController.deleteSalon);

module.exports = router;

