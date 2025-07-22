import React, { useEffect } from 'react';
import { useTheme } from './components/Theme/theme';
import 'rsuite/dist/rsuite.min.css';
import '@fontsource/pt-sans';
import { Container, Header, Content, Footer as RSFooter} from 'rsuite';
import './App.css';
import Footer from './components/ui/Footer/Footer';
 import NavbarSection from './components/ui/NavBar/NavbarSection';
import ThemeToggle from './components/Theme/ThemeToggle';
 import { getThemeVars } from './components/Theme/themeVars';
 import Home from './components/ui/Home';
import AppRoutes from './routes';
import { useDispatch, useSelector } from 'react-redux';
import NotificationsSystem, {
  wyboTheme,
  dismissNotification,
  FadeTransition,
  setUpNotifications
} from "reapop";
import { useLocation } from 'react-router-dom';

function App() {
  const { theme } = useTheme();
  const {
    isDark,
    bgMain,
    textMain,
    borderColor,
    footerBg,
    footerText,
    subText,
    muted,
  } = getThemeVars(theme);
const dispatch = useDispatch();
const notifications = useSelector((state)   => state?.notifications);

setUpNotifications({
  defaultProps: {
    title: "MicroFin",
    position: "top-right",
    dismissible: true,
    dismissAfter: 5000,
    showDismissButton: true,
  },
});
const location = useLocation();
const path = location.pathname;

// Define routes that have a sidebar
const routesWithSidebar = ['/dashboard'];

// Check if the current route is one of the routes with a sidebar
const hasSidebar = routesWithSidebar.some(route => path.startsWith(route));

// Global ResizeObserver error handler
useEffect(() => {
  // Suppress ResizeObserver errors globally
  const originalError = console.error;
  const originalWarn = console.warn;
  
  console.error = (...args) => {
    const message = args[0];
    if (typeof message === 'string' && 
        (message.includes('ResizeObserver') || 
         message.includes('ResizeObserver loop') ||
         message.includes('ResizeObserver loop completed') ||
         message.includes('ResizeObserver loop limit exceeded'))) {
      return; // Suppress ResizeObserver errors
    }
    originalError.apply(console, args);
  };

  console.warn = (...args) => {
    const message = args[0];
    if (typeof message === 'string' && 
        (message.includes('ResizeObserver') || 
         message.includes('ResizeObserver loop') ||
         message.includes('ResizeObserver loop completed') ||
         message.includes('ResizeObserver loop limit exceeded'))) {
      return; // Suppress ResizeObserver warnings
    }
    originalWarn.apply(console, args);
  };

  // Handle unhandled promise rejections that might be related to ResizeObserver
  const handleUnhandledRejection = (event) => {
    const message = event.reason?.message || event.reason || '';
    if (typeof message === 'string' && message.includes('ResizeObserver')) {
      event.preventDefault();
      return;
    }
  };

  window.addEventListener('unhandledrejection', handleUnhandledRejection);

  // Cleanup function
  return () => {
    console.error = originalError;
    console.warn = originalWarn;
    window.removeEventListener('unhandledrejection', handleUnhandledRejection);
  };
}, []);

  return (
    <Container style={{ background: bgMain, color: textMain }}>
      <Header >
        <NavbarSection textMain={textMain} borderColor={borderColor} bgMain={bgMain} isDark={isDark} ThemeToggle={ThemeToggle} muted={muted} />
      </Header>
      <Content>
      <NotificationsSystem
        notifications={notifications}
        dismissNotification={(id) => dispatch(dismissNotification(id))}
        theme={wyboTheme}
        smallScreenBreakpoint
        components={{ Transition: FadeTransition }}
      /> 
        <AppRoutes />
      </Content>
      <RSFooter>
        {!hasSidebar && (
          <Footer footerBg={footerBg} footerText={footerText} subText={subText} />
        )}
      </RSFooter>
    </Container>
  );
}

export default App;
