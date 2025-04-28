const Bike = require('../models/bike');

class BikeController {
  static async createBike(req, res) {
    try {
      const { name, description, price, image_url } = req.body;
      const bikeId = await Bike.create({ name, description, price, image_url });
      const bike = await Bike.findById(bikeId);
      res.status(201).json(bike);
    } catch (error) {
      console.error('Create bike error:', error);
      res.status(500).json({ message: 'Error creating bike' });
    }
  }

  static async getAllBikes(req, res) {
    try {
      const filters = {};
      if (req.query.available) {
        filters.available = req.query.available === 'true';
      }
      
      const bikes = await Bike.findAll(filters);
      res.json(bikes);
    } catch (error) {
      console.error('Get bikes error:', error);
      res.status(500).json({ message: 'Error fetching bikes' });
    }
  }

  static async getBikeById(req, res) {
    try {
      const bike = await Bike.findById(req.params.id);
      if (!bike) {
        return res.status(404).json({ message: 'Bike not found' });
      }
      res.json(bike);
    } catch (error) {
      console.error('Get bike error:', error);
      res.status(500).json({ message: 'Error fetching bike' });
    }
  }

  static async updateBike(req, res) {
    try {
      const updates = req.body;
      const success = await Bike.update(req.params.id, updates);
      
      if (!success) {
        return res.status(400).json({ message: 'No valid updates provided' });
      }

      const updatedBike = await Bike.findById(req.params.id);
      res.json(updatedBike);
    } catch (error) {
      console.error('Update bike error:', error);
      res.status(500).json({ message: 'Error updating bike' });
    }
  }

  static async deleteBike(req, res) {
    try {
      const success = await Bike.delete(req.params.id);
      if (!success) {
        return res.status(404).json({ message: 'Bike not found' });
      }
      res.status(204).send();
    } catch (error) {
      console.error('Delete bike error:', error);
      res.status(500).json({ message: 'Error deleting bike' });
    }
  }
}

module.exports = BikeController;