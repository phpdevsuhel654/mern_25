import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'admin-theme';

const getInitialTheme = () => {
  const savedTheme = window.localStorage.getItem(STORAGE_KEY);
  return savedTheme === 'dark' ? 'dark' : 'light';
};

export const useTheme = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const isDarkTheme = useMemo(() => theme === 'dark', [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return {
    theme,
    isDarkTheme,
    toggleTheme
  };
};
