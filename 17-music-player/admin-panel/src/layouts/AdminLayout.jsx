import React from 'react';
import { Link, Outlet } from 'react-router-dom';

import AdminSidebar from '../components/AdminSidebar';
import { ADMIN_ROUTES } from '../constants/adminRoutes';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useTheme } from '../hooks/useTheme';

const AdminLayout = () => {
  const { admin, logout } = useAdminAuth();
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <div className="admin-shell">
      <AdminSidebar />
      <section className="admin-main">
        <header className="admin-header">
          <Link to={ADMIN_ROUTES.profile} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ cursor: 'pointer' }}>
              <strong>{admin?.fullName || admin?.username || 'Admin'}</strong>
              <p>{admin?.email}</p>
            </div>
          </Link>
          <div className="row-actions" style={{ gap: '1rem', flexWrap: 'nowrap', whiteSpace: 'nowrap' }}>
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault();
                toggleTheme();
              }}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer',
                fontSize: '0.95rem'
              }}
            >
              {isDarkTheme ? 'Light Theme' : 'Dark Theme'}
            </Link>
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer',
                fontSize: '0.95rem'
              }}
            >
              Logout
            </Link>
          </div>
        </header>
        <Outlet />
      </section>
    </div>
  );
};

export default AdminLayout;
