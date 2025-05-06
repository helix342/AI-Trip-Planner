import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { MapPin, LogOut } from 'lucide-react';
import { useAuthStore } from './store/authStore';
import Home from './pages/Home';
import Transport from './pages/Transport';
import Hotels from './pages/Hotels';
import Attractions from './pages/Attractions';
import Food from './pages/Food';
import Booking from './pages/Booking';
import Login from './pages/Login';
import { ChatBot } from './components/ChatBot';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        {isAuthenticated && (
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-6 w-6 text-indigo-600" />
                  <h1 className="text-2xl font-bold text-gray-900">Travel Planner</h1>
                </div>
                <nav className="flex items-center space-x-6">
                  <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium">
                    Home
                  </Link>
                  <Link to="/transport" className="text-gray-600 hover:text-indigo-600 font-medium">
                    Transport
                  </Link>
                  <Link to="/hotels" className="text-gray-600 hover:text-indigo-600 font-medium">
                    Hotels
                  </Link>
                  <Link to="/attractions" className="text-gray-600 hover:text-indigo-600 font-medium">
                    Attractions
                  </Link>
                  <Link to="/food" className="text-gray-600 hover:text-indigo-600 font-medium">
                    Food
                  </Link>
                  <Link to="/booking" className="text-gray-600 hover:text-indigo-600 font-medium">
                    My Bookings
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center space-x-1 text-gray-600 hover:text-red-600"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </nav>
              </div>
            </div>
          </header>
        )}

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/transport"
            element={
              <PrivateRoute>
                <Transport />
              </PrivateRoute>
            }
          />
          <Route
            path="/hotels"
            element={
              <PrivateRoute>
                <Hotels />
              </PrivateRoute>
            }
          />
          <Route
            path="/attractions"
            element={
              <PrivateRoute>
                <Attractions />
              </PrivateRoute>
            }
          />
          <Route
            path="/food"
            element={
              <PrivateRoute>
                <Food />
              </PrivateRoute>
            }
          />
          <Route
            path="/booking"
            element={
              <PrivateRoute>
                <Booking />
              </PrivateRoute>
            }
          />
        </Routes>

        {isAuthenticated && <ChatBot />}
      </div>
    </Router>
  );
}

export default App;