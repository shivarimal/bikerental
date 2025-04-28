import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      title: 'Basic Tune-Up',
      description: 'Includes brake adjustment, gear tuning, and safety check',
      price: '$49.99',
      image: 'https://images.unsplash.com/photo-basictuneup.jpg'
    },
    {
      title: 'Complete Overhaul',
      description: 'Full bike service including deep cleaning and parts replacement',
      price: '$149.99',
      image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=400'
    },
    {
      title: 'Wheel Truing',
      description: 'Professional wheel alignment and spoke tension adjustment',
      price: '$39.99',
      image: 'https://images.unsplash.com/photo-1511994714008-b6d68a8b32a2?auto=format&fit=crop&q=80&w=400'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Our Bike Services</h2>
        <Link to="/admin/bikes" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Manage Bikes
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-indigo-600">{service.price}</span>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;