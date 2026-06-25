import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { setAuthToken } from '../api/httpClient';
import { getMyProfile, loginUser, registerUser } from '../services/authService';

const AuthContext = createContext(null);
const TOKEN_KEY = 'music_player_token';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(null);
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
        const profile = await getMyProfile();
        setUser(profile);
      } catch (_error) {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setAuthToken(null);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [token]);

  const register = async (payload) => {
    const data = await registerUser(payload);
    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    setUser(data.user);
  };

  const login = async (payload) => {
    const data = await loginUser(payload);
    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setAuthToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      isAuthenticated: Boolean(token),
      register,
      login,
      logout,
      setUser
    }),
    [token, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
