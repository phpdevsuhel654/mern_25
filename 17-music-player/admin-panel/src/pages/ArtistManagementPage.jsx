import React, { useCallback, useEffect, useState } from 'react';

import RichTextEditor from '../components/RichTextEditor';
import FileUpload from '../components/FileUpload';
import { ADMIN_PAGE_LIMIT } from '../constants/pagination';
import { slugify } from '../utils/slugify';
import { COUNTRIES } from '../utils/countries';
import { validateArtistForm } from '../utils/validateArtist';
import { artistService } from '../services/artistService';

const ArtistManagementPage = () => {
  const [artists, setArtists] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [pagination, setPagination] = useState({
    page: 1,
    limit: ADMIN_PAGE_LIMIT,
    total: 0,
    totalPages: 1
  });
  const [sorting, setSorting] = useState({
    column: 'name',
    order: 'asc'
  });
  const [form, setForm] = useState({
    name: '',
    slug: '',
    bio: '',
    imageUrl: '',
    country: '',
    isActive: true
  });

  const resetForm = useCallback(() => {
    setForm({
      name: '',
      slug: '',
      bio: '',
      imageUrl: '',
      country: '',
      isActive: true
    });
    setEditingId(null);
    setFormErrors({});
  }, []);

  const loadArtists = useCallback(
    async (page = 1) => {
      try {
        setFeedback('');
        const response = await artistService.list({
          page,
          limit: ADMIN_PAGE_LIMIT,
          sortBy: sorting.column,
          sortOrder: sorting.order
        });
        if (response && response.items) {
          setArtists(response.items);
          setPagination((prev) => ({
            ...prev,
            page: response.pagination?.page || page,
            limit: response.pagination?.limit || ADMIN_PAGE_LIMIT,
            total: response.pagination?.total || 0,
            totalPages: response.pagination?.totalPages || 1
          }));
        }
      } catch (err) {
        setFeedback(err?.response?.data?.message || 'Failed to load artists');
        setArtists([]);
      }
    },
    [sorting.column, sorting.order]
  );

  useEffect(() => {
    loadArtists(1);
  }, [loadArtists]);

  const handleChange = useCallback((event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [formErrors]);

  const handleNameChange = useCallback((event) => {
    const name = event.target.value;
    const slug = slugify(name);
    setForm((prev) => ({
      ...prev,
      name,
      slug
    }));
    if (formErrors.name) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.name;
        return newErrors;
      });
    }
  }, [formErrors]);

  const handleBioChange = useCallback((value) => {
    setForm((prev) => ({
      ...prev,
      bio: value
    }));
    if (formErrors.bio) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.bio;
        return newErrors;
      });
    }
  }, [formErrors]);

  const handleImageChange = useCallback((imageData) => {
    setForm((prev) => ({
      ...prev,
      imageUrl: imageData
    }));
    if (formErrors.imageUrl) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.imageUrl;
        return newErrors;
      });
    }
  }, [formErrors]);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setFeedback('');
      setFormErrors({});

      // Validate form
      const errors = validateArtistForm(form);
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }

      setIsSubmitting(true);

      try {
        const payload = {
          name: form.name.trim(),
          slug: form.slug.trim(),
          bio: form.bio || null,
          imageUrl: form.imageUrl || null,
          country: form.country || null,
          isActive: Boolean(form.isActive)
        };

        if (editingId) {
          await artistService.update(editingId, payload);
          setFeedback('Artist updated successfully');
        } else {
          await artistService.create(payload);
          setFeedback('Artist created successfully');
        }

        resetForm();
        await loadArtists(editingId ? pagination.page : 1);
      } catch (err) {
        setFeedback(err?.response?.data?.message || 'Failed to save artist');
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, editingId, loadArtists, resetForm, pagination.page]
  );

  const handleEdit = useCallback((artist) => {
    setEditingId(artist.id);
    setForm({
      name: artist.name || '',
      slug: artist.slug || '',
      bio: artist.bio || '',
      imageUrl: artist.imageUrl || artist.image_url || '',
      country: artist.country || '',
      isActive: Boolean(artist.isActive || artist.is_active)
    });
    setFormErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleDelete = useCallback(
    async (artistId) => {
      if (!confirm('Are you sure you want to delete this artist?')) {
        return;
      }

      try {
        setFeedback('');
        await artistService.remove(artistId);
        const targetPage = artists.length === 1 && pagination.page > 1 ? pagination.page - 1 : pagination.page;
        await loadArtists(targetPage);
        setFeedback('Artist deleted successfully');
      } catch (err) {
        setFeedback(err?.response?.data?.message || 'Failed to delete artist');
      }
    },
    [artists.length, loadArtists, pagination.page]
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
      loadArtists(pagination.page - 1);
    }
  }, [loadArtists, pagination.page]);

  const handleNextPage = useCallback(() => {
    if (pagination.page < pagination.totalPages) {
      loadArtists(pagination.page + 1);
    }
  }, [loadArtists, pagination.page, pagination.totalPages]);

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
      <h1>Artist Management</h1>
      <p className="section-subtitle">Create and manage artist records for the catalog</p>

      {feedback && <p className={feedback.includes('successfully') ? 'success-text' : 'error-text'}>{feedback}</p>}

      <form className="panel form-grid" onSubmit={handleSubmit}>
        <h3>{editingId ? 'Edit Artist' : 'Create Artist'}</h3>

        <div>
          <label htmlFor="name">
            Artist Name <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            id="name"
            name="name"
            placeholder="Enter artist name"
            value={form.name}
            onChange={handleNameChange}
            required
            style={{
              borderColor: formErrors.name ? '#dc3545' : undefined
            }}
          />
          {formErrors.name && <p style={{ color: '#dc3545', fontSize: '0.875rem' }}>{formErrors.name}</p>}
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
          <label htmlFor="country">Country</label>
          <select
            id="country"
            name="country"
            value={form.country}
            onChange={handleChange}
            style={{
              borderColor: formErrors.country ? '#dc3545' : undefined
            }}
          >
            <option value="">Select a country</option>
            {COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {formErrors.country && <p style={{ color: '#dc3545', fontSize: '0.875rem' }}>{formErrors.country}</p>}
        </div>

        <div>
          <label htmlFor="bio">Biography</label>
          <RichTextEditor
            value={form.bio}
            onChange={handleBioChange}
            placeholder="Enter artist biography"
            maxLength={4000}
          />
          {formErrors.bio && <p style={{ color: '#dc3545', fontSize: '0.875rem' }}>{formErrors.bio}</p>}
        </div>

        <div>
          <label>Artist Image</label>
          <FileUpload value={form.imageUrl} onChange={handleImageChange} label="Choose Image to Upload" />
          {formErrors.imageUrl && <p style={{ color: '#dc3545', fontSize: '0.875rem' }}>{formErrors.imageUrl}</p>}
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
            {isSubmitting ? (editingId ? 'Updating...' : 'Creating...') : editingId ? 'Update Artist' : 'Create Artist'}
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
            Page {pagination.page} of {pagination.totalPages} ({pagination.total} artists)
          </span>
          <button type="button" onClick={handleNextPage} disabled={pagination.page >= pagination.totalPages}>
            Next →
          </button>
        </div>

        <table className="song-table">
          <thead>
            <tr>
              <SortableHeader column="name" label="Name" />
              <SortableHeader column="country" label="Country" />
              <SortableHeader column="is_active" label="Status" />
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {artists.length > 0 ? (
              artists.map((artist) => (
                <tr key={artist.id}>
                  <td>{artist.name}</td>
                  <td>{artist.country || '−'}</td>
                  <td>{artist.isActive || artist.is_active ? 'Active' : 'Inactive'}</td>
                  <td className="action-cell">
                    <button
                      type="button"
                      onClick={() => handleEdit(artist)}
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
                      onClick={() => handleDelete(artist.id)}
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
                <td colSpan={4}>No artists added yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ArtistManagementPage;
