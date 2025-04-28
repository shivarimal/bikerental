import axiosInstance from './axiosConfig';

export const fetchBikes = async () => {
  try {
    return await axiosInstance.get('/bikes');
  } catch (error) {
    console.error('Error fetching bikes:', error);
    throw error;
  }
};

export const createRental = async (rentalData) => {
  try {
    return await axiosInstance.post('/rentals', rentalData);
  } catch (error) {
    console.error('Error creating rental:', error);
    throw error;
  }
};

export const updateBikeAvailability = async (bikeId, available) => {
  try {
    return await axiosInstance.patch(`/bikes/${bikeId}/availability`, { available });
  } catch (error) {
    console.error('Error updating bike availability:', error);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    return await axiosInstance.post('/users/login', credentials);
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    return await axiosInstance.post('/users/register', userData);
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};