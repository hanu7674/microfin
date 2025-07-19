import React from 'react';
import { Button } from 'rsuite';

function PricingCard({ title, price, features, highlight, buttonText, onClick, sublabel, cardBg, cardText, borderColor, shadow }) {
  return (
    <div id="pricing" style={{ background: highlight ? '#000' : cardBg, color: highlight ? '#fff' : cardText, border: highlight ? '2px solid #000' : `1px solid ${borderColor}`, borderRadius: 12, padding: 32, minWidth: 260, maxWidth: 340, margin: 12, boxShadow: highlight ? '0 4px 16px rgba(0,0,0,0.08)' : shadow, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      {highlight && <div style={{ position: 'absolute', top: 18, left: 32, background: '#fff', color: '#000', fontWeight: 700, fontSize: 13, borderRadius: 6, padding: '2px 10px' }}>Most Popular</div>}
      <h3 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 8px 0' }}>{title}</h3>
      <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>&pound;{price}<span style={{ fontSize: 16, fontWeight: 400 }}>/month</span></div>
      {sublabel && <div style={{ fontSize: 14, color: highlight ? '#eee' : '#888', marginBottom: 8 }}>{sublabel}</div>}
      <ul style={{ padding: 0, margin: '0 0 18px 0', listStyle: 'none', color: highlight ? '#fff' : cardText, fontSize: 16 }}>
        {features.map((f, i) => <li key={i} style={{ marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>✔ {f}</li>)}
      </ul>
      <Button style={{ background: highlight ? '#fff' : '#000', color: highlight ? '#000' : '#fff', borderRadius: 6, fontWeight: 600, fontSize: 16, padding: '10px 24px', width: '100%' }} onClick={onClick}>{buttonText}</Button>
    </div>
  );
}

function PricingSection({ bgMain, textMain, muted, borderColor, cardBg, cardText, shadow }) {
  return (
    <div style={{ background: bgMain, padding: '56px 0 32px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, textAlign: 'center', marginBottom: 12, color: textMain }}>Simple, Transparent Pricing</h2>
        <p style={{ textAlign: 'center', color: muted, fontSize: 18, marginBottom: 36 }}>Choose the plan that fits your microfinance institution's needs</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          <PricingCard title="Starter" price="29" features={["Up to 100 clients", "Basic reporting", "Email support"]} buttonText="Get Started" cardBg={cardBg} cardText={cardText} borderColor={borderColor} shadow={shadow} />
          <PricingCard title="Professional" price="79" features={["Up to 1,000 clients", "Advanced analytics", "Priority support", "Mobile app access"]} buttonText="Get Started" highlight cardBg={cardBg} cardText={cardText} borderColor={borderColor} shadow={shadow} />
          <PricingCard title="Enterprise" price="199" features={["Unlimited clients", "Custom integrations", "Dedicated support", "White-label options"]} buttonText="Contact Sales" cardBg={cardBg} cardText={cardText} borderColor={borderColor} shadow={shadow} />
        </div>
      </div>
    </div>
  );
}

export default PricingSection; 