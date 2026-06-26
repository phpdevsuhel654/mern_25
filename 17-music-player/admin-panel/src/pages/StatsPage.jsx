import React, { useEffect, useState } from 'react';

import { loadAdminStats } from '../services/statsService';

const StatsPage = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const load = async () => {
      const data = await loadAdminStats();
      setStats(data);
    };

    load().catch(() => {
      setStats({
        songs: 0,
        playlists: 0,
        artists: 0,
        albums: 0,
        genres: 0,
        users: 0,
        uploads: 0,
        totalCatalog: 0,
        activityIndex: 0
      });
    });
  }, []);

  if (!stats) {
    return <div className="panel">Loading statistics...</div>;
  }

  return (
    <section>
      <h1>Stats</h1>
      <p className="section-subtitle">Operational and catalog metrics snapshot.</p>

      <div className="metrics-grid">
        <article className="panel metric-card">
          <p>Songs</p>
          <strong>{stats.songs}</strong>
        </article>
        <article className="panel metric-card">
          <p>Artists</p>
          <strong>{stats.artists}</strong>
        </article>
        <article className="panel metric-card">
          <p>Albums</p>
          <strong>{stats.albums}</strong>
        </article>
        <article className="panel metric-card">
          <p>Genres</p>
          <strong>{stats.genres}</strong>
        </article>
        <article className="panel metric-card">
          <p>Playlists</p>
          <strong>{stats.playlists}</strong>
        </article>
        <article className="panel metric-card">
          <p>Users</p>
          <strong>{stats.users}</strong>
        </article>
        <article className="panel metric-card">
          <p>Uploads</p>
          <strong>{stats.uploads}</strong>
        </article>
        <article className="panel metric-card">
          <p>Total Catalog Index</p>
          <strong>{stats.totalCatalog}</strong>
        </article>
        <article className="panel metric-card">
          <p>Activity Index</p>
          <strong>{stats.activityIndex}</strong>
        </article>
      </div>
    </section>
  );
};

export default StatsPage;
