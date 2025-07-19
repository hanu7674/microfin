import React, { useState } from 'react';
import { Stack, Panel, Button, Input, Grid, Row, Col } from 'rsuite';
import { FaSearch, FaBook, FaQuestionCircle, FaLightbulb, FaTools, FaShieldAlt, FaCreditCard } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const KnowledgeBase = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, cardBorderBottomColor } = getThemeVars(theme);

  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      title: 'Getting Started',
      description: 'Learn the basics of using our platform',
      icon: <FaBook style={{ fontSize: 24, color: '#4285F4' }} />,
      articles: 12,
      color: '#4285F4'
    },
    {
      title: 'Account Management',
      description: 'Manage your account settings and preferences',
      icon: <FaShieldAlt style={{ fontSize: 24, color: '#34A853' }} />,
      articles: 8,
      color: '#34A853'
    },
    {
      title: 'Billing & Payments',
      description: 'Understand billing cycles and payment methods',
      icon: <FaCreditCard style={{ fontSize: 24, color: '#EA4335' }} />,
      articles: 15,
      color: '#EA4335'
    },
    {
      title: 'Technical Support',
      description: 'Troubleshoot technical issues and errors',
      icon: <FaTools style={{ fontSize: 24, color: '#FF9800' }} />,
      articles: 20,
      color: '#FF9800'
    },
    {
      title: 'Best Practices',
      description: 'Tips and tricks for optimal usage',
      icon: <FaLightbulb style={{ fontSize: 24, color: '#9C27B0' }} />,
      articles: 10,
      color: '#9C27B0'
    },
    {
      title: 'FAQ',
      description: 'Frequently asked questions and answers',
      icon: <FaQuestionCircle style={{ fontSize: 24, color: '#607D8B' }} />,
      articles: 25,
      color: '#607D8B'
    }
  ];

  const popularArticles = [
    'How to create your first invoice',
    'Setting up payment gateway integration',
    'Managing user permissions and roles',
    'Exporting reports and data',
    'Configuring email notifications',
    'Troubleshooting payment issues'
  ];

  return (
    <div style={{ marginBottom: 32 }}>
      <Panel
        style={{
          background: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: 8,
          boxShadow: shadow
        }}
      >
        <div style={{
          fontSize: 18,
          fontWeight: 600,
          margin: 0,
          marginBottom: 24,
          color: cardText,
          padding: '10px 16px',
          borderBottom: `3px solid ${cardBorderBottomColor}`,
          borderBottomWidth: 1
        }}>
          Knowledge Base
        </div>

        <div style={{ padding: '0 16px 16px' }}>
          {/* Search Bar */}
          <div style={{ marginBottom: 24 }}>
            <Input
              placeholder="Search knowledge base..."
              value={searchQuery}
              onChange={setSearchQuery}
              style={{ width: '100%' }}
              size="lg"
              prefix={<FaSearch style={{ color: '#666' }} />}
            />
          </div>

          {/* Categories Grid */}
          <div style={{ marginBottom: 32 }}>
            <div style={{
              fontSize: 16,
              fontWeight: 600,
              color: cardText,
              marginBottom: 16
            }}>
              Browse Categories
            </div>
            <Grid fluid>
              <Row>
                {categories.map((category, index) => (
                  <Col key={index} xs={24} sm={24} md={24}>
                    <div style={{
                      padding: '20px',
                      border: `1px solid ${borderColor}`,
                      borderRadius: 8,
                      background: 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      marginBottom: 16
                    }}>
                      <Stack alignItems="center" spacing={16}>
                        <div style={{
                          width: 48,
                          height: 48,
                          borderRadius: 8,
                          backgroundColor: `${category.color}20`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {category.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: cardText,
                            marginBottom: 4
                          }}>
                            {category.title}
                          </div>
                          <div style={{
                            fontSize: 14,
                            color: cardText,
                            opacity: 0.7,
                            marginBottom: 8
                          }}>
                            {category.description}
                          </div>
                          <div style={{
                            fontSize: 12,
                            color: cardText,
                            opacity: 0.6
                          }}>
                            {category.articles} articles
                          </div>
                        </div>
                      </Stack>
                    </div>
                  </Col>
                ))}
              </Row>
            </Grid>
          </div>

          {/* Popular Articles */}
          <div>
            <div style={{
              fontSize: 16,
              fontWeight: 600,
              color: cardText,
              marginBottom: 16
            }}>
              Popular Articles
            </div>
            <Stack direction="column" spacing={8} alignItems="stretch">
              {popularArticles.map((article, index) => (
                <div
                  key={index}
                  style={{
                    padding: '12px 16px',
                    border: `1px solid ${borderColor}`,
                    borderRadius: 6,
                    background: 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{
                    fontSize: 14,
                    color: cardText,
                    fontWeight: 500
                  }}>
                    {article}
                  </div>
                </div>
              ))}
            </Stack>
          </div>
        </div>
      </Panel>
    </div>
  );
};

export default KnowledgeBase; 