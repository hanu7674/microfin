// Theme variables for light and dark mode

export function getThemeVars(theme) {
  const isDark = theme === 'dark';
  return {
    isDark,
    bgMain: isDark ? '#18191A' : '#fff',
    bgSection: isDark ? '#23272F' : '#F7F8FA',
    textMain: isDark ? '#fff' : '#18191A',
    textSecondary: isDark ? '#bbb' : '#666',
    textLink: isDark ? '#007bff' : '#007bff',
    textLinkHover: isDark ? '#0056b3' : '#0056b3',
    bgSection: isDark ? '#23272F' : '#F7F8FA',
    cardBg: isDark ? '#23272F' : '#fff',
    cardText: isDark ? '#fff' : '#222',
    borderColor: isDark ? '#333' : '#eee',
    shadow: isDark ? '0 2px 8px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.03)',
    ctaBg: '#111',
    ctaText: '#fff',
    footerBg: isDark ? '#18191A' : '#222',
    footerText: '#fff',
    subText: isDark ? '#bbb' : '#444',
    muted: isDark ? '#aaa' : '#666',
    whitesmoke: isDark ? '#18191A' : '#F7F8FA',
    buttonAppearance: isDark ? 'subtle' : 'default',
  };
} 