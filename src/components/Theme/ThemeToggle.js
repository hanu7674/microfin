import React from 'react';
import { useTheme } from './theme';
import { IconButton } from 'rsuite';
import { FaMoon, FaSun } from 'react-icons/fa';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <IconButton circle appearance='link' size='lg'
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        color: isDark ? '#fff' : '#222',
        cursor: 'pointer',
        
      }}
      icon={isDark ? <FaSun color="#FFD700" /> : <FaMoon color="#6C7A89" />}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    />
  );
}

export default ThemeToggle; 