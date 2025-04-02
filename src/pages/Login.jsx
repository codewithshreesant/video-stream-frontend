import React, { useState } from 'react';
import { useLoginUserMutation } from '../../features/userApi';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'; 
import { saveUser } from '../../slice/userSlice'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please enter both email and password.', { position: 'top-right' });
      return;
    }

    try {
      const userData = { email, password };
      const result = await loginUser(userData).unwrap();
      console.log("login ", result);

      toast.success('Login successful!', { position: 'top-right' });
      dispatch(saveUser(result?.data.isUserExist));

      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
      toast.error(`Login failed: ${err?.data?.message || 'Invalid credentials.'}`, {
        position: 'top-right',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-md sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-2xl font-semibold text-gray-700 text-center mb-6">Login</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email Address:
              </label>
              <input
                type="email"
                id="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
            {isError && error?.data?.message && (
              <p className="text-red-500 text-xs italic mt-2">{error?.data?.message}</p>
            )}
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </div>
  );
}

export default Login;