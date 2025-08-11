"use client";

import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';

type Theme = 'light' | 'dark';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const stored = (typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY)) as Theme | null;
    const preferredDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial: Theme = stored || (preferredDark ? 'dark' : 'light');
    setTheme(initial);
    document.documentElement.classList.toggle('dark', initial === 'dark');
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try { localStorage.setItem(STORAGE_KEY, theme); } catch {}
  }, [theme]);

  return (
    <button
      aria-label="Toggle theme"
      className="fixed bottom-4 right-4 z-50 rounded-full border bg-white/80 dark:bg-gray-800/80 backdrop-blur px-3 py-2 text-xs text-gray-700 dark:text-gray-200 shadow"
      onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
    >
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  );
};

export default ThemeToggle;
