const pool = require('../config/database');

class RentalModel {
  static async createRental(rentalData) {
    const { bike_id, user_id, start_date, end_date, total_price } = rentalData;
    const [result] = await pool.query(
      'INSERT INTO rentals (bike_id, user_id, start_date, end_date, total_price) VALUES (?, ?, ?, ?, ?)',
      [bike_id, user_id, start_date, end_date, total_price]
    );
    return { id: result.insertId, ...rentalData, status: 'pending' };
  }

  static async getAllRentals() {
    const [rows] = await pool.query(`
      SELECT r.*, b.name as bike_name, u.name as user_name 
      FROM rentals r 
      JOIN bikes b ON r.bike_id = b.id 
      JOIN users u ON r.user_id = u.id
    `);
    return rows;
  }

  static async updateRentalStatus(id, status) {
    const [result] = await pool.query(
      'UPDATE rentals SET status = ? WHERE id = ?',
      [status, id]
    );
    return result.affectedRows > 0;
  }

  static async getRentalsByUserId(userId) {
    const [rows] = await pool.query(
      'SELECT * FROM rentals WHERE user_id = ?',
      [userId]
    );
    return rows;
  }
}

module.exports = RentalModel;