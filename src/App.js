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
