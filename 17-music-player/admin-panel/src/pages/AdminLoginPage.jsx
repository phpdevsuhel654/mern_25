import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ADMIN_ROUTES } from '../constants/adminRoutes';
import { useAdminAuth } from '../context/AdminAuthContext';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAdminAuth();
  const [form, setForm] = useState({ identifier: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    if (loading) return; // Prevent double submissions
    
    setError('');
    setLoading(true);

    try {
      await login(form);
      navigate(ADMIN_ROUTES.dashboard);
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || 'Admin login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="center-card">
      <h1>Admin Login</h1>
      <form onSubmit={submit} className="form-grid">
        <input
          placeholder="Email or username"
          value={form.identifier}
          onChange={(e) => setForm((prev) => ({ ...prev, identifier: e.target.value }))}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
          disabled={loading}
        />
        {error && <p className="error-text">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </section>
  );
};

export default AdminLoginPage;
