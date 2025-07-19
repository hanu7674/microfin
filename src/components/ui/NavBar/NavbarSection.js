import React, { useState } from 'react';
import { Container, Header, Navbar, Nav, Button, Drawer, IconButton, Avatar, Badge } from 'rsuite';
import { FaBell, FaChartLine } from 'react-icons/fa';
import MenuIcon from '@rsuite/icons/Menu';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../../redux/auth';
import { NavLink } from 'react-router-dom';

const NavbarSection = ({ textMain, borderColor, bgMain, isDark, ThemeToggle, muted }) => {
  const [open, setOpen] = useState(false);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  const userDisplay = auth.user?.firstName
    ? `${auth.user.firstName} ${auth.user.lastName || ''}`.trim()
    : auth.user?.email;
  return (
    <Container>
      <Header>
        <Navbar appearance="subtle" style={{ position:"fixed", top: 0, left: 0, right: 0, zIndex: 1000, borderBottom: `1px solid ${borderColor}`, background: bgMain, color: textMain, padding: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
             <Navbar.Brand style={{ fontWeight: 700, fontSize: 22, display: 'flex', alignItems: 'center', gap: 8, color: textMain }}>
              <FaChartLine style={{ color: 'var(--color-primary)' }} /> MicroFin
            </Navbar.Brand>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <Nav className="desktop-nav" style={{ display: 'flex', gap: 24 }}>
              </Nav>
            </div>

            {
              !auth.isAuthenticated && (
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <Nav className="desktop-nav" style={{ display: 'flex', gap: 24 }}>
                <Nav.Item as={NavLink} to="#features" style={{ color: textMain, background: bgMain }}>Features</Nav.Item>
                <Nav.Item as={NavLink} to="#pricing" style={{ color: textMain, background: bgMain }}>Pricing</Nav.Item>
                <Nav.Item as={NavLink} to="#about" style={{ color: textMain, background: bgMain }}>About</Nav.Item>
                <Nav.Item as={NavLink} to="#contact" style={{ color: textMain, background: bgMain }}>Contact</Nav.Item>
              </Nav>
            </div>
              )
            }
            
            <Nav pullRight className="desktop-nav" style={{ display: 'flex', alignItems: 'center' }}>
              {auth.isAuthenticated ? (
                <>
                  <Nav.Item style={{ color: textMain, background: bgMain, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                    
                    <Badge content="9" >
                    <FaBell color={isDark ? '#aaa' : '#666'}   size={24} />
                    </Badge>
                  </Nav.Item>


                  <Nav.Item style={{ color: textMain, background: bgMain, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Avatar circle src={auth?.user?.photoURL} style={{ marginRight: 8 }} /> 
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{userDisplay}</span>
                  </Nav.Item>
                  <Button appearance="subtle" onClick={handleLogout} style={{ marginLeft: 8, color: isDark ? '#000' : '#fff', background: isDark ? '#fff' : '#000', borderRadius: 6 }}>Logout</Button>
                </>
              ) : (
                <>
                  <Nav.Item as={NavLink} to="/login" style={{ color: textMain, background: bgMain }}>Sign In</Nav.Item>
                  <Button as={NavLink} to="/signup" style={{ marginLeft: 8, background: isDark ? '#fff' : '#000', color: isDark ? '#000' : '#fff', borderRadius: 6 }}>Get Started</Button>
                </>
              )}
              <ThemeToggle />
            </Nav>
            {/* Mobile menu icon always far right */}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
              <IconButton
                icon={<MenuIcon />}
                style={{ display: 'none', color: textMain, background: bgMain }}
                className="mobile-menu-btn"
                onClick={() => setOpen(true)}
                appearance="subtle"
                aria-label="Open navigation menu"
              />
            </div>
          </div>
        </Navbar>
        {/* Drawer for mobile nav */}
        <Drawer open={open} onClose={() => setOpen(false)} placement="right" size="xs" style={{ background: bgMain, color: textMain }}>
          <Drawer.Header style={{ background: bgMain, color: textMain }}>
            <Drawer.Title style={{ color: textMain }}>Menu</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body style={{ background: bgMain, color: textMain }}>
            <Nav vertical>
              <Nav.Item as={NavLink} to="#features" onClick={() => setOpen(false)} style={{ color: textMain, background: bgMain }}>Features</Nav.Item>
              <Nav.Item as={NavLink} to="#pricing" onClick={() => setOpen(false)} style={{ color: textMain, background: bgMain }}>Pricing</Nav.Item>
              <Nav.Item as={NavLink} to="#about" onClick={() => setOpen(false)} style={{ color: textMain, background: bgMain }}>About</Nav.Item>
              <Nav.Item as={NavLink} to="#contact" onClick={() => setOpen(false)} style={{ color: textMain, background: bgMain }}>Contact</Nav.Item>
              {auth.isAuthenticated ? (
                <>
                  <Nav.Item style={{ color: textMain, background: bgMain, fontWeight: 600 }}>{userDisplay}</Nav.Item>
                  <Button appearance="subtle" onClick={() => { setOpen(false); handleLogout(); }} style={{ margin: '16px 0', color: isDark ? '#000' : '#fff', background: isDark ? '#fff' : '#000', borderRadius: 6, width: '100%' }}>Logout</Button>
                </>
              ) : (
                <>
                  <Nav.Item as={NavLink} to="/login" onClick={() => setOpen(false)} style={{ color: textMain, background: bgMain }}>Sign In</Nav.Item>
                  <Button as={NavLink} to="/signup" onClick={() => setOpen(false)} style={{ margin: '16px 0', background: isDark ? '#fff' : '#000', color: isDark ? '#000' : '#fff', borderRadius: 6, width: '100%' }}>Get Started</Button>
                </>
              )}
              <div style={{ marginTop: 16 }}><ThemeToggle /></div>
            </Nav>
          </Drawer.Body>
        </Drawer>
        {/* Responsive styles */}
        <style>{`
          @media (max-width: 900px) {
            .desktop-nav { display: none !important; }
            .mobile-menu-btn { display: inline-flex !important; }
            .rs-navbar-brand { margin-right: auto !important; }
          }
          @media (min-width: 901px) {
            .mobile-menu-btn { display: none !important; }
          }
        `}</style>
      </Header>
    </Container>
  );
};

export default NavbarSection; 