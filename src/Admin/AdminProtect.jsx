import React, { Children, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UnauthorizedPage from './Unauthorized'; 

function AdminProtect({ children }) {
  let user = useSelector(state => state.auth.user);
  console.log("admin protect user ", user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user[0] && !user[0].isAdmin) {
      navigate('/unauthorized'); 
    }
  }, [user, navigate]);

  if (user && user[0] && user[0].isAdmin) {
    return children;
  }
  return null;
}

export default AdminProtect;