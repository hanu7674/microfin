import React from 'react';
import { Button } from 'rsuite';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function CTASection({ ctaBg, ctaText, isDark, id }) {
  const user = useSelector(state => state.auth?.user);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/signup');
    }
  }

  const handleScheduleDemo = () => {
    navigate('/#features');
  }

  return (
    <section id={id}>
    <div  style={{ background: ctaBg, color: ctaText, padding: '10%', textAlign: 'center' }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Ready to Transform Your Microfinance Operations?</h2>
      <p style={{ fontSize: 18, marginBottom: 32 }}>Join thousands of microfinance institutions already using MicroFin to grow their business</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
        <Button onClick={handleGetStarted} style={{ background: '#fff', color: '#000', borderRadius: 6, fontWeight: 600, fontSize: 18, padding: '12px 28px' }}>Start Free Trial</Button>
        <Button variant="outline" style={{ background: 'transparent', color: '#fff', border: '1px solid #fff', fontWeight: 600, fontSize: 18, padding: '12px 28px', borderRadius: 6 }} onClick={handleScheduleDemo}>Schedule Demo</Button>
      </div>
    </div>
    </section>
  );
}

export default CTASection; 