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
    cardBorderBottomColor: isDark ? '#333' : '#eee',
    success: isDark ? '#1e7e34' : '#1e7e34',
    warning: isDark ? '#f57c00' : '#f57c00',
    selectedPlanTheme: isDark ? '#1677ff' : '#1677ff',
    selectedPlanText: isDark ? '#fff' : '#fff',
    selectedPlanBg: isDark ? '#1677ff' : '#1677ff',
    selectedPlanBorder: isDark ? '#1677ff' : '#1677ff',
    selectedPlanBorderHover: isDark ? '#0056b3' : '#0056b3',
    selectedPlanTextHover: isDark ? '#fff' : '#fff',
    selectedPlanBgHover: isDark ? '#1677ff' : '#1677ff',
  };
} 