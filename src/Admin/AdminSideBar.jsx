import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  FaUsers,
  FaVideo,
  FaCommentDots,
  FaHeart,
  FaCog,
  FaHome,
} from 'react-icons/fa';

function AdminSideBar() {
  return (
    <div className="bg-gray-800 text-white h-screen sticky top-0 w-64 flex flex-col shadow-md">
      <div className="p-4 flex items-center justify-center">
        <Link to="/admin/dashboard" className="text-lg font-semibold">
          Admin Panel
        </Link>
      </div>
      <nav className="flex-grow p-4">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-md hover:bg-gray-700 ${
                  isActive ? 'bg-gray-700 font-semibold' : ''
                }`
              }
            >
              <FaHome className="mr-2" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/dashboard/users"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-md hover:bg-gray-700 ${
                  isActive ? 'bg-gray-700 font-semibold' : ''
                }`
              }
            >
              <FaUsers className="mr-2" />
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/dashboard/videos"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-md hover:bg-gray-700 ${
                  isActive ? 'bg-gray-700 font-semibold' : ''
                }`
              }
            >
              <FaVideo className="mr-2" />
              Videos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/dashboard/comments"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-md hover:bg-gray-700 ${
                  isActive ? 'bg-gray-700 font-semibold' : ''
                }`
              }
            >
              <FaCommentDots className="mr-2" />
              Comments
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/dashboard/reactions"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-md hover:bg-gray-700 ${
                  isActive ? 'bg-gray-700 font-semibold' : ''
                }`
              }
            >
              <FaHeart className="mr-2" />
              Reactions
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/dashboard/settings"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-md hover:bg-gray-700 ${
                  isActive ? 'bg-gray-700 font-semibold' : ''
                }`
              }
            >
              <FaCog className="mr-2" />
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="p-4 mt-auto border-t border-gray-700">
        <Link to="/" className="flex items-center p-2 rounded-md hover:bg-gray-700">
          Logout
        </Link>
      </div>
    </div>
  );
}

export default AdminSideBar;