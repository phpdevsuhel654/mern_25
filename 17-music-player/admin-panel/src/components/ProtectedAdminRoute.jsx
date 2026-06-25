import React from 'react';
import { Navigate } from 'react-router-dom';

import { ADMIN_ROUTES } from '../constants/adminRoutes';
import { useAdminAuth } from '../context/AdminAuthContext';

const ProtectedAdminRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAdminAuth();

  if (loading) {
    return <div className="center-card">Validating admin session...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={ADMIN_ROUTES.login} replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
