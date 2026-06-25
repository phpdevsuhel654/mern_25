import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { createPlaylist, listMyPlaylists } from '../services/playlistService';

const PlaylistsPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [name, setName] = useState('');

  const load = async () => {
    const response = await listMyPlaylists();
    setPlaylists(response.items || []);
  };

  useEffect(() => {
    load().catch(() => {});
  }, []);

  const create = async (event) => {
    event.preventDefault();
    if (!name.trim()) {
      return;
    }

    await createPlaylist({ name, isPublic: true });
    setName('');
    await load();
  };

  return (
    <section>
      <h1>My Playlists</h1>
      <form onSubmit={create} className="inline-form panel">
        <input placeholder="New playlist name" value={name} onChange={(e) => setName(e.target.value)} />
        <button type="submit">Create</button>
      </form>

      <div className="grid-cards">
        {playlists.map((playlist) => (
          <Link className="panel" key={playlist.id} to={`/playlists/${playlist.id}`}>
            <h3>{playlist.name}</h3>
            <p>{playlist.description || 'No description'}</p>
            <small>{playlist.songCount} songs</small>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PlaylistsPage;
