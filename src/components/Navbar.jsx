
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '../../features/userApi';
import { MdHome } from "react-icons/md";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('user'); 
  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    try {
      await logoutUser().unwrap();
      navigate('/login'); 
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-700 shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-xl hover:text-gray-200 transition duration-300">
          StreamVerse
        </Link>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link to='/' className="text-white hover:text-gray-200 transition duration-300">
                <MdHome className="w-5 h-5 mr-1 inline-block" />
                Home
              </Link>
              <Link to="/upload" className="text-white hover:text-gray-200 transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-1 inline-block">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.757 1.565A9 9 0 0121.75 16.64l-5.75-5.75m-1.5 1.5L5.25 19.5" />
                </svg>
                Upload
              </Link>
              <Link to="/profile" className="text-white hover:text-gray-200 transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-1 inline-block">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.125a7.5 7.5 0 0114.998-0.125M21.75 18a2.25 2.25 0 00-2.25-2.25h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v-2.25a2.25 2.25 0 00-2.25-2.25H3a2.25 2.25 0 00-2.25 2.25V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18z" />
                </svg>
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-1 inline-block">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v4.5m7.5 3l-3-3m0 0l3-3m-3 3h-1.5m-9 0h2.25M3.75 12h16.5m-16.5 3.75h16.5M3 19.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 19.5v2.25a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 21.75v-2.25z" />
                </svg>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-gray-200 transition duration-300">
                Login
              </Link>
              <Link to="/register" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;