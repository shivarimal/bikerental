import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Header from './components/Header'
import Home from './components/Home'
import Services from './components/Services'
import Contact from './components/Contact'
import './App.css'
import RentalForm from './components/RentalForm'
import AdminDashboard from './components/admin/AdminDashboard'
import BikeManagement from './components/admin/BikeManagement'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/rental-form" element={<RentalForm />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/bikes" element={<BikeManagement />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
