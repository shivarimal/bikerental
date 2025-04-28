const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async create({ name, email, password, role = 'user' }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [users] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return users[0];
  }

  static async findById(id) {
    const [users] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    return users[0];
  }

  static async validatePassword(user, password) {
    return bcrypt.compare(password, user.password);
  }

  static async update(id, updates) {
    const allowedUpdates = ['name', 'email'];
    const updateFields = Object.keys(updates)
      .filter(key => allowedUpdates.includes(key))
      .map(key => `${key} = ?`);
    
    if (updateFields.length === 0) return false;
    
    const values = updateFields.map(field => updates[field.split(' = ')[0]]);
    values.push(id);

    const [result] = await pool.execute(
      `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`,
      values
    );
    return result.affectedRows > 0;
  }
}

module.exports = User;