import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [rentalRequests, setRentalRequests] = useState([]);
  const [bikes, setBikes] = useState([]);
  
  const login = (email, password) => {
    // Mock admin check - replace with actual authentication
    const isAdmin = email === 'admin@example.com';
    setUser({ email, role: isAdmin ? 'admin' : 'user' });
  };

  const signup = async (userData) => {
    try {
      const mockUser = { id: 1, email: userData.email, name: userData.name };
      setUser(mockUser);
      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
  };

  const approveRental = (requestId) => {
    setRentalRequests(prev =>
      prev.map(req =>
        req.id === requestId ? { ...req, status: 'approved' } : req
      )
    );
  };

  const rejectRental = (requestId) => {
    setRentalRequests(prev =>
      prev.map(req =>
        req.id === requestId ? { ...req, status: 'rejected' } : req
      )
    );
  };

  const submitRentalRequest = (request) => {
    setRentalRequests(prev => [...prev, { ...request, id: Date.now(), status: 'pending' }]);
  };

  const addBike = (bikeData) => {
    setBikes(prev => [...prev, { ...bikeData, id: Date.now() }]);
  };

  const value = {
    user,
    login,
    signup,
    logout,
    rentalRequests,
    approveRental,
    rejectRental,
    submitRentalRequest,
    bikes,
    addBike
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};