const { response } = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

class UserController {
    static async register(req, res) {
        console.log('Registration request:');
      try {
      const { name, email, password } = req.body;
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      const userId = await User.create({ name, email, password });
      const user = await User.findById(userId);
      
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(201).json({ user: { id: user.id, name, email, role: user.role }, token });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Error registering user' });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isValidPassword = await User.validatePassword(user, password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({ user: { id: user.id, name: user.name, email, role: user.role }, token });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Error logging in' });
    }
  }

  static async getProfile(req, res) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json({ 
        user: { 
          id: user.id, 
          name: user.name, 
          email: user.email, 
          role: user.role 
        } 
      });
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({ message: 'Error fetching profile' });
    }
  }

  static async updateProfile(req, res) {
    try {
      const updates = req.body;
      const success = await User.update(req.user.id, updates);
      
      if (!success) {
        return res.status(400).json({ message: 'No valid updates provided' });
      }

      const updatedUser = await User.findById(req.user.id);
      res.json({ 
        user: { 
          id: updatedUser.id, 
          name: updatedUser.name, 
          email: updatedUser.email, 
          role: updatedUser.role 
        } 
      });
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({ message: 'Error updating profile' });
    }
  }
}

module.exports = UserController;