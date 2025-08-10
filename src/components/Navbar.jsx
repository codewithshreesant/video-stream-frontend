// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useLogoutUserMutation } from '../../features/userApi';
// import { MdHome, MdMenu, MdClose } from "react-icons/md";

// function Navbar() {
//     const navigate = useNavigate();
//     const isLoggedIn = !!localStorage.getItem('user');
//     const [logoutUser] = useLogoutUserMutation();
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//     const toggleMobileMenu = () => {
//         setIsMobileMenuOpen(!isMobileMenuOpen);
//     };

//     const closeMobileMenu = () => {
//         setIsMobileMenuOpen(false);
//     };

//     const handleLogout = async () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         try {
//             await logoutUser().unwrap();
//             navigate('/login');
//         } catch (error) {
//             console.error('Logout failed:', error);
//         } finally {
//             closeMobileMenu();
//         }
//     };

//     return (
//         <nav className="bg-gradient-to-r from-blue-600 to-purple-700 shadow-md py-4 relative">
//             <div className="container mx-auto px-4 flex justify-between items-center">
//                 <Link to="/" className="text-white font-bold text-xl hover:text-gray-200 transition duration-300">
//                     StreamVerse
//                 </Link>

//                 {/* Mobile Menu Button */}
//                 <button
//                     onClick={toggleMobileMenu}
//                     className="text-white text-2xl focus:outline-none lg:hidden"
//                     aria-label="Toggle Menu"
//                 >
//                     {isMobileMenuOpen ? <MdClose /> : <MdMenu />}
//                 </button>

//                 {/* Desktop Menu */}
//                 <div className="hidden lg:flex items-center space-x-4">
//                     {isLoggedIn ? (
//                         <>
//                             <Link to='/' className="text-white hover:text-gray-200 transition duration-300">
//                                 <MdHome className="w-5 h-5 mr-1 inline-block" />
//                                 Home
//                             </Link>
//                             <Link to="/upload" className="text-white hover:text-gray-200 transition duration-300">
//                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-1 inline-block">
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.757 1.565A9 9 0 0121.75 16.64l-5.75-5.75m-1.5 1.5L5.25 19.5" />
//                                 </svg>
//                                 Upload
//                             </Link>
//                             <Link to="/profile" className="text-white hover:text-gray-200 transition duration-300">
//                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-1 inline-block">
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.125a7.5 7.5 0 0114.998-0.125M21.75 18a2.25 2.25 0 00-2.25-2.25h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v-2.25a2.25 2.25 0 00-2.25-2.25H3a2.25 2.25 0 00-2.25 2.25V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18z" />
//                                 </svg>
//                                 Profile
//                             </Link>
//                             <button
//                                 onClick={handleLogout}
//                                 className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300"
//                             >
//                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-1 inline-block">
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v4.5m7.5 3l-3-3m0 0l3-3m-3 3h-1.5m-9 0h2.25M3.75 12h16.5m-16.5 3.75h16.5M3 19.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 19.5v2.25a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 21.75v-2.25z" />
//                                 </svg>
//                                 Logout
//                             </button>
//                         </>
//                     ) : (
//                         <>
//                             <Link to="/login" className="text-white hover:text-gray-200 transition duration-300">
//                                 Login
//                             </Link>
//                             <Link to="/register" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300">
//                                 Register
//                             </Link>
//                         </>
//                     )}
//                 </div>
//             </div>

//             {/* Mobile Menu */}
//             {isMobileMenuOpen && (
//                 <div className="lg:hidden absolute top-full left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-700 shadow-md z-10">
//                     <div className="px-4 py-4 flex flex-col space-y-3">
//                         {isLoggedIn ? (
//                             <>
//                                 <Link to='/' onClick={closeMobileMenu} className="text-white hover:text-gray-200 transition duration-300 block py-2">
//                                     <MdHome className="w-5 h-5 mr-1 inline-block" />
//                                     Home
//                                 </Link>
//                                 <Link to="/upload" onClick={closeMobileMenu} className="text-white hover:text-gray-200 transition duration-300 block py-2">
//                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-1 inline-block">
//                                         <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.757 1.565A9 9 0 0121.75 16.64l-5.75-5.75m-1.5 1.5L5.25 19.5" />
//                                     </svg>
//                                     Upload
//                                 </Link>
//                                 <Link to="/profile" onClick={closeMobileMenu} className="text-white hover:text-gray-200 transition duration-300 block py-2">
//                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-1 inline-block">
//                                         <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.125a7.5 7.5 0 0114.998-0.125M21.75 18a2.25 2.25 0 00-2.25-2.25h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v-2.25a2.25 2.25 0 00-2.25-2.25H3a2.25 2.25 0 00-2.25 2.25V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18z" />
//                                     </svg>
//                                     Profile
//                                 </Link>
//                                 <button
//                                     onClick={handleLogout}
//                                     className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 block"
//                                 >
//                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-1 inline-block">
//                                         <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v4.5m7.5 3l-3-3m0 0l3-3m-3 3h-1.5m-9 0h2.25M3.75 12h16.5m-16.5 3.75h16.5M3 19.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 19.5v2.25a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 21.75v-2.25z" />
//                                     </svg>
//                                     Logout
//                                 </button>
//                             </>
//                         ) : (
//                             <>
//                                 <Link to="/login" onClick={closeMobileMenu} className="text-white hover:text-gray-200 transition duration-300 block py-2">
//                                     Login
//                                 </Link>
//                                 <Link to="/register" onClick={closeMobileMenu} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 block">
//                                     Register
//                                 </Link>
//                             </>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </nav>
//     );
// }

// export default Navbar;


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '../../features/userApi';
import { MdHome, MdMenu, MdClose, MdVideoCall, MdAccountCircle } from 'react-icons/md';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('user');
  const [logoutUser] = useLogoutUserMutation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
      toast.success('Logged out successfully!');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed. Please try again.');
    } finally {
      closeMobileMenu();
    }
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Branding */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-xl font-bold text-white tracking-wide">StreamVerse</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center"
            >
              <MdHome className="mr-1 h-5 w-5" />
              Home
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  to="/upload"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center"
                >
                  <MdVideoCall className="mr-1 h-5 w-5" />
                  Upload
                </Link>
                <Link
                  to="/profile"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center"
                >
                  <MdAccountCircle className="mr-1 h-5 w-5" />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white p-2 rounded-md"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <MdClose className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <MdMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-16 inset-x-0 bg-gray-900 shadow-lg border-t border-gray-800 z-40">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300"
            >
              <MdHome className="mr-2 inline-block h-5 w-5" />
              Home
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  to="/upload"
                  onClick={closeMobileMenu}
                  className="text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300"
                >
                  <MdVideoCall className="mr-2 inline-block h-5 w-5" />
                  Upload
                </Link>
                <Link
                  to="/profile"
                  onClick={closeMobileMenu}
                  className="text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300"
                >
                  <MdAccountCircle className="mr-2 inline-block h-5 w-5" />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                  className="text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;