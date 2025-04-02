import React from 'react';
import { useGetUserProfileQuery, useLogoutUserMutation } from '../../features/userApi';
import { useNavigate } from 'react-router-dom'; // Assuming you are using React Router
import { removeUser } from '../../slice/userSlice';
import { useDispatch } from 'react-redux';

function AdminUsers() {
  const { data, error, isLoading } = useGetUserProfileQuery();
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap(); 
      dispatch(removeUser());
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading user data...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error loading user data.</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Current User Profile</h2>
        {data?.data && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 font-semibold">Username:</p>
              <p className="text-gray-800">{data.data.username}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Email:</p>
              <p className="text-gray-800">{data.data.email}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Admin Status:</p>
              <p className="text-gray-800">{data.data.isAdmin ? 'True' : 'False'}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Created At:</p>
              <p className="text-gray-800">{new Date(data.data.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Updated At:</p>
              <p className="text-gray-800">{new Date(data.data.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-8 focus:outline-none focus:shadow-outline"
        >
          Logout / Sign Out
        </button>
      </div>
    </div>
  );
}

export default AdminUsers;