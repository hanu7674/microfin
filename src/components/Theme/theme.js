import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { CustomProvider } from 'rsuite';
const ThemeContext = createContext();

// Robust loader, can be called from anywhere
export function loadRsuiteTheme(theme) {
  // Remove any existing theme link
  const existing = document.getElementById('rsuite-theme');
  if (existing) existing.remove();

  // Choose the correct CSS file
  let href = '';
  if (theme === 'dark') {
    href = 'https://cdn.jsdelivr.net/npm/rsuite@5.60.0/dist/rsuite-dark.min.css';
  } else if (theme === 'high-contrast') {
    href = 'https://cdn.jsdelivr.net/npm/rsuite@5.60.0/dist/rsuite-high-contrast.min.css';
  } else {
    href = 'https://cdn.jsdelivr.net/npm/rsuite@5.60.0/dist/rsuite.min.css';
  }

  // Prevent duplicate loading
  if (document.querySelector(`link[href="${href}"]`)) return;

  // Create new link
  const link = document.createElement('link');
  link.id = 'rsuite-theme';
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    const stored = localStorage.getItem('theme');
    return stored ? stored : 'light';
  });

  // Set theme and persist
  const setTheme = useCallback((newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    loadRsuiteTheme(newTheme);
  }, []);

  // Toggle theme
  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme) // Store the value, not the function
  }, [theme, setTheme]);

  // On mount, ensure theme is loaded
  useEffect(() => {
    loadRsuiteTheme(theme);
  }, [theme]);

  // Expose setTheme, toggleTheme, and theme
  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      <CustomProvider theme={theme}>
        {children}
      </CustomProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext); 