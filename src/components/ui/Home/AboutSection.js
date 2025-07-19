import React, { useEffect, useState } from 'react';
import { useTheme } from '../../Theme/theme';
import { getThemeVars } from '../../Theme/themeVars';
 
const TEAM = [
  { name: 'HANUMANTHA REDDY LINGALA', role: 'Team Lead and Developer', github: 'hanu7674' },
  { name: 'PORANDLA SHIVARAMA KRISHNA', role: 'Developer', github: 'shivaramakrishna123' },
  { name: 'PAVAN KUMAR BOGADI', role: 'Developer', github: 'pavan123' },
  { name: 'LAKSHETTI MANIDEEP', role: 'Developer', github: 'manideep123' },
  { name: 'THOMBARAPU CHANDU', role: 'Developer', github: 'chandu123' },
];

function AboutSection() {
  const { theme } = useTheme();
  const {
    cardBg,
    cardText,
    borderColor,
    shadow,
    textMain,
    bgSection,
    muted,
  } = getThemeVars(theme);

  const [stats, setStats] = useState({});

  useEffect(() => {
    TEAM.forEach(member => {
      fetch(`https://api.github.com/users/${member.github}`, {
        headers: {
          Authorization: 'token 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'
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.message && data.message.includes('API rate limit exceeded')) {
            setStats(prev => ({ ...prev, [member.github]: { error: 'Rate limit exceeded' } }));
          } else {
            setStats(prev => ({ ...prev, [member.github]: data }));
          }
        });
    });
  }, []);

  return (
    <section id="about" style={{ padding: '64px 0', background: bgSection }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
        <h2  style={{ fontSize: 36, fontWeight: 700, textAlign: 'center', marginBottom: 32, color: textMain }}>Meet the Team</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 32 }}>
          {TEAM.map(member => {
            const stat = stats[member.github];
            return (
              <div key={member.github} style={{ background: cardBg, color: cardText, borderRadius: 12, boxShadow: shadow, border: `1px solid ${borderColor}`, padding: 32, minWidth: 260, maxWidth: 320, flex: '1 1 260px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={stat?.avatar_url || 'https://avatars.githubusercontent.com/u/1?v=4'} alt={member.name} style={{ width: 80, height: 80, borderRadius: '50%', marginBottom: 16, objectFit: 'cover', border: `2px solid ${borderColor}` }} />
                <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 4, color: cardText }}>{member.name}</div>
                <div style={{ color: muted, fontSize: 15, marginBottom: 12 }}>{member.role}</div>
                <a href={`https://github.com/${member.github}`} target="_blank" rel="noopener noreferrer" style={{ color: '#0366d6', fontWeight: 500, marginBottom: 12 }}>@{member.github}</a>
                {stat ? (
                  <div style={{ fontSize: 15, color: cardText, textAlign: 'center' }}>
                    <div>Followers: <b>{stat.followers}</b></div>
                    <div>Public Repos: <b>{stat.public_repos}</b></div>
                    <div>Location: {stat.location || 'N/A'}</div>
                  </div>
                ) : (
                  <div style={{ color: borderColor, fontSize: 14 }}>Loading...</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AboutSection; 