import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { APP_ROUTES } from '../constants/appRoutes';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ identifier: '', password: '' });
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      await login(form);
      navigate(APP_ROUTES.library);
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <section className="auth-card">
      <h1>Sign In</h1>
      <form onSubmit={submit} className="form-grid">
        <input
          placeholder="Email or username"
          value={form.identifier}
          onChange={(e) => setForm((prev) => ({ ...prev, identifier: e.target.value }))}
        />
        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
        />
        {error && <p className="error-text">{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p>
        No account? <Link to={APP_ROUTES.register}>Create one</Link>
      </p>
    </section>
  );
};

export default LoginPage;
