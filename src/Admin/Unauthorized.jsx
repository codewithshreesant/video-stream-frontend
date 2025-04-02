import React from 'react';
import { Link } from 'react-router-dom';

function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-sans">
      <h1 className="text-4xl text-red-600 mb-5">Unauthorized Access</h1>
      <p className="text-lg text-gray-600 mb-4 text-center">
        Sorry, you do not have permission to view this page.
      </p>
      <p className="text-md text-gray-700 text-center">
        Please <Link to="/" className="text-blue-500 hover:underline font-semibold">return to the homepage</Link> or contact an administrator if you believe this is an error.
      </p>
    </div>
  );
}

export default UnauthorizedPage;