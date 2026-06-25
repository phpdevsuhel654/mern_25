import React from 'react';
import { NavLink } from 'react-router-dom';

import { ADMIN_ROUTES } from '../constants/adminRoutes';

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar">
      <h2>Admin</h2>
      <nav>
        <NavLink to={ADMIN_ROUTES.dashboard}>Dashboard</NavLink>
        <NavLink to={ADMIN_ROUTES.songs}>Songs</NavLink>
        <NavLink to={ADMIN_ROUTES.artists}>Artists</NavLink>
        <NavLink to={ADMIN_ROUTES.albums}>Albums</NavLink>
        <NavLink to={ADMIN_ROUTES.genres}>Genres</NavLink>
        <NavLink to={ADMIN_ROUTES.playlists}>Playlists</NavLink>
        <NavLink to={ADMIN_ROUTES.users}>Users</NavLink>
        <NavLink to={ADMIN_ROUTES.uploads}>Uploads</NavLink>
        <NavLink to={ADMIN_ROUTES.stats}>Stats</NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
