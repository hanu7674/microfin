import React from 'react';
import { Button, Header } from 'rsuite';
import { FaStar, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import image from './image.png'
function HeroSection({ bgMain, textMain, subText, isDark, muted, id }) {
  const navigate = useNavigate(); 

  const handleAction = () => {
    navigate('/signup');
  }
  return (
    <section id={id}>
    <Header>
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', margin: '0 auto', padding: '5%', background: bgMain, color: textMain }}>
      <div style={{ flex: '1 1 400px', minWidth: 320, maxWidth: 540 }}>
        <h1 style={{ fontSize: 48, fontWeight: 700, marginBottom: 24, lineHeight: 1.1 }}>Microfinance Made Simple</h1>
        <p style={{ fontSize: 20, marginBottom: 32, color: subText }}>
          Streamline your microfinance operations with our comprehensive platform. Manage loans, track payments, and grow your business efficiently.
        </p>
        <div style={{ display: 'flex', gap: 16, marginBottom: 28 }}>
          <Button onClick={handleAction} style={{ background: isDark ? '#fff' : '#000', color: isDark ? '#000' : '#fff', borderRadius: 6, fontWeight: 600, fontSize: 18, padding: '12px 28px' }}>Start Free Trial</Button>
          <Button variant="outline" onClick={handleAction} style={{
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
      <div style={{ flex: '1 1 400px', padding: '2%', minWidth: 320,  borderRadius: 12, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 32 }}>
         <img src={image} alt="Dashboard Preview" style={{ width: '100%', height: '100%', objectFit: 'cover',  borderRadius: 12, }} />
      </div>
    </div>
    </Header>
    </section>
  );
}

export default HeroSection; 