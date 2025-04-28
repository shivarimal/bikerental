const Rental = require('../models/rental');
const Bike = require('../models/bike');

class RentalController {
  static async createRental(req, res) {
    try {
      const { bike_id, start_date, end_date } = req.body;
      const user_id = req.user.id;

      // Check bike availability
      const isAvailable = await Rental.checkAvailability(bike_id, start_date, end_date);
      if (!isAvailable) {
        return res.status(400).json({ message: 'Bike is not available for selected dates' });
      }

      // Calculate total price
      const bike = await Bike.findById(bike_id);
      if (!bike) {
        return res.status(404).json({ message: 'Bike not found' });
      }

      const days = Math.ceil((new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24));
      const total_price = days * bike.price;

      const rentalId = await Rental.create({
        bike_id,
        user_id,
        start_date,
        end_date,
        total_price
      });

      const rental = await Rental.findById(rentalId);
      res.status(201).json(rental);
    } catch (error) {
      console.error('Create rental error:', error);
      res.status(500).json({ message: 'Error creating rental' });
    }
  }

  static async getRentals(req, res) {
    try {
      const filters = {};
      if (!req.user.role === 'admin') {
        filters.user_id = req.user.id;
      }
      
      const rentals = await Rental.findAll(filters);
      res.json(rentals);
    } catch (error) {
      console.error('Get rentals error:', error);
      res.status(500).json({ message: 'Error fetching rentals' });
    }
  }

  static async getRentalById(req, res) {
    try {
      const rental = await Rental.findById(req.params.id);
      if (!rental) {
        return res.status(404).json({ message: 'Rental not found' });
      }

      if (req.user.role !== 'admin' && rental.user_id !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized' });
      }

      res.json(rental);
    } catch (error) {
      console.error('Get rental error:', error);
      res.status(500).json({ message: 'Error fetching rental' });
    }
  }

  static async updateRentalStatus(req, res) {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized' });
      }

      const { status } = req.body;
      const success = await Rental.updateStatus(req.params.id, status);
      
      if (!success) {
        return res.status(404).json({ message: 'Rental not found' });
      }

      const updatedRental = await Rental.findById(req.params.id);
      res.json(updatedRental);
    } catch (error) {
      console.error('Update rental status error:', error);
      res.status(500).json({ message: 'Error updating rental status' });
    }
  }
}

module.exports = RentalController;