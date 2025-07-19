import React from 'react';
import { FaChartLine, FaTwitter, FaFacebook, FaGithub } from 'react-icons/fa';

function Footer({ footerBg, footerText, subText }) {
  const socialLinks = [
    { icon: <FaTwitter />, url: 'https://twitter.com/microfin' },
    { icon: <FaFacebook />, url: 'https://www.facebook.com/microfin' },
    { icon: <FaGithub />, url: 'https://github.com/microfin' },
  ];
  const links = [
    { text: 'About', url: '#about' },
    { text: 'Careers', url: '#careers' },
    { text: 'Contact', url: '#contact' },
    { text: 'Blog', url: '#blog' },
  ]

  return (
    <footer style={{ background: footerBg, color: footerText, padding: '40px 0 16px 0', fontSize: 16 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: '1 1 300px', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 22, marginBottom: 8 }}>
            <FaChartLine style={{ color: 'var(--color-primary)' }} /> MicroFin
          </div>
          <div style={{ color: subText, fontSize: 15, marginBottom: 16 }}>Empowering microfinance institutions with modern technology solutions.</div>
          <div style={{ display: 'flex', gap: 16 }}>
            {socialLinks.map((link, index) => (
              <a key={index} href={link.url} style={{ color: '#fff', fontSize: 20 }}>{link.icon}</a>
            ))}
          </div>
        </div>
        <div style={{ flex: '1 1 200px', marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 10 }}>Company</div>
          {links.map((link, index) => (
            <div key={index}><a href={link.url} style={{ color: '#fff', textDecoration: 'none', display: 'block', marginBottom: 6 }}>{link.text}</a></div>
          ))}
        </div>
      </div>
      <div style={{ textAlign: 'center', color: subText, fontSize: 14, marginTop: 32 }}>
        © 2025 MicroFin. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer; 