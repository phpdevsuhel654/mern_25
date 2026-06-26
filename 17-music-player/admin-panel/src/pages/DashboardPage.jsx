import React, { useEffect, useMemo, useState } from 'react';

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
        users: 0,
        uploads: 0,
        totalCatalog: 0
      });
    });
  }, []);

  const cards = useMemo(() => {
    if (!stats) {
      return [];
    }

    return [
      { label: 'Songs', value: stats.songs },
      { label: 'Playlists', value: stats.playlists },
      { label: 'Artists', value: stats.artists },
      { label: 'Users', value: stats.users },
      { label: 'Uploads', value: stats.uploads },
      { label: 'Catalog Index', value: stats.totalCatalog }
    ];
  }, [stats]);

  return (
    <section>
      <h1>Dashboard</h1>
      <p className="section-subtitle">Central admin overview across catalog, users, and content operations.</p>
      <div className="metrics-grid">
        {cards.map((card) => (
          <article key={card.label} className="panel metric-card">
            <p>{card.label}</p>
            <strong>{card.value}</strong>
          </article>
        ))}
      </div>
      <article className="panel">
        <h3>System Snapshot</h3>
        <p>Live metrics are sourced from backend APIs where available and local module persistence for pending backend endpoints.</p>
      </article>
    </section>
  );
};

export default DashboardPage;
