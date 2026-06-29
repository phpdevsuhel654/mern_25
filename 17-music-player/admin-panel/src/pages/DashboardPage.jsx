import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { ADMIN_ROUTES } from '../constants/adminRoutes';
import { loadAdminStats } from '../services/statsService';

const DashboardPage = () => {
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
        genres: 0,
        albums: 0,
        users: 0,
        uploads: 0,
        totalCatalog: 0
      });
    });
  }, []);

  const cards = useMemo(() => {
    if (!stats) return [];
    return [
      { label: 'Songs', value: stats.songs, link: ADMIN_ROUTES.songs },
      { label: 'Artists', value: stats.artists, link: ADMIN_ROUTES.artists },
      { label: 'Genres', value: stats.genres || 0, link: ADMIN_ROUTES.genres },
      { label: 'Albums', value: stats.albums || 0, link: ADMIN_ROUTES.albums },
      { label: 'Playlists', value: stats.playlists, link: ADMIN_ROUTES.playlists },
      { label: 'Users', value: stats.users, link: ADMIN_ROUTES.users }
    ];
  }, [stats]);

  return (
    <section>
      <h1>Dashboard</h1>
      <p className="section-subtitle">Central admin overview - click any card to manage</p>
      <div className="metrics-grid">
        {cards.map((card) => (
          <Link key={card.label} to={card.link} style={{ textDecoration: 'none' }}>
            <article className="panel metric-card" style={{ cursor: 'pointer' }}>
              <p>{card.label}</p>
              <strong>{card.value}</strong>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default DashboardPage;
