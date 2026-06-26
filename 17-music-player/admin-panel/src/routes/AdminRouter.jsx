import React, { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import ProtectedAdminRoute from '../components/ProtectedAdminRoute';
import { ADMIN_ROUTES } from '../constants/adminRoutes';
import { useAdminAuth } from '../context/AdminAuthContext';

const AdminLayout = lazy(() => import('../layouts/AdminLayout'));
const AdminLoginPage = lazy(() => import('../pages/AdminLoginPage'));
const AlbumManagementPage = lazy(() => import('../pages/AlbumManagementPage'));
const ArtistManagementPage = lazy(() => import('../pages/ArtistManagementPage'));
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const GenreManagementPage = lazy(() => import('../pages/GenreManagementPage'));
const PlaylistManagementPage = lazy(() => import('../pages/PlaylistManagementPage'));
const SongManagementPage = lazy(() => import('../pages/SongManagementPage'));
const StatsPage = lazy(() => import('../pages/StatsPage'));
const UploadManagementPage = lazy(() => import('../pages/UploadManagementPage'));
const UserManagementPage = lazy(() => import('../pages/UserManagementPage'));

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
          <Route path={ADMIN_ROUTES.artists} element={<ArtistManagementPage />} />
          <Route path={ADMIN_ROUTES.albums} element={<AlbumManagementPage />} />
          <Route path={ADMIN_ROUTES.genres} element={<GenreManagementPage />} />
          <Route path={ADMIN_ROUTES.playlists} element={<PlaylistManagementPage />} />
          <Route path={ADMIN_ROUTES.users} element={<UserManagementPage />} />
          <Route path={ADMIN_ROUTES.uploads} element={<UploadManagementPage />} />
          <Route path={ADMIN_ROUTES.stats} element={<StatsPage />} />
        </Route>

        <Route path="*" element={<Navigate to={ADMIN_ROUTES.dashboard} replace />} />
      </Routes>
    </Suspense>
  );
};

export default AdminRouter;
