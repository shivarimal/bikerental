import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchBikes } from '../services/api';

const BikeList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedBike, setSelectedBike] = useState(null);
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBikes = async () => {
      try {
        const data = await fetchBikes();
        setBikes(data);
      } catch (err) {
        setError('Failed to load bikes');
      } finally {
        setLoading(false);
      }
    };
    loadBikes();
  }, []);

  if (loading) return <div className="container mx-auto py-8 text-center">Loading bikes...</div>;
  if (error) return <div className="container mx-auto py-8 text-center text-red-600">{error}</div>;

  const availableBikes = bikes || [
    { id: 1, name: 'Mountain Bike', price: 25, image: 'https://via.placeholder.com/150', available: true },
    { id: 2, name: 'Road Bike', price: 30, image: 'https://via.placeholder.com/150', available: true },
    { id: 3, name: 'City Bike', price: 20, image: 'https://via.placeholder.com/150', available: false },
  ];

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6">Available Bikes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bikes.map((bike) => (
          <div key={bike.id} className="border rounded-lg p-4 shadow-md">
            <img src={bike.image} alt={bike.name} className="w-full h-48 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold mb-2">{bike.name}</h3>
            <p className="text-gray-600 mb-2">${bike.price} per day</p>
            <p className={`text-sm ${bike.available ? 'text-green-600' : 'text-red-600'} mb-4`}>
              {bike.available ? 'Available' : 'Currently Rented'}
            </p>
            <button
              className={`w-full py-2 px-4 rounded ${bike.available
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              disabled={!bike.available}
              onClick={() => {
                setSelectedBike(bike);
                navigate('/rental-form', { state: { selectedBike: bike } });
              }}
            >
              {bike.available ? 'Rent Now' : 'Not Available'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BikeList;