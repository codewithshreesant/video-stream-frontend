import React, { useState } from 'react';

function AdminSettings() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      setError('Please fill in all password fields.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError('New passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/admin/update-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      } else {
        setError(data.message || 'Failed to update password.');
      }
    } catch (err) {
      console.error('Error updating password:', err);
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Admin Settings</h2>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Update Password</h3>
        {message && <div className="bg-green-200 text-green-800 py-2 px-4 rounded mb-4">{message}</div>}
        {error && <div className="bg-red-200 text-red-800 py-2 px-4 rounded mb-4">{error}</div>}
        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <div>
            <label htmlFor="oldPassword" className="block text-gray-700 text-sm font-bold mb-2">
              Old Password:
            </label>
            <input
              type="password"
              id="oldPassword"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-gray-700 text-sm font-bold mb-2">
              New Password:
            </label>
            <input
              type="password"
              id="newPassword"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="confirmNewPassword" className="block text-gray-700 text-sm font-bold mb-2">
              Confirm New Password:
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminSettings;