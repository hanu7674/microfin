import React from 'react';
import { FaUsers, FaChartLine, FaMobileAlt, FaShieldAlt, FaHandHoldingUsd } from 'react-icons/fa';
import { RiSettings3Fill } from 'react-icons/ri';

function FeatureCard({ icon, title, desc, cardBg, cardText, borderColor, shadow, iconBg, iconColor }) {
  return (
    <div style={{ background: cardBg, color: cardText, border: `1px solid ${borderColor}`, borderRadius: 12, padding: 32, flex: '1 1 280px', minWidth: 260, maxWidth: 340, margin: 12, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', boxShadow: shadow }}>
      <div style={{
        background: iconBg,
        color: iconColor,
        borderRadius: 8,
        width: 48,
        height: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 18,
        fontSize: 28
      }}>
        {icon}
      </div>
      <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0, marginBottom: 8 }}>{title}</h3>
      <p style={{ color: cardText, margin: 0, fontSize: 16 }}>{desc}</p>
    </div>
  );
}

function FeaturesSection({ bgSection, textMain, muted, borderColor, cardBg, cardText, shadow }) {
  // Theme-based icon backgrounds and colors
  const isDark = cardText === '#fff';
  const iconBg = isDark ? '#222' : '#f0f0f0';
  const iconColor = isDark ? '#fff' : '#222';

  return (
    <div id="features" style={{ background: bgSection, padding: '80px 0 32px 0', }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
        <h2 style={{ fontSize: 36, fontWeight: 700, textAlign: 'center', marginBottom: 12, color: textMain }}>Everything You Need to Manage Microfinance</h2>
        <p style={{ textAlign: 'center', color: muted, fontSize: 18, marginBottom: 36 }}>Our platform provides all the tools you need to run a successful microfinance operation</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          <FeatureCard icon={<FaHandHoldingUsd />} title="Loan Management" desc="Create, track, and manage loans with automated payment schedules and reminders." cardBg={cardBg} cardText={cardText} borderColor={borderColor} shadow={shadow} iconBg={iconBg} iconColor={iconColor} />
          <FeatureCard icon={<FaChartLine />} title="Analytics & Reports" desc="Get detailed insights into your portfolio performance with comprehensive reporting." cardBg={cardBg} cardText={cardText} borderColor={borderColor} shadow={shadow} iconBg={iconBg} iconColor={iconColor} />
          <FeatureCard icon={<FaMobileAlt />} title="Mobile Access" desc="Access your platform anywhere with our mobile-responsive design and apps." cardBg={cardBg} cardText={cardText} borderColor={borderColor} shadow={shadow} iconBg={iconBg} iconColor={iconColor} />
          <FeatureCard icon={<FaShieldAlt />} title="Secure & Compliant" desc="Bank-level security with full regulatory compliance and data protection." cardBg={cardBg} cardText={cardText} borderColor={borderColor} shadow={shadow} iconBg={iconBg} iconColor={iconColor} />
          <FeatureCard icon={<FaUsers />} title="Client Management" desc="Maintain detailed client profiles with credit history and communication logs." cardBg={cardBg} cardText={cardText} borderColor={borderColor} shadow={shadow} iconBg={iconBg} iconColor={iconColor} />
          <FeatureCard icon={<RiSettings3Fill />} title="Automation" desc="Automate routine tasks like payment processing and notification sending." cardBg={cardBg} cardText={cardText} borderColor={borderColor} shadow={shadow} iconBg={iconBg} iconColor={iconColor} />
        </div>
      </div>
    </div>
  );
}

export default FeaturesSection; 