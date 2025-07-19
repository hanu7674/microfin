import React from 'react';
import { Button, Header } from 'rsuite';
import { FaStar, FaUsers } from 'react-icons/fa';

function HeroSection({ bgMain, textMain, subText, isDark, borderColor, muted }) {
  return (
    <Header>
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', margin: '0 auto', padding: '5%', background: bgMain, color: textMain }}>
      <div style={{ flex: '1 1 400px', minWidth: 320, maxWidth: 540 }}>
        <h1 style={{ fontSize: 48, fontWeight: 700, marginBottom: 24, lineHeight: 1.1 }}>Microfinance Made Simple</h1>
        <p style={{ fontSize: 20, marginBottom: 32, color: subText }}>
          Streamline your microfinance operations with our comprehensive platform. Manage loans, track payments, and grow your business efficiently.
        </p>
        <div style={{ display: 'flex', gap: 16, marginBottom: 28 }}>
          <Button style={{ background: isDark ? '#fff' : '#000', color: isDark ? '#000' : '#fff', borderRadius: 6, fontWeight: 600, fontSize: 18, padding: '12px 28px' }}>Start Free Trial</Button>
          <Button variant="outline" style={{
            fontWeight: 600,
            fontSize: 18,
            padding: '12px 28px',
            borderRadius: 6,
            background: isDark ? '#000' : '#fff', 
            border: isDark ? '1px solid #fff' : '1px solid #000',
            color: isDark ? '#fff' : '#000'
          }}>Watch Demo</Button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, fontSize: 16, color: muted }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><FaStar style={{ color: '#FFD700' }} /> 4.9/5 Rating</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><FaUsers /> 10,000+ Users</span>
        </div>
      </div>
      <div style={{ flex: '1 1 400px', minWidth: 320, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 32 }}>
        <div style={{ width: 420, height: 240, background: isDark ? '#333' : '#bbb', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 22, fontWeight: 500 }}>
          Dashboard Preview
        </div>
      </div>
    </div>
    </Header>
  );
}

export default HeroSection; 