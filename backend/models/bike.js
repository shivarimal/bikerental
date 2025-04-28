const pool = require('../config/database');

class BikeModel {
  static async getAllBikes() {
    const [rows] = await pool.query('SELECT * FROM bikes');
    return rows;
  }

  static async getBikeById(id) {
    const [rows] = await pool.query('SELECT * FROM bikes WHERE id = ?', [id]);
    return rows[0];
  }

  static async createBike(bikeData) {
    const { name, description, price, image_url } = bikeData;
    const [result] = await pool.query(
      'INSERT INTO bikes (name, description, price, image_url) VALUES (?, ?, ?, ?)',
      [name, description, price, image_url]
    );
    return { id: result.insertId, ...bikeData };
  }

  static async updateBikeAvailability(id, available) {
    const [result] = await pool.query(
      'UPDATE bikes SET available = ? WHERE id = ?',
      [available, id]
    );
    return result.affectedRows > 0;
  }
}

module.exports = BikeModel;