import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  
  // 1. Check if the admin token exists in localStorage
  const adminToken = localStorage.getItem('pickcric_admin_token');

  // 2. If there is no token, kick them to the login screen
  if (!adminToken) {
    // We use 'replace' so they can't use the back button to return to the protected page
    // We pass 'state' so we can redirect them back to where they were trying to go after they log in
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // 3. If they DO have the token, render the page they requested!
  return children;
};

export default ProtectedRoute;