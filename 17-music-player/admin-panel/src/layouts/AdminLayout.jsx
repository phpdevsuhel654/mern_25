import React from 'react';
import { Outlet } from 'react-router-dom';

import AdminSidebar from '../components/AdminSidebar';
import { useAdminAuth } from '../context/AdminAuthContext';

const AdminLayout = () => {
  const { admin, logout } = useAdminAuth();

  return (
    <div className="admin-shell">
      <AdminSidebar />
      <section className="admin-main">
        <header className="admin-header">
          <div>
            <strong>{admin?.fullName || admin?.username || 'Admin'}</strong>
            <p>{admin?.email}</p>
          </div>
          <button onClick={logout}>Logout</button>
        </header>
        <Outlet />
      </section>
    </div>
  );
};

export default AdminLayout;
