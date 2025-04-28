const express = require('express');
const { auth, isAdmin } = require('../middleware/auth');
const { validate, userValidationRules, bikeValidationRules, rentalValidationRules } = require('../middleware/validate');
const UserController = require('../controllers/userController');
const BikeController = require('../controllers/bikeController');
const RentalController = require('../controllers/rentalController');

const router = express.Router();
router.get('/', (req, res) => {
  res.send('Welcome to the Bike Rental API!');
});
// User routes
router.post('/users/register', validate(userValidationRules()), UserController.register);
router.post('/auth/login', validate(userValidationRules()), UserController.login);
router.get('/users/profile', auth, UserController.getProfile);
router.patch('/users/profile', auth, validate(userValidationRules()), UserController.updateProfile);

// Bike routes
router.post('/bikes', auth, isAdmin, validate(bikeValidationRules()), BikeController.createBike);
router.get('/bikes', BikeController.getAllBikes);
router.get('/bikes/:id', BikeController.getBikeById);
router.patch('/bikes/:id', auth, isAdmin, validate(bikeValidationRules()), BikeController.updateBike);
router.delete('/bikes/:id', auth, isAdmin, BikeController.deleteBike);

// Rental routes
router.post('/rentals', auth, validate(rentalValidationRules()), RentalController.createRental);
router.get('/rentals', auth, RentalController.getRentals);
router.get('/rentals/:id', auth, RentalController.getRentalById);
router.patch('/rentals/:id/status', auth, isAdmin, RentalController.updateRentalStatus);

module.exports = router;