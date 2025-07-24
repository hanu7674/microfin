import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { CustomProvider } from 'rsuite';
const ThemeContext = createContext();

 export function loadRsuiteTheme(theme) {
   const existing = document.getElementById('rsuite-theme');
  if (existing) existing.remove();

   let href = '';
  if (theme === 'dark') {
    href = 'https://cdn.jsdelivr.net/npm/rsuite@5.60.0/dist/rsuite-dark.min.css';
  } else if (theme === 'high-contrast') {
    href = 'https://cdn.jsdelivr.net/npm/rsuite@5.60.0/dist/rsuite-high-contrast.min.css';
  } else {
    href = 'https://cdn.jsdelivr.net/npm/rsuite@5.60.0/dist/rsuite.min.css';
  }

   if (document.querySelector(`link[href="${href}"]`)) return;

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

   const setTheme = useCallback((newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    loadRsuiteTheme(newTheme);
  }, []);

   const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme) // Store the value, not the function
  }, [theme, setTheme]);

   useEffect(() => {
    loadRsuiteTheme(theme);
  }, [theme]);

   return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      <CustomProvider theme={theme}>
        {children}
      </CustomProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext); 