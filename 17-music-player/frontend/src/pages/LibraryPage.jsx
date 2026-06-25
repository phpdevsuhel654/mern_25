import React, { useEffect, useState } from 'react';

import SongTable from '../components/SongTable';
import { usePlayer } from '../context/PlayerContext';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { listSongs } from '../services/songService';

const LibraryPage = () => {
  const { play, queueAdd } = usePlayer();
  const [search, setSearch] = useState('');
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState('');
  const debouncedSearch = useDebouncedValue(search, 350);

  useEffect(() => {
    const load = async () => {
      try {
        setError('');
        const response = await listSongs({ search: debouncedSearch, isActive: true, limit: 50 });
        setSongs(response.items || []);
      } catch (_err) {
        setError('Unable to load songs');
      }
    };

    load();
  }, [debouncedSearch]);

  return (
    <section>
      <h1>Library</h1>
      <div className="panel">
        <input
          className="search-input"
          placeholder="Search songs or artists"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {error && <p className="error-text">{error}</p>}
      <SongTable
        songs={songs}
        onPlay={(songId) => play(songId).catch(() => {})}
        onQueueAdd={(songId) => queueAdd({ songId }).catch(() => {})}
      />
    </section>
  );
};

export default LibraryPage;
