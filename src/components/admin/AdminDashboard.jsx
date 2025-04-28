import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import BikeManagement from './BikeManagement';

const AdminDashboard = () => {
  const { rentalRequests, approveRental, rejectRental } = useAuth();
  const [activeTab, setActiveTab] = useState('rentals');

  const handleApproval = (requestId, isApproved) => {
    if (isApproved) {
      approveRental(requestId);
    } else {
      rejectRental(requestId);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('rentals')}
          className={`px-4 py-2 rounded-lg ${activeTab === 'rentals' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Rental Requests
        </button>
        <button
          onClick={() => setActiveTab('bikes')}
          className={`px-4 py-2 rounded-lg ${activeTab === 'bikes' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Manage Bikes
        </button>
      </div>
      {activeTab === 'bikes' ? (
        <BikeManagement />
      ) : (
        <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bike</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rentalRequests.map(request => (
              <tr key={request.id}>
                <td className="px-6 py-4 whitespace-nowrap">{request.userName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{request.bikeName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {request.startDate} to {request.endDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">${request.totalPrice}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${request.status === 'approved' ? 'bg-green-100 text-green-800' :
                      request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'}`}>
                    {request.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {request.status === 'pending' && (
                    <div className="space-x-2">
                      <button
                        onClick={() => handleApproval(request.id, true)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleApproval(request.id, false)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

)
}
 </div>
)};


export default AdminDashboard;