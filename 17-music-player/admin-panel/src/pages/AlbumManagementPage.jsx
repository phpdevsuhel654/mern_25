import React, { useCallback, useEffect, useState } from 'react';

import FileUpload from '../components/FileUpload';
import { slugify } from '../utils/slugify';
import { validateAlbumForm } from '../utils/validateAlbum';
import { albumService } from '../services/albumService';
import { artistService } from '../services/artistService';

const ALBUM_PAGE_LIMIT = 10;

const AlbumManagementPage = () => {
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [pagination, setPagination] = useState({
    page: 1,
    limit: ALBUM_PAGE_LIMIT,
    total: 0,
    totalPages: 1
  });
  const [sorting, setSorting] = useState({
    column: 'created_at',
    order: 'desc'
  });
  const [form, setForm] = useState({
    title: '',
    slug: '',
    artistId: '',
    releaseDate: '',
    labelName: '',
    totalTracks: '',
    coverImageUrl: '',
    isActive: true
  });

  const resetForm = useCallback(() => {
    setForm({
      title: '',
      slug: '',
      artistId: '',
      releaseDate: '',
      labelName: '',
      totalTracks: '',
      coverImageUrl: '',
      isActive: true
    });
    setEditingId(null);
    setFormErrors({});
  }, []);

  const loadArtists = useCallback(async () => {
    try {
      const response = await artistService.list({ limit: 1000 });
      if (response && response.items) {
        setArtists(response.items);
      }
    } catch (err) {
      console.error('Failed to load artists:', err);
    }
  }, []);

  const loadAlbums = useCallback(
    async (page = 1) => {
      try {
        setFeedback('');
        const response = await albumService.list({
          page,
          limit: ALBUM_PAGE_LIMIT,
          sortBy: sorting.column,
          sortOrder: sorting.order.toUpperCase()
        });
        if (response && response.items) {
          setAlbums(response.items);
          setPagination((prev) => ({
            ...prev,
            page: response.pagination?.page || page,
            limit: response.pagination?.limit || ALBUM_PAGE_LIMIT,
            total: response.pagination?.total || 0,
            totalPages: response.pagination?.totalPages || 1
          }));
        }
      } catch (err) {
        setFeedback(err?.response?.data?.message || 'Failed to load albums');
        setAlbums([]);
      }
    },
    [sorting.column, sorting.order]
  );

  useEffect(() => {
    loadArtists();
    loadAlbums(1);
  }, [loadArtists, loadAlbums]);

  const handleChange = useCallback(
    (event) => {
      const { name, value, type, checked } = event.target;
      setForm((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
      if (formErrors[name]) {
        setFormErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [formErrors]
  );

  const handleTitleChange = useCallback(
    (event) => {
      const title = event.target.value;
      const slug = slugify(title);
      setForm((prev) => ({
        ...prev,
        title,
        slug
      }));
      if (formErrors.title) {
        setFormErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.title;
          return newErrors;
        });
      }
    },
    [formErrors]
  );

  const handleCoverImageChange = useCallback(
    (imageData) => {
      setForm((prev) => ({
        ...prev,
        coverImageUrl: imageData
      }));
      if (formErrors.coverImageUrl) {
        setFormErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.coverImageUrl;
          return newErrors;
        });
      }
    },
    [formErrors]
  );

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setFeedback('');
      setFormErrors({});

      const errors = validateAlbumForm(form);
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }

      setIsSubmitting(true);

      try {
        const payload = {
          title: form.title.trim(),
          slug: form.slug.trim(),
          artistId: Number(form.artistId),
          releaseDate: form.releaseDate || null,
          labelName: form.labelName || null,
          totalTracks: form.totalTracks ? Number(form.totalTracks) : null,
          coverImageUrl: form.coverImageUrl || null,
          isActive: Boolean(form.isActive)
        };

        if (editingId) {
          await albumService.update(editingId, payload);
          setFeedback('Album updated successfully');
        } else {
          await albumService.create(payload);
          setFeedback('Album created successfully');
        }

        resetForm();
        await loadAlbums(editingId ? pagination.page : 1);
      } catch (err) {
        setFeedback(err?.response?.data?.message || 'Failed to save album');
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, editingId, loadAlbums, resetForm, pagination.page]
  );

  const handleEdit = useCallback((album) => {
    setEditingId(album.id);
    setForm({
      title: album.title || '',
      slug: album.slug || '',
      artistId: album.artistId || album.artist_id || '',
      releaseDate: album.releaseDate || album.release_date || '',
      labelName: album.labelName || album.label_name || '',
      totalTracks: album.totalTracks || album.total_tracks || '',
      coverImageUrl: album.coverImageUrl || album.cover_image_url || '',
      isActive: Boolean(album.isActive || album.is_active)
    });
    setFormErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleDelete = useCallback(
    async (albumId) => {
      if (!confirm('Are you sure you want to delete this album?')) {
        return;
      }

      try {
        setFeedback('');
        await albumService.remove(albumId);
        const targetPage = albums.length === 1 && pagination.page > 1 ? pagination.page - 1 : pagination.page;
        await loadAlbums(targetPage);
        setFeedback('Album deleted successfully');
      } catch (err) {
        setFeedback(err?.response?.data?.message || 'Failed to delete album');
      }
    },
    [albums.length, loadAlbums, pagination.page]
  );

  const handleSort = useCallback(
    (column) => {
      setSorting((prev) => ({
        column,
        order: prev.column === column && prev.order === 'asc' ? 'desc' : 'asc'
      }));
    },
    []
  );

  const handlePreviousPage = useCallback(() => {
    if (pagination.page > 1) {
      loadAlbums(pagination.page - 1);
    }
  }, [loadAlbums, pagination.page]);

  const handleNextPage = useCallback(() => {
    if (pagination.page < pagination.totalPages) {
      loadAlbums(pagination.page + 1);
    }
  }, [loadAlbums, pagination.page, pagination.totalPages]);

  const SortableHeader = ({ column, label }) => {
    const isActive = sorting.column === column;
    return (
      <th
        onClick={() => handleSort(column)}
        style={{ cursor: 'pointer', userSelect: 'none' }}
        title="Click to sort"
      >
        {label} {isActive ? (sorting.order === 'asc' ? '▲' : '▼') : ''}
      </th>
    );
  };

  return (
    <section>
      <h1>Album Management</h1>
      <p className="section-subtitle">Create and manage album records for the catalog</p>

      {feedback && <p className={feedback.includes('successfully') ? 'success-text' : 'error-text'}>{feedback}</p>}

      <form className="panel form-grid" onSubmit={handleSubmit}>
        <h3>{editingId ? 'Edit Album' : 'Create Album'}</h3>

        <div>
          <label htmlFor="title">
            Album Title <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            id="title"
            name="title"
            placeholder="Enter album title"
            value={form.title}
            onChange={handleTitleChange}
            required
            style={{
              borderColor: formErrors.title ? '#dc3545' : undefined
            }}
          />
          {formErrors.title && <p style={{ color: '#dc3545', fontSize: '0.875rem' }}>{formErrors.title}</p>}
        </div>

        <div>
          <label htmlFor="slug">Slug</label>
          <input
            id="slug"
            name="slug"
            placeholder="Auto-generated"
            value={form.slug}
            readOnly
            style={{
              backgroundColor: '#f5f5f5',
              borderColor: formErrors.slug ? '#dc3545' : undefined
            }}
          />
          {formErrors.slug && <p style={{ color: '#dc3545', fontSize: '0.875rem' }}>{formErrors.slug}</p>}
        </div>

        <div>
          <label htmlFor="artistId">
            Artist <span style={{ color: 'red' }}>*</span>
          </label>
          <select
            id="artistId"
            name="artistId"
            value={form.artistId}
            onChange={handleChange}
            required
            style={{
              borderColor: formErrors.artistId ? '#dc3545' : undefined
            }}
          >
            <option value="">Select an artist</option>
            {artists.map((artist) => (
              <option key={artist.id} value={artist.id}>
                {artist.name}
              </option>
            ))}
          </select>
          {formErrors.artistId && <p style={{ color: '#dc3545', fontSize: '0.875rem' }}>{formErrors.artistId}</p>}
        </div>

        <div>
          <label htmlFor="releaseDate">Release Date</label>
          <input
            id="releaseDate"
            name="releaseDate"
            type="date"
            value={form.releaseDate}
            onChange={handleChange}
            style={{
              borderColor: formErrors.releaseDate ? '#dc3545' : undefined
            }}
          />
          {formErrors.releaseDate && <p style={{ color: '#dc3545', fontSize: '0.875rem' }}>{formErrors.releaseDate}</p>}
        </div>

        <div>
          <label htmlFor="labelName">Label Name</label>
          <input
            id="labelName"
            name="labelName"
            placeholder="Enter label name"
            value={form.labelName}
            onChange={handleChange}
            style={{
              borderColor: formErrors.labelName ? '#dc3545' : undefined
            }}
          />
          {formErrors.labelName && <p style={{ color: '#dc3545', fontSize: '0.875rem' }}>{formErrors.labelName}</p>}
        </div>

        <div>
          <label htmlFor="totalTracks">Total Tracks</label>
          <input
            id="totalTracks"
            name="totalTracks"
            type="number"
            min="0"
            placeholder="Enter total tracks"
            value={form.totalTracks}
            onChange={handleChange}
            style={{
              borderColor: formErrors.totalTracks ? '#dc3545' : undefined
            }}
          />
          {formErrors.totalTracks && <p style={{ color: '#dc3545', fontSize: '0.875rem' }}>{formErrors.totalTracks}</p>}
        </div>

        <div>
          <label>Album Cover</label>
          <FileUpload
            value={form.coverImageUrl}
            onChange={handleCoverImageChange}
            label="Choose Cover Image to Upload"
          />
          {formErrors.coverImageUrl && (
            <p style={{ color: '#dc3545', fontSize: '0.875rem' }}>{formErrors.coverImageUrl}</p>
          )}
        </div>

        <div>
          <label htmlFor="isActive">Status</label>
          <select
            id="isActive"
            name="isActive"
            value={form.isActive ? 'true' : 'false'}
            onChange={(e) => {
              setForm((prev) => ({
                ...prev,
                isActive: e.target.value === 'true'
              }));
            }}
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        <div className="row-actions">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (editingId ? 'Updating...' : 'Creating...') : editingId ? 'Update Album' : 'Create Album'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} disabled={isSubmitting}>
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="panel">
        <div className="row-actions" style={{ marginBottom: '1rem' }}>
          <button type="button" onClick={handlePreviousPage} disabled={pagination.page <= 1}>
            ← Previous
          </button>
          <span>
            Page {pagination.page} of {pagination.totalPages} ({pagination.total} albums)
          </span>
          <button type="button" onClick={handleNextPage} disabled={pagination.page >= pagination.totalPages}>
            Next →
          </button>
        </div>

        <table className="song-table">
          <thead>
            <tr>
              <SortableHeader column="title" label="Title" />
              <SortableHeader column="artist_id" label="Artist" />
              <SortableHeader column="release_date" label="Release Date" />
              <SortableHeader column="is_active" label="Status" />
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {albums.length > 0 ? (
              albums.map((album) => (
                <tr key={album.id}>
                  <td>{album.title}</td>
                  <td>{album.artistName || album.artist_name || '−'}</td>
                  <td>{album.releaseDate || album.release_date || '−'}</td>
                  <td>{album.isActive || album.is_active ? 'Active' : 'Inactive'}</td>
                  <td className="action-cell">
                    <button
                      type="button"
                      onClick={() => handleEdit(album)}
                      title="Edit"
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        padding: '0.25rem 0.5rem',
                        color: '#000'
                      }}
                    >
                      ✎
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(album.id)}
                      title="Delete"
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        padding: '0.25rem 0.5rem',
                        color: '#000'
                      }}
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>No albums added yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AlbumManagementPage;
