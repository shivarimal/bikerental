import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { fetchBikes } from '../services/api';

const Home = () => {
  const { user } = useAuth();
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBikes = async () => {
      try {
        const data = await fetchBikes();
        setBikes(data.slice(0, 3)); // Get first 3 bikes for display
        setLoading(false);
      } catch (err) {
        setError('Failed to load bikes');
        setLoading(false);
      }
    };
    loadBikes();
  }, []);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900">Welcome to Bike Rental</h2>
        <p className="mt-2 text-gray-600 text-lg">Find and rent the perfect bike for your needs</p>
        <div className="mt-4 space-x-4">
          <Link to="/services" className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700">Our Services</Link>
          <Link to="/contact" className="inline-block bg-white text-indigo-600 px-6 py-2 rounded-md border-2 border-indigo-600 hover:bg-indigo-50">Contact Us</Link>
          {user?.role === 'admin' && (
            <Link to="/admin/bike-management" className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">Manage Bikes</Link>
          )}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading bikes...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bikes.map((bike) => (
            <div key={bike.id} className="bg-white rounded-lg shadow-md p-6">
              <img
                src={bike.imageUrl || 'public/mountainbike.webp'}
                alt={bike.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{bike.name}</h3>
              <p className="text-gray-600 mb-4">{bike.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-indigo-600">${bike.price}/day</span>
                <Link 
                  to="/rental-form" 
                  state={{ selectedBike: bike }}
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  Rent Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;