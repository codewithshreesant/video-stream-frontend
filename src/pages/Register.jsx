import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../../features/userApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      toast.error('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    try {
      const response = await registerUser({ username, email, password });
      if (response?.data?.success) {
        toast.success('Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else if (response?.error?.data?.error) {
        toast.error(response.error.data.error);
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An unexpected error occurred.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 via-gray-300 to-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-2xl font-semibold text-gray-700 text-center mb-8">
            <span className="text-purple-600">Create</span> Your Account
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="mt-1 block w-full **px-4 py-3** border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full **px-4 py-3** border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full **px-4 py-3** border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="mt-1 block w-full **px-4 py-3** border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Register'}
              </button>
            </div>
            <p className="text-center text-sm text-gray-600">
              Already have an account? <a href="/login" className="text-indigo-500 hover:underline">Log in</a>
            </p>
          </form>
        </div>
      </div>
      <div className="text-center text-gray-500 text-xs mt-4">
        &copy; {new Date().getFullYear()} Your Awesome App. All rights reserved.
      </div>
    </div>
  );
}

export default Register;