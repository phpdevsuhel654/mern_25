import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import AppHeader from '../components/AppHeader';
import PlayerDock from '../components/PlayerDock';
import { usePlayer } from '../context/PlayerContext';

const UserLayout = () => {
  const { refreshState } = usePlayer();

  useEffect(() => {
    refreshState().catch(() => {});
  }, [refreshState]);

  return (
    <div className="app-shell">
      <AppHeader />
      <main className="app-main">
        <Outlet />
      </main>
      <PlayerDock />
    </div>
  );
};

export default UserLayout;
