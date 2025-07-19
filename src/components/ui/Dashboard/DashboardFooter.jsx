import React from 'react';
import { Stack } from 'rsuite';
import { FaChartLine, FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { useTheme } from '../../Theme/theme';
import { getThemeVars } from '../../Theme/themeVars';

const DashboardFooter = () => {
  const { theme } = useTheme();
  const { textMain, muted, bgMain } = getThemeVars(theme);

  const socialLinks = [
    { icon: <FaTwitter />, url: 'https://twitter.com/microfin', label: 'Twitter' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com/company/microfin', label: 'LinkedIn' },
    { icon: <FaFacebook />, url: 'https://facebook.com/microfin', label: 'Facebook' },
  ];

  return (
    <footer style={{ 
      background: bgMain, 
      color: textMain, 
      padding: '40px 0 20px 0',
      textAlign: 'center',
      borderTop: `1px solid ${muted}20`
    }}>
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 20px' }}>
        <Stack direction="column" spacing={16} alignItems="center">
          {/* Brand/Logo */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 8,
            marginBottom: 8
          }}>
            <FaChartLine style={{ 
              color: 'var(--color-primary)', 
              fontSize: 24 
            }} />
            <span style={{ 
              fontSize: 24, 
              fontWeight: 700, 
              color: textMain 
            }}>
              MicroFin
            </span>
          </div>

          {/* Tagline */}
          <p style={{ 
            fontSize: 16, 
            color: muted, 
            margin: 0,
            lineHeight: 1.5,
            maxWidth: 500
          }}>
            Empowering financial inclusion through innovative microfinance solutions
          </p>

          {/* Social Media Icons */}
          <div style={{ 
            display: 'flex', 
            gap: 24, 
            marginTop: 8 
          }}>
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: muted,
                  fontSize: 20,
                  transition: 'color 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  border: `1px solid ${muted}30`,
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'var(--color-primary)';
                  e.target.style.borderColor = 'var(--color-primary)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = muted;
                  e.target.style.borderColor = `${muted}30`;
                }}
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div style={{ 
            fontSize: 14, 
            color: muted, 
            marginTop: 24,
            borderTop: `1px solid ${muted}20`,
            paddingTop: 20,
            width: '100%'
          }}>
            © 2025 MicroFin. All rights reserved.
          </div>
        </Stack>
      </div>
    </footer>
  );
};

export default DashboardFooter;
