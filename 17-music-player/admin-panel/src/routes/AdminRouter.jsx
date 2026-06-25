import React, { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import ProtectedAdminRoute from '../components/ProtectedAdminRoute';
import { ADMIN_ROUTES } from '../constants/adminRoutes';
import { useAdminAuth } from '../context/AdminAuthContext';

const AdminLayout = lazy(() => import('../layouts/AdminLayout'));
const AdminLoginPage = lazy(() => import('../pages/AdminLoginPage'));
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const GenericManagementPage = lazy(() => import('../pages/GenericManagementPage'));
const SongManagementPage = lazy(() => import('../pages/SongManagementPage'));

const LoginRedirect = ({ children }) => {
  const { isAuthenticated } = useAdminAuth();
  if (isAuthenticated) {
    return <Navigate to={ADMIN_ROUTES.dashboard} replace />;
  }
  return children;
};

const AdminRouter = () => {
  return (
    <Suspense fallback={<div className="center-card">Loading admin page...</div>}>
      <Routes>
        <Route
          path={ADMIN_ROUTES.login}
          element={
            <LoginRedirect>
              <AdminLoginPage />
            </LoginRedirect>
          }
        />

        <Route
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route path={ADMIN_ROUTES.dashboard} element={<DashboardPage />} />
          <Route path={ADMIN_ROUTES.songs} element={<SongManagementPage />} />
          <Route path={ADMIN_ROUTES.artists} element={<GenericManagementPage title="Artist Management" description="Create/edit artists and artist metadata." />} />
          <Route path={ADMIN_ROUTES.albums} element={<GenericManagementPage title="Album Management" description="Manage album catalog and cover image metadata." />} />
          <Route path={ADMIN_ROUTES.genres} element={<GenericManagementPage title="Genre Management" description="Manage genres and classification data." />} />
          <Route path={ADMIN_ROUTES.playlists} element={<GenericManagementPage title="Playlist Monitoring" description="Monitor platform playlists and moderation state." />} />
          <Route path={ADMIN_ROUTES.users} element={<GenericManagementPage title="User Management" description="Manage users, status, and role assignments." />} />
          <Route path={ADMIN_ROUTES.uploads} element={<GenericManagementPage title="Uploads" description="Upload music files and cover images." />} />
          <Route path={ADMIN_ROUTES.stats} element={<GenericManagementPage title="System Statistics" description="View system-wide activity and playback metrics." />} />
        </Route>

        <Route path="*" element={<Navigate to={ADMIN_ROUTES.dashboard} replace />} />
      </Routes>
    </Suspense>
  );
};

export default AdminRouter;
