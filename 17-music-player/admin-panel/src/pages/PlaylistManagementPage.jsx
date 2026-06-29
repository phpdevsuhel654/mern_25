import React, { useEffect, useMemo, useState } from 'react';

import { ADMIN_PAGE_LIMIT } from '../constants/pagination';
import { listPublicPlaylists } from '../services/playlistService';

const PlaylistManagementPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [feedback, setFeedback] = useState('');

  const loadPlaylists = async () => {
    setFeedback('');
    const data = await listPublicPlaylists({ limit: ADMIN_PAGE_LIMIT });
    setPlaylists(data.items || []);
  };

  useEffect(() => {
    loadPlaylists().catch((error) => {
      setFeedback(error?.response?.data?.message || 'Failed to load playlists');
    });
  }, []);

  const stats = useMemo(() => {
    const totalTracks = playlists.reduce((acc, playlist) => {
      const count = Number(playlist.songCount || playlist.song_count || 0);
      return acc + count;
    }, 0);

    return {
      totalPlaylists: playlists.length,
      totalTracks,
      avgTracks: playlists.length ? (totalTracks / playlists.length).toFixed(1) : '0.0'
    };
  }, [playlists]);

  return (
    <section>
      <h1>Playlists</h1>
      <article className="panel">
        <p>Monitor public playlists and song distribution snapshot.</p>
      </article>

      <div className="metrics-grid">
        <article className="panel metric-card">
          <p>Playlists</p>
          <strong>{stats.totalPlaylists}</strong>
        </article>
        <article className="panel metric-card">
          <p>Songs Referenced</p>
          <strong>{stats.totalTracks}</strong>
        </article>
        <article className="panel metric-card">
          <p>Avg Songs / Playlist</p>
          <strong>{stats.avgTracks}</strong>
        </article>
      </div>

      <article className="panel row-actions">
        <button
          type="button"
          onClick={() => {
            loadPlaylists().catch((error) => {
              setFeedback(error?.response?.data?.message || 'Failed to refresh playlists');
            });
          }}
        >
          Refresh
        </button>
        {feedback ? <p className="error-text">{feedback}</p> : null}
      </article>

      <div className="panel">
        <table className="song-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Owner</th>
              <th>Songs</th>
              <th>Visibility</th>
            </tr>
          </thead>
          <tbody>
            {playlists.length ? (
              playlists.map((playlist) => (
                <tr key={playlist.id}>
                  <td>{playlist.name || playlist.title || '-'}</td>
                  <td>{playlist.ownerFullName || playlist.ownerUsername || '-'}</td>
                  <td>{playlist.songCount || playlist.song_count || 0}</td>
                  <td>{playlist.visibility || 'public'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>No playlists available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PlaylistManagementPage;
