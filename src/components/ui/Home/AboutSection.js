import React, { useEffect, useState } from 'react';
import { useTheme } from '../../Theme/theme';
import { getThemeVars } from '../../Theme/themeVars';
import { Loader, Placeholder } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeamMembers } from '../../../redux/team';

function AboutSection({ id }) {
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

  const dispatch = useDispatch();
  const { teamMembers, loading, error } = useSelector(state => state.team);
  
  const [stats, setStats] = useState({});

  // Fetch team members from Firebase
  useEffect(() => {
    dispatch(fetchTeamMembers());
  }, [dispatch]);

  // Fetch GitHub stats for team members with better error handling
  useEffect(() => {
    teamMembers.forEach(member => {
      // Skip if we already have data for this user
      if (stats[member.github] && !stats[member.github].error) {
        return;
      }

      fetch(`https://api.github.com/users/${member.github}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'MicroFin-App'
        }
      })
        .then(res => {
          if (!res.ok) {
            if (res.status === 403) {
              throw new Error('Rate limit exceeded');
            } else if (res.status === 404) {
              throw new Error('User not found');
            } else {
              throw new Error(`GitHub API error: ${res.status}`);
            }
          }
          return res.json();
        })
        .then(data => {
          setStats(prev => ({ 
            ...prev, 
            [member.github]: {
              avatar_url: data.avatar_url,
              followers: data.followers || 0,
              public_repos: data.public_repos || 0,
              location: data.location || 'N/A',
              error: null
            }
          }));
        })
        .catch(error => {
          console.warn(`Failed to fetch GitHub data for ${member.github}:`, error.message);
          setStats(prev => ({ 
            ...prev, 
            [member.github]: { 
              error: error.message,
              avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
              followers: 0,
              public_repos: 0,
              location: 'N/A'
            } 
          }));
        });
    });
  }, [teamMembers]);

  // Loading placeholder component
  const LoadingPlaceholder = () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 32 }}>
      {[1, 2, 3, 4, 5].map(index => (
        <div key={index} style={{ 
          background: cardBg, 
          color: cardText, 
          borderRadius: 12, 
          boxShadow: shadow, 
          border: `1px solid ${borderColor}`, 
          padding: 32, 
          minWidth: 260, 
          maxWidth: 320, 
          flex: '1 1 260px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center'
        }}>
          {/* Avatar placeholder */}
          <Placeholder.Graph 
            style={{ 
              width: 80, 
              height: 80, 
              borderRadius: '50%',
              marginBottom: 16
            }} 
            active 
          />
          
          {/* Name placeholder */}
          <Placeholder.Paragraph 
            style={{ 
              width: '80%', 
              marginBottom: 4,
              textAlign: 'center'
            }} 
            rows={1} 
            active 
          />
          
          {/* Role placeholder */}
          <Placeholder.Paragraph 
            style={{ 
              width: '60%', 
              marginBottom: 12,
              textAlign: 'center'
            }} 
            rows={1} 
            active 
          />
          
          {/* GitHub username placeholder */}
          <Placeholder.Paragraph 
            style={{ 
              width: '50%', 
              marginBottom: 12,
              textAlign: 'center'
            }} 
            rows={1} 
            active 
          />
          
          {/* Stats placeholder */}
          <div style={{ width: '100%', textAlign: 'center' }}>
            <Placeholder.Paragraph 
              style={{ width: '100%', marginBottom: 4 }} 
              rows={3} 
              active 
            />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section id={id} style={{ padding: '64px 0', background: bgSection }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
        <h2 style={{ fontSize: 36, fontWeight: 700, textAlign: 'center', color: textMain, margin: 0, marginBottom: 32 }}>
          Meet the Team
        </h2>
        
        {error && (
          <div style={{ 
            background: '#ffebee', 
            color: '#c62828', 
            padding: '12px', 
            borderRadius: '8px', 
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            Error loading team members: {error}
          </div>
        )}
        
        {loading ? (
          <LoadingPlaceholder />
        ) : teamMembers.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '64px 0',
            color: muted,
            fontSize: 18
          }}>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 48, opacity: 0.5 }}>👥</div>
            </div>
            <div>No team members found.</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 32 }}>
            {teamMembers.map(member => {
              const stat = stats[member.github];
              return (
                <div key={member.id} style={{ 
                  background: cardBg, 
                  color: cardText, 
                  borderRadius: 12, 
                  boxShadow: shadow, 
                  border: `1px solid ${borderColor}`, 
                  padding: 32, 
                  minWidth: 260, 
                  maxWidth: 320, 
                  flex: '1 1 260px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center'
                }}>
                  <img 
                    src={stat?.avatar_url || 'https://avatars.githubusercontent.com/u/1?v=4'} 
                    alt={member.name} 
                    style={{ 
                      width: 80, 
                      height: 80, 
                      borderRadius: '50%', 
                      marginBottom: 16, 
                      objectFit: 'cover', 
                      border: `2px solid ${borderColor}` 
                    }} 
                  />
                  <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 4, color: cardText, textAlign: 'center' }}>
                    {member.name}
                  </div>
                  <div style={{ color: muted, fontSize: 15, marginBottom: 12 }}>
                    {member.role}
                  </div>
                  <a 
                    href={`https://github.com/${member.github}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ color: '#0366d6', fontWeight: 500, marginBottom: 12 }}
                  >
                    @{member.github}
                  </a>
                  {stat ? (
                    <div style={{ fontSize: 15, color: cardText, textAlign: 'center' }}>
                      <div>Followers: <b>{stat.followers}</b></div>
                      <div>Public Repos: <b>{stat.public_repos}</b></div>
                      <div>Location: {stat.location}</div>
                      {stat.error && (
                        <div style={{ fontSize: 12, color: muted, marginTop: 4 }}>
                          (GitHub data unavailable)
                        </div>
                      )}
                    </div>
                  ) : (
                    <div style={{ color: borderColor, fontSize: 14 }}>Loading...</div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default AboutSection; 