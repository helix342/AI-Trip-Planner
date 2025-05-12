import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Eye, EyeOff, MapPin } from 'lucide-react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  // const { login, signup } = useAuthStore();

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError('');

  //   if (!isLogin && password !== confirmPassword) {
  //     setError('Passwords do not match');
  //     return;
  //   }

  const handleLogin = async () => {
    const user = { email, password };

    try {
      const res = await axios.post('http://localhost:3000/expense/login', user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      alert('Login successful');
      navigate('/index');
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      alert('Login failed: ' + (error.response?.data?.message || 'Invalid credentials'));
    }
  };

  async function register(){
    const user = {name,email,pass};
    try {
      const res = await axios.post('http://localhost:3000/expense/register', user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      alert('registered successful:', res);
      navigate('/');
    } catch (error) {
      console.error('register failed:', error.response?.data || error.message);
    }
  };

  //   if (isLogin) {
  //     if (login(email, password)) {
  //       navigate('/');
  //     } else {
  //       setError('Invalid credentials. Try username: user, password: user');
  //     }
  //   } else {
  //     if (signup(email, password)) {
  //       navigate('/');
  //     } else {
  //       setError('Username already exists');
  //     }
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2">
            <MapPin className="h-8 w-8 text-indigo-600" />
            <h2 className="text-3xl font-extrabold text-gray-900">
              Trip Planner.AI
            </h2>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Plan your perfect trip across India with AI assistance
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              isLogin
                ? 'bg-indigo-600 text-white'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              !isLogin
                ? 'bg-indigo-600 text-white'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Sign Up
          </button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                  />
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};