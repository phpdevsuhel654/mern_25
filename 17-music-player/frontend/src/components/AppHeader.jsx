import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { APP_ROUTES } from '../constants/appRoutes';
import { useAuth } from '../context/AuthContext';

const AppHeader = () => {
  const { user, logout } = useAuth();

  return (
    <header className="app-header">
      <Link to={APP_ROUTES.library} className="brand">
        Omni Beats
      </Link>

      <nav className="nav-links">
        <NavLink to={APP_ROUTES.library}>Library</NavLink>
        <NavLink to={APP_ROUTES.playlists}>Playlists</NavLink>
        <NavLink to={APP_ROUTES.profile}>Profile</NavLink>
      </nav>

      <div className="header-user">
        <span>{user?.username || 'User'}</span>
        <button onClick={logout}>Logout</button>
      </div>
    </header>
  );
};

export default AppHeader;
