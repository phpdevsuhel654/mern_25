import React, { useEffect, useMemo, useState } from 'react';

import { listPublicPlaylists } from '../services/playlistService';
import { listSongs } from '../services/songService';

const DashboardPage = () => {
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const load = async () => {
      const [songsData, playlistsData] = await Promise.all([
        listSongs({ limit: 100, isActive: true }),
        listPublicPlaylists({ limit: 100 })
      ]);

      setSongs(songsData.items || []);
      setPlaylists(playlistsData.items || []);
    };

    load().catch(() => {});
  }, []);

  const cards = useMemo(() => {
    const localSongs = songs.filter((s) => (s.sourceType || s.source_type) === 'local').length;
    const externalSongs = songs.filter((s) => (s.sourceType || s.source_type) === 'external').length;

    return [
      { label: 'Active Songs', value: songs.length },
      { label: 'Public Playlists', value: playlists.length },
      { label: 'Local Media', value: localSongs },
      { label: 'External Sources', value: externalSongs }
    ];
  }, [songs, playlists]);

  return (
    <section>
      <h1>Dashboard</h1>
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
        <p>Metrics currently reflect available backend endpoints from implemented phases.</p>
      </article>
    </section>
  );
};

export default DashboardPage;
