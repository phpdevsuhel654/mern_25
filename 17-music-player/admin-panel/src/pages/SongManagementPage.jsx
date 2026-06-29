import React, { useCallback, useEffect, useState } from 'react';

import { ADMIN_PAGE_LIMIT } from '../constants/pagination';
import { archiveSong, createSong, listSongs, updateSongStatus } from '../services/songService';

const SongManagementPage = () => {
  const [songs, setSongs] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: ADMIN_PAGE_LIMIT,
    total: 0,
    totalPages: 1
  });
  const [form, setForm] = useState({
    title: '',
    artistId: '',
    albumId: '',
    genreId: '',
    durationSeconds: '',
    sourceType: 'external',
    externalUrl: '',
    filePath: '',
    coverImageUrl: '',
    releaseDate: '',
    isExplicit: false,
    isActive: true
  });

  const resetForm = useCallback(() => {
    setForm({
      title: '',
      artistId: '',
      albumId: '',
      genreId: '',
      durationSeconds: '',
      sourceType: 'external',
      externalUrl: '',
      filePath: '',
      coverImageUrl: '',
      releaseDate: '',
      isExplicit: false,
      isActive: true
    });
  }, []);

  const loadSongs = useCallback(async (page = 1) => {
    try {
      setFeedback('');
      const data = await listSongs({ page, limit: ADMIN_PAGE_LIMIT });
      if (data && Array.isArray(data.items)) {
        setSongs(data.items);
        setPagination((prev) => ({
          ...prev,
          page: data.pagination?.page || page,
          limit: data.pagination?.limit || ADMIN_PAGE_LIMIT,
          total: data.pagination?.total || 0,
          totalPages: data.pagination?.totalPages || 1
        }));
      } else if (Array.isArray(data)) {
        setSongs(data);
        setPagination((prev) => ({
          ...prev,
          page,
          limit: ADMIN_PAGE_LIMIT,
          total: data.length,
          totalPages: 1
        }));
      } else {
        setSongs([]);
        setPagination((prev) => ({
          ...prev,
          page,
          total: 0,
          totalPages: 1
        }));
      }
    } catch (err) {
      setFeedback(err?.response?.data?.message || 'Failed to load songs');
      setSongs([]);
    }
  }, []);

  useEffect(() => {
    loadSongs(1);
  }, [loadSongs]);

  const handleSetStatus = useCallback(
    async (songId, isActive) => {
      try {
        await updateSongStatus(songId, isActive);
        await loadSongs(pagination.page);
      } catch (err) {
        setFeedback(err?.response?.data?.message || 'Failed to update status');
      }
    },
    [loadSongs, pagination.page]
  );

  const handleArchive = useCallback(
    async (songId) => {
      try {
        await archiveSong(songId);
        const targetPage = songs.length === 1 && pagination.page > 1 ? pagination.page - 1 : pagination.page;
        await loadSongs(targetPage);
      } catch (err) {
        setFeedback(err?.response?.data?.message || 'Failed to archive song');
      }
    },
    [loadSongs, pagination.page, songs.length]
  );

  const handleChange = useCallback((event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);

  const handleCreateSong = useCallback(
    async (event) => {
      event.preventDefault();
      setFeedback('');
      setIsSubmitting(true);

      try {
        const payload = {
          title: form.title.trim(),
          artistId: Number(form.artistId),
          albumId: form.albumId ? Number(form.albumId) : null,
          genreId: Number(form.genreId),
          durationSeconds: Number(form.durationSeconds),
          sourceType: form.sourceType,
          filePath: form.sourceType === 'local' ? form.filePath.trim() : null,
          externalUrl: form.sourceType === 'external' ? form.externalUrl.trim() : null,
          coverImageUrl: form.coverImageUrl ? form.coverImageUrl.trim() : null,
          releaseDate: form.releaseDate || null,
          isExplicit: Boolean(form.isExplicit),
          isActive: Boolean(form.isActive)
        };

        await createSong(payload);
        setFeedback('Song created successfully');
        resetForm();
        await loadSongs(1);
      } catch (err) {
        setFeedback(err?.response?.data?.message || 'Failed to create song');
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, loadSongs, resetForm]
  );

  const handlePreviousPage = useCallback(() => {
    if (pagination.page > 1) {
      loadSongs(pagination.page - 1);
    }
  }, [loadSongs, pagination.page]);

  const handleNextPage = useCallback(() => {
    if (pagination.page < pagination.totalPages) {
      loadSongs(pagination.page + 1);
    }
  }, [loadSongs, pagination.page, pagination.totalPages]);

  return (
    <section>
      <h1>Song Management</h1>
      <p className="section-subtitle">View and manage songs in the catalog</p>

      {feedback && <p className="error-text">{feedback}</p>}

      <form className="panel form-grid" onSubmit={handleCreateSong}>
        <h3>Create Song</h3>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input
          name="artistId"
          type="number"
          min="1"
          placeholder="Artist ID"
          value={form.artistId}
          onChange={handleChange}
          required
        />
        <input
          name="albumId"
          type="number"
          min="1"
          placeholder="Album ID (optional)"
          value={form.albumId}
          onChange={handleChange}
        />
        <input
          name="genreId"
          type="number"
          min="1"
          placeholder="Genre ID"
          value={form.genreId}
          onChange={handleChange}
          required
        />
        <input
          name="durationSeconds"
          type="number"
          min="1"
          placeholder="Duration (seconds)"
          value={form.durationSeconds}
          onChange={handleChange}
          required
        />
        <select name="sourceType" value={form.sourceType} onChange={handleChange}>
          <option value="external">External URL</option>
          <option value="local">Local File</option>
        </select>

        {form.sourceType === 'external' ? (
          <input
            name="externalUrl"
            type="url"
            placeholder="External URL"
            value={form.externalUrl}
            onChange={handleChange}
            required
          />
        ) : (
          <input
            name="filePath"
            placeholder="Local file path"
            value={form.filePath}
            onChange={handleChange}
            required
          />
        )}

        <input
          name="coverImageUrl"
          type="url"
          placeholder="Cover Image URL (optional)"
          value={form.coverImageUrl}
          onChange={handleChange}
        />
        <input name="releaseDate" type="date" value={form.releaseDate} onChange={handleChange} />

        <label>
          <input name="isExplicit" type="checkbox" checked={form.isExplicit} onChange={handleChange} />
          Explicit
        </label>
        <label>
          <input name="isActive" type="checkbox" checked={form.isActive} onChange={handleChange} />
          Active
        </label>

        <div className="row-actions">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Song'}
          </button>
          <button type="button" onClick={resetForm} disabled={isSubmitting}>
            Reset
          </button>
        </div>
      </form>

      <div className="panel">
        <div className="row-actions" style={{ marginBottom: '1rem' }}>
          <button type="button" onClick={handlePreviousPage} disabled={pagination.page <= 1}>
            Previous
          </button>
          <span>
            Page {pagination.page} of {pagination.totalPages} ({pagination.total} songs)
          </span>
          <button type="button" onClick={handleNextPage} disabled={pagination.page >= pagination.totalPages}>
            Next
          </button>
        </div>
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
            {songs.length > 0 ? (
              songs.map((song) => (
                <tr key={song.id}>
                  <td>{song.title}</td>
                  <td>{song.sourceType || song.source_type || `-`}</td>
                  <td>{song.isActive || song.is_active ? 'Active' : 'Archived'}</td>
                  <td className="action-cell">
                    <button onClick={() => handleSetStatus(song.id, true)}>Activate</button>
                    <button onClick={() => handleSetStatus(song.id, false)}>Deactivate</button>
                    <button onClick={() => handleArchive(song.id)}>Archive</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>No songs added yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default SongManagementPage;
