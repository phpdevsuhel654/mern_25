import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { setAuthToken } from '../api/httpClient';
import { checkAdmin, getProfile, loginAdmin } from '../services/authService';

const AdminAuthContext = createContext(null);
const TOKEN_KEY = 'music_admin_token';

export const AdminAuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  useEffect(() => {
    const init = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const allowed = await checkAdmin();
        if (!allowed) {
          throw new Error('Not admin');
        }
        const profile = await getProfile();
        setAdmin(profile);
      } catch (_error) {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setAuthToken(null);
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [token]);

  const login = async ({ identifier, password }) => {
    const data = await loginAdmin({ identifier, password });
    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    setAdmin(data.user);

    const allowed = await checkAdmin();
    if (!allowed) {
      localStorage.removeItem(TOKEN_KEY);
      setToken(null);
      setAuthToken(null);
      setAdmin(null);
      throw new Error('Account is not admin');
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setAuthToken(null);
    setAdmin(null);
  };

  const value = useMemo(
    () => ({
      token,
      admin,
      loading,
      isAuthenticated: Boolean(token),
      login,
      logout
    }),
    [token, admin, loading]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
};
