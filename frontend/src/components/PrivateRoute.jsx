import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children, requireAdmin = false }) => {
  const location = useLocation();
  const { user, isAdmin } = useAuth();

  if (!user) {
    // Om ingen användare är inloggad, omdirigera till inloggningssidan
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    // Om admin krävs men användaren inte är admin, omdirigera till inloggningssidan
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  // Om allt är ok, visa komponenten
  return children;
};

export default PrivateRoute; 