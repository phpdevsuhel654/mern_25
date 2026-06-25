import React, { useCallback, useEffect, useState } from 'react';

import { archiveSong, createSong, listSongs, updateSongStatus } from '../services/songService';

const defaultForm = {
  title: '',
  artistId: '',
  genreId: '',
  durationSeconds: '',
  sourceType: 'external',
  externalUrl: '',
  filePath: ''
};

const SongManagementPage = () => {
  const [songs, setSongs] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [feedback, setFeedback] = useState('');

  const loadSongs = useCallback(async () => {
    const data = await listSongs({ limit: 100 });
    setSongs(data.items || []);
  }, []);

  useEffect(() => {
    loadSongs().catch(() => {});
  }, [loadSongs]);

  const handleSetStatus = useCallback(
    async (songId, isActive) => {
      await updateSongStatus(songId, isActive);
      await loadSongs();
    },
    [loadSongs]
  );

  const handleArchive = useCallback(
    async (songId) => {
      await archiveSong(songId);
      await loadSongs();
    },
    [loadSongs]
  );

  const submit = async (event) => {
    event.preventDefault();
    setFeedback('');

    try {
      await createSong({
        title: form.title,
        artistId: Number(form.artistId),
        genreId: Number(form.genreId),
        durationSeconds: Number(form.durationSeconds),
        sourceType: form.sourceType,
        externalUrl: form.sourceType === 'external' ? form.externalUrl : undefined,
        filePath: form.sourceType === 'local' ? form.filePath : undefined
      });

      setForm(defaultForm);
      setFeedback('Song created successfully');
      await loadSongs();
    } catch (err) {
      setFeedback(err?.response?.data?.message || 'Failed to create song');
    }
  };

  return (
    <section>
      <h1>Song Management</h1>
      <form className="panel form-grid" onSubmit={submit}>
        <input placeholder="Title" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} />
        <input placeholder="Artist ID" value={form.artistId} onChange={(e) => setForm((p) => ({ ...p, artistId: e.target.value }))} />
        <input placeholder="Genre ID" value={form.genreId} onChange={(e) => setForm((p) => ({ ...p, genreId: e.target.value }))} />
        <input placeholder="Duration (seconds)" value={form.durationSeconds} onChange={(e) => setForm((p) => ({ ...p, durationSeconds: e.target.value }))} />
        <select value={form.sourceType} onChange={(e) => setForm((p) => ({ ...p, sourceType: e.target.value }))}>
          <option value="external">External</option>
          <option value="local">Local</option>
        </select>
        {form.sourceType === 'external' ? (
          <input placeholder="External URL" value={form.externalUrl} onChange={(e) => setForm((p) => ({ ...p, externalUrl: e.target.value }))} />
        ) : (
          <input placeholder="File Path" value={form.filePath} onChange={(e) => setForm((p) => ({ ...p, filePath: e.target.value }))} />
        )}
        {feedback && <p className="error-text">{feedback}</p>}
        <button type="submit">Create Song</button>
      </form>

      <div className="panel">
        <table className="song-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Source</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song) => (
              <tr key={song.id}>
                <td>{song.title}</td>
                <td>{song.sourceType || song.source_type}</td>
                <td>{song.isActive || song.is_active ? 'Active' : 'Archived'}</td>
                <td className="action-cell">
                  <button onClick={() => handleSetStatus(song.id, true)}>Activate</button>
                  <button onClick={() => handleSetStatus(song.id, false)}>Deactivate</button>
                  <button onClick={() => handleArchive(song.id)}>Archive</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default SongManagementPage;
