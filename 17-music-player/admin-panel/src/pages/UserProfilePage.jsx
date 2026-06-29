import React, { useEffect, useState } from 'react';

import { useAdminAuth } from '../context/AdminAuthContext';
import { userService } from '../services/userService';

const UserProfilePage = () => {
  const { admin } = useAdminAuth();
  const [form, setForm] = useState({
    fullName: '',
    username: '',
    email: '',
    bio: '',
    avatarUrl: ''
  });
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (admin) {
      setForm({
        fullName: admin.fullName || '',
        username: admin.username || '',
        email: admin.email || '',
        bio: admin.bio || '',
        avatarUrl: admin.avatarUrl || ''
      });
    }
  }, [admin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback('');

    try {
      await userService.update(admin.id, {
        fullName: form.fullName,
        bio: form.bio,
        avatarUrl: form.avatarUrl
      });
      setFeedback('Profile updated successfully');
    } catch (err) {
      setFeedback(err?.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h1>My Profile</h1>
      <p className="section-subtitle">Update your account information</p>

      <div className="panel">
        <form className="form-grid" onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
            <div>
              <label>Full Name</label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
              />
            </div>

            <div>
              <label>Username (Read-only)</label>
              <input type="text" value={form.username} disabled />
            </div>

            <div>
              <label>Email (Read-only)</label>
              <input type="email" value={form.email} disabled />
            </div>

            <div>
              <label>Bio</label>
              <textarea
                rows={3}
                value={form.bio}
                onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
                placeholder="Tell us about yourself"
              />
            </div>

            <div>
              <label>Avatar URL</label>
              <input
                type="url"
                value={form.avatarUrl}
                onChange={(e) => setForm((p) => ({ ...p, avatarUrl: e.target.value }))}
                placeholder="https://..."
              />
            </div>

            {feedback && (
              <p className={feedback.includes('success') ? 'helper-text' : 'error-text'}>{feedback}</p>
            )}

            <button type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UserProfilePage;
