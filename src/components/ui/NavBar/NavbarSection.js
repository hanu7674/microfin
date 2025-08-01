import React, { useState } from 'react';
import { Container, Header, Navbar, Nav, Button, Drawer, IconButton, Avatar, Badge, Whisper, Popover, List, Stack, Divider } from 'rsuite';
import { FaBell, FaChartLine, FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimes } from 'react-icons/fa';
import MenuIcon from '@rsuite/icons/Menu';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../../redux/auth';
import { NavLink, useNavigate } from 'react-router-dom';

const NavbarSection = ({ textMain, borderColor, bgMain, isDark, ThemeToggle, muted }) => {
  const [open, setOpen] = useState(false);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    dispatch(logoutUser(navigate));
  };
  
  const userDisplay = auth.user?.displayName || auth.user?.email || 'User';

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Payment Received',
      message: 'Payment of $1,250 has been received from Client A',
      time: '2 minutes ago',
      icon: <FaCheckCircle style={{ color: '#00c851' }} />
    },
    {
      id: 2,
      type: 'warning',
      title: 'Invoice Overdue',
      message: 'Invoice #INV-2024-001 is overdue by 5 days',
      time: '1 hour ago',
      icon: <FaExclamationTriangle style={{ color: '#ffbb33' }} />
    },
    {
      id: 3,
      type: 'info',
      title: 'New Client Added',
      message: 'Client B has been added to your client list',
      time: '3 hours ago',
      icon: <FaInfoCircle style={{ color: '#33b5e5' }} />
    },
    {
      id: 4,
      type: 'success',
      title: 'Loan Approved',
      message: 'Your loan application has been approved',
      time: '1 day ago',
      icon: <FaCheckCircle style={{ color: '#00c851' }} />
    },
    {
      id: 5,
      type: 'warning',
      title: 'System Maintenance',
      message: 'Scheduled maintenance in 2 hours',
      time: '2 days ago',
      icon: <FaExclamationTriangle style={{ color: '#ffbb33' }} />
    }
  ];

  const NotificationsPopover = React.forwardRef((props, ref) => (
    
    <Popover
       ref={ref}
       title={
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '8px 0'
        }}>
          <span style={{ fontWeight: 600, fontSize: 16 }}>Notifications</span>
                  </div>
      }
      style={{ width: 350, maxHeight: 400, overflow: 'hidden' }}
      {...props}
    >
      <div style={{ maxHeight: 300, overflowY: 'scroll' }}>
        {notifications.length > 0 ? (
          <List hover>
            {notifications.map((notification, index) => (
              <div key={notification.id}>
                <List.Item
                  style={{
                    padding: '12px 16px',
                    borderBottom: index < notifications.length - 1 ? `1px solid ${borderColor}` : 'none',
                    cursor: 'pointer',
                   }}
                  
                >
                  <Stack spacing={12} alignItems="flex-start">
                    <Stack.Item>
                      {notification.icon}
                    </Stack.Item>
                    <Stack.Item style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>
                        {notification.title}
                      </div>
                      <div style={{ fontSize: 12, color: muted, lineHeight: 1.4 }}>
                        {notification.message}
                      </div>
                      <div style={{ fontSize: 11, color: muted, marginTop: 4 }}>
                        {notification.time}
                      </div>
                    </Stack.Item>
                  </Stack>
                </List.Item>
              </div>
            ))}
          </List>
        ) : (
          <div style={{ 
            padding: '32px 16px', 
            textAlign: 'center', 
            color: muted,
            fontSize: 14
          }}>
            No notifications
          </div>
        )}
      </div>
      
    </Popover>
  ));
  
  return (
    <Container>
      <Header>
        <Navbar appearance="subtle" style={{ position:"fixed", top: 0, left: 0, right: 0, zIndex: 1000, borderBottom: `1px solid ${borderColor}`, background: bgMain, color: textMain, padding: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
             <Navbar.Brand as={NavLink} to="/" style={{ fontWeight: 700, fontSize: 22, display: 'flex', alignItems: 'center', gap: 8, color: textMain }}>
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
                <Nav.Item as={NavLink} to="/#features" style={{ color: textMain, background: bgMain }}>Features</Nav.Item>
                <Nav.Item as={NavLink} to="/#pricing" style={{ color: textMain, background: bgMain }}>Pricing</Nav.Item>
                <Nav.Item as={NavLink} to="/#about" style={{ color: textMain, background: bgMain }}>About</Nav.Item>
                <Nav.Item as={NavLink} to="/#contact" style={{ color: textMain, background: bgMain }}>Contact</Nav.Item>
              </Nav>
            </div>
              )
            }
            
            <Nav pullRight className="desktop-nav" style={{ display: 'flex', alignItems: 'center' }}>
              {auth.isAuthenticated ? (
                <>
                  <Nav.Item style={{ color: textMain, background: bgMain, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Whisper
                      trigger="click"
                      placement="bottomEnd"
                      speaker={<NotificationsPopover />}
                    >
                      <Badge content={notifications.length} style={{ cursor: 'pointer' }}>
                        <FaBell 
                          size={24} 
                          style={{ cursor: 'pointer' }}
                        />
                      </Badge>
                    </Whisper>
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