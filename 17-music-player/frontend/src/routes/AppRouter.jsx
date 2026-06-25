import React, { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import ProtectedRoute from '../components/ProtectedRoute';
import { APP_ROUTES } from '../constants/appRoutes';
import { useAuth } from '../context/AuthContext';

const UserLayout = lazy(() => import('../layouts/UserLayout'));
const LibraryPage = lazy(() => import('../pages/LibraryPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const PlaylistDetailPage = lazy(() => import('../pages/PlaylistDetailPage'));
const PlaylistsPage = lazy(() => import('../pages/PlaylistsPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));

const AuthRedirect = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to={APP_ROUTES.library} replace />;
  }
  return children;
};

const AppRouter = () => {
  return (
    <Suspense fallback={<div className="center-card">Loading page...</div>}>
      <Routes>
        <Route
          path={APP_ROUTES.login}
          element={
            <AuthRedirect>
              <LoginPage />
            </AuthRedirect>
          }
        />
        <Route
          path={APP_ROUTES.register}
          element={
            <AuthRedirect>
              <RegisterPage />
            </AuthRedirect>
          }
        />

        <Route
          element={
            <ProtectedRoute>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route path={APP_ROUTES.home} element={<Navigate to={APP_ROUTES.library} replace />} />
          <Route path={APP_ROUTES.library} element={<LibraryPage />} />
          <Route path={APP_ROUTES.playlists} element={<PlaylistsPage />} />
          <Route path={`${APP_ROUTES.playlists}/:id`} element={<PlaylistDetailPage />} />
          <Route path={APP_ROUTES.profile} element={<ProfilePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
