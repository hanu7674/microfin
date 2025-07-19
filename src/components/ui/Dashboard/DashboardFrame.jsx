import React, { useEffect, useState } from 'react';
import { Container, Sidebar, Sidenav, Content, Nav,Navbar, DOMHelper } from 'rsuite';
import { Outlet , NavLinkProps, NavLink as BaseNavLink } from 'react-router-dom';
import ArrowLeftLineIcon from '@rsuite/icons/ArrowLeftLine';
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine';
import { withAuthentication } from '../../../Session';
import FooterPage from './DashboardFooter';
import './index.css'
import { useTheme } from '../../Theme/theme';
import { getThemeVars } from '../../Theme/themeVars';
const { getHeight, on } = DOMHelper;

const NavToggle = ({ expand, onChange, width, themeVars }) => {
  return (
    <Navbar appearance="subtle" className="nav-toggle" style={{width: width}}>
      <Nav pullRight>
        <Nav.Item
          onClick={onChange}
          style={{ textAlign: 'start', color: themeVars.textMain, backgroundColor: themeVars.cardBg}}
          icon={expand ? <ArrowLeftLineIcon color={themeVars.textMain} /> : <ArrowRightLineIcon color={themeVars.textMain} />}
        />
      </Nav>
    </Navbar>
  );
};
const NavItem = (props) => {
  const { title, eventKey, icon, ...rest } = props;
  return (
    <Nav.Item icon={icon} eventKey={eventKey} as={NavLink} {...rest} style={{ color: props.textMain, backgroundColor: props.bgColor}}>
      {title} 
    </Nav.Item>
  );
};

const NavLink = React.forwardRef(({ to, children, ...rest }, ref) => {
  return (
    <BaseNavLink ref={ref} to={to} {...rest}>
      {children}
    </BaseNavLink>
  );
});
const DashboardFrame = (props) => {
  const { navs } = props;
  const [expand, setExpand] = useState(true);
  const [windowHeight, setWindowHeight] = useState(getHeight(window));
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { theme } = useTheme();
  const themeVars = getThemeVars(theme);
 
  const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
  useEffect(() => {
      window.addEventListener('resize', handleResize);
          return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  useEffect(()=>{
      if(windowWidth <= 700){
        setExpand(false);
      }
       
      else{
        setExpand(true)
      }
  }, [windowWidth])
  useEffect(() => {
    setWindowHeight(getHeight(window));
    const resizeListener = on(window, 'resize', () => setWindowHeight(getHeight(window)));

    return () => {
      resizeListener.off();
    };
    
  }, []);
 
  const containerClasses = expand ? 'page-container' : 'page-container container-full';

  const navBodyStyle = expand
    ? { height: windowHeight - 112, overflowY: 'hidden', color: themeVars.textMain,}
    : { color: themeVars.textMain, backgroundColor: themeVars.cardBg};
  return (
    <Container className="frame">
      <Sidebar appearance="default" style={{ display: 'flex', flexDirection: 'column', position: 'fixed', zIndex: 1000, marginTop: '56.8px', backgroundColor: themeVars.cardBg}} width={expand ? 260 : 56} collapsible>
        <Sidenav expanded={expand} appearance="subtle" style={{backgroundColor: themeVars.cardBg}}>
          <Sidenav.Body style={navBodyStyle}>
            <Nav>
              {navs?.map((item) => {
                const { children,  ...rest } = item;
                if (children) {
                  return (
                    <Nav.Menu key={item.eventKey} placement="rightStart" trigger="hover" {...rest}>
                      {children.map((child) => {
                        return <NavItem key={child.eventKey} textMain={themeVars.textMain} {...child}  />;
                      })}
                    </Nav.Menu>
                  );
                }

                if (rest.target === '_blank') {
                  return (
                    <Nav.Item key={item.eventKey} textMain={themeVars.textMain} {...rest}>
                      {item.title}
                    </Nav.Item>
                  );
                }

                return <NavItem key={rest.eventKey} icon textMain={themeVars.textMain} {...rest} />;
              })}
            </Nav>
          </Sidenav.Body>
        </Sidenav>
        <NavToggle expand={expand} onChange={() => setExpand(!expand)} width={expand ? 260 : 56} themeVars={themeVars} />
      </Sidebar>

      <Container className={containerClasses}>
        <Content>
          <Outlet />
          <FooterPage />
         </Content>
      </Container>
    </Container>
  );
};
 
export default withAuthentication(DashboardFrame);