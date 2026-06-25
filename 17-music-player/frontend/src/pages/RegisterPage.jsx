import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { APP_ROUTES } from '../constants/appRoutes';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ fullName: '', username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      await register(form);
      navigate(APP_ROUTES.library);
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <section className="auth-card">
      <h1>Create Account</h1>
      <form onSubmit={submit} className="form-grid">
        <input placeholder="Full name" value={form.fullName} onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))} />
        <input placeholder="Username" value={form.username} onChange={(e) => setForm((p) => ({ ...p, username: e.target.value }))} />
        <input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
        <input placeholder="Password" type="password" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} />
        {error && <p className="error-text">{error}</p>}
        <button type="submit">Register</button>
      </form>
      <p>
        Already registered? <Link to={APP_ROUTES.login}>Sign in</Link>
      </p>
    </section>
  );
};

export default RegisterPage;
