import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createRental, updateBikeAvailability } from '../services/api';

const RentalForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const selectedBike = location.state?.selectedBike;

  // useEffect(() => {
  //   if (!selectedBike) {
  //     navigate('/');
  //     return;
  //   }
  // }, [selectedBike, navigate]);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    startDate: '',
    endDate: '',
    bikeId: selectedBike?.id,
    bikeName: selectedBike?.name,
    pricePerDay: selectedBike?.price
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Calculate total price
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      const totalPrice = days * formData.pricePerDay;

      // Create rental request
      const rentalData = {
        bikeId: formData.bikeId,
        userId: user?.id,
        startDate: formData.startDate,
        endDate: formData.endDate,
        totalPrice
      };

      // Submit rental request
      await createRental(rentalData);
      
      // Update bike availability
      await updateBikeAvailability(formData.bikeId, false);

      // Show confirmation message
      alert('Your rental request has been submitted and is pending admin approval.');
      navigate('/');
    } catch (error) {
      console.error('Error submitting rental:', error);
      alert('Failed to submit rental request. Please try again.');
    }

  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6">Rent {selectedBike?.name}</h2>
      <p className="text-lg text-gray-600 mb-6">Price per day: ${selectedBike?.price}</p>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="startDate" className="block text-gray-700 mb-2">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="endDate" className="block text-gray-700 mb-2">End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Submit Rental Request
        </button>
      </form>
    </div>
  );
};

export default RentalForm;