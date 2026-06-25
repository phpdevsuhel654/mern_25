import React from 'react';
import { Navigate } from 'react-router-dom';

import { APP_ROUTES } from '../constants/appRoutes';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="center-card">Checking session...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={APP_ROUTES.login} replace />;
  }

  return children;
};

export default ProtectedRoute;
