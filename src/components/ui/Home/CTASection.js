import React from 'react';
import { Button } from 'rsuite';

function CTASection({ ctaBg, ctaText, isDark }) {
  return (
    <div id="contact" style={{ background: ctaBg, color: ctaText, padding: '10%', textAlign: 'center' }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Ready to Transform Your Microfinance Operations?</h2>
      <p style={{ fontSize: 18, marginBottom: 32 }}>Join thousands of microfinance institutions already using MicroFin to grow their business</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
        <Button style={{ background: '#fff', color: '#000', borderRadius: 6, fontWeight: 600, fontSize: 18, padding: '12px 28px' }}>Start Free Trial</Button>
        <Button variant="outline" style={{ background: 'transparent', color: '#fff', border: '1px solid #fff', fontWeight: 600, fontSize: 18, padding: '12px 28px', borderRadius: 6 }}>Schedule Demo</Button>
      </div>
    </div>
  );
}

export default CTASection; 