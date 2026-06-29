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
          <div className="row-actions">
            <button className="theme-toggle" onClick={toggleTheme}>
              {isDarkTheme ? 'White Theme' : 'Black Theme'}
            </button>
            <button onClick={logout}>Logout</button>
          </div>
        </header>
        <Outlet />
      </section>
    </div>
  );
};

export default AdminLayout;
