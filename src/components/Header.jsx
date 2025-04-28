import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-3xl font-bold text-gray-900">Bike Rental</Link>
          <nav className="hidden md:flex space-x-4">
            <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <Link to="/services" className="text-gray-600 hover:text-gray-900">Services</Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
            {user?.role === 'admin' && (
              <Link to="/admin" className="text-indigo-600 hover:text-indigo-900">Admin Dashboard</Link>
            )}
          </nav>
        </div>
        <nav>
          <div className="space-x-4">
            {user ? (
              <button
                onClick={logout}
                className="text-indigo-600 hover:text-indigo-900"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="text-indigo-600 hover:text-indigo-900">Login</Link>
                <Link to="/signup" className="text-indigo-600 hover:text-indigo-900">Sign up</Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;