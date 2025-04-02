
import React from 'react';
import { useGetUserProfileQuery } from '../../features/userApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserVideo from '../components/UserVideo';

function Profile() {

  const navigate = useNavigate();
  let token = localStorage.getItem('user');
  console.log(" token ", token);
  token = JSON.parse(token);
  const user = token[0];
  if (!token) {
    navigate('/login'); 
    return null;
  }


  return (   
    <div className="container mx-auto p-8 dark:bg-gray-900 text-white">
      <div className="bg-gray-800 shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-semibold text-gray-300 mb-6">Your Profile</h2>
        <div className="mb-4">
          <label className="block text-gray-500 text-sm font-bold mb-2">Username:</label>
          <p className="text-gray-400">{user.username}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 text-sm font-bold mb-2">Email:</label>
          <p className="text-gray-400">{user.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 text-sm font-bold mb-2">Account Created At:</label>
          <p className="text-gray-400">{new Date(user.createdAt).toLocaleDateString()} {new Date(user.createdAt).toLocaleTimeString()}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 text-sm font-bold mb-2">Last Updated At:</label>
          <p className="text-gray-400">{new Date(user.updatedAt).toLocaleDateString()} {new Date(user.updatedAt).toLocaleTimeString()}</p>
        </div>
        {user?.isAdmin && (
          <div className="mb-4">
            <label className="block text-gray-500 text-sm font-bold mb-2">Role:</label>
            <p className="text-blue-400 font-semibold">Administrator</p>
          </div>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-300 mb-4">Your Uploaded Videos</h2>
        <UserVideo />
      </div>
    </div>
  );
}

export default Profile;