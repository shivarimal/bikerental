import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/api';
import { useState } from 'react';

const Signup = () => {
  const navigate = useNavigate();
  const { register: formRegister, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'customer'
    }
  });

  // State to handle backend errors
  const [backendErrors, setBackendErrors] = useState({});

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await register({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role
      });

      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      // Reset previous backend errors
      setBackendErrors({});

      // Handle backend error if it exists
      if (error.response && error.response.data) {
        const backendErrorData = error.response.data;

        // Check if the error response is an array or an object
        if (Array.isArray(backendErrorData)) {
          // Loop through the array and set errors for each field
          backendErrorData.forEach((err) => {
            const { path, msg } = err;
            setBackendErrors((prevErrors) => ({
              ...prevErrors,
              [path]: msg
            }));
          });
        } else if (typeof backendErrorData === 'object') {
          // If the error data is an object, directly set errors for each field
          Object.keys(backendErrorData).forEach((key) => {
            setBackendErrors((prevErrors) => ({
              ...prevErrors,
              [key]: backendErrorData[key]
            }));
          });
        }
      } else {
        alert('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                {...formRegister('name', { required: 'Full name is required' })}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
              />
              {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
              {backendErrors.name && <span className="text-red-500 text-xs">{backendErrors.name}</span>}
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                {...formRegister('email', { required: 'Email address is required' })}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
              {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
              {backendErrors.email && <span className="text-red-500 text-xs">{backendErrors.email}</span>}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                {...formRegister('password', { required: 'Password is required' })}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
              {backendErrors.password && <span className="text-red-500 text-xs">{backendErrors.password}</span>}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                {...formRegister('confirmPassword', { required: 'Please confirm your password' })}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword.message}</span>}
              {backendErrors.confirmPassword && <span className="text-red-500 text-xs">{backendErrors.confirmPassword}</span>}
            </div>
            <div>
              <label htmlFor="role" className="sr-only">Role</label>
              <select
                id="role"
                name="role"
                {...formRegister('role')}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
              {backendErrors.role && <span className="text-red-500 text-xs">{backendErrors.role}</span>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
