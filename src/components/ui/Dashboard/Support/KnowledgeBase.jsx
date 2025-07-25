import React, { useState } from 'react';
import { Stack, Panel, Input, Grid, Row, Col, Loader, Message } from 'rsuite';
import { FaSearch } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import { useSelector } from 'react-redux';


const KnowledgeBase = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, cardBorderBottomColor } = getThemeVars(theme);
  const [searchQuery, setSearchQuery] = useState('');
  const knowledgeBase = useSelector(state => state.support.knowledgeBase);
  const loading = useSelector(state => state.support.kbLoading);
  const error = useSelector(state => state.support.kbError);
 

  

  return (
    <div style={{ marginBottom: 32 }}>
      <Panel style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 8, boxShadow: shadow }}>
        <div style={{ fontSize: 18, fontWeight: 600, margin: 0, marginBottom: 24, color: cardText, padding: '10px 16px', borderBottom: `3px solid ${cardBorderBottomColor}`, borderBottomWidth: 1 }}>
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
          {/* Articles List */}
          {loading && <Loader center content="Loading articles..." />}
          {error && <Message type="error" description={error} />}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: cardText, marginBottom: 16 }}>
              Articles
            </div>
            <Grid fluid>
              <Row>
                {knowledgeBase.filter(article => article.title?.toLowerCase().includes(searchQuery.toLowerCase())).map((article, index) => (
                  <Col key={article.id || index} xs={24} sm={24} md={24}>
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
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 16, fontWeight: 600, color: cardText, marginBottom: 4 }}>
                            {article.title}
                          </div>
                          <div style={{ fontSize: 14, color: cardText, opacity: 0.7, marginBottom: 8 }}>
                            {article.description}
                          </div>
                          <div style={{ fontSize: 12, color: cardText, opacity: 0.6 }}>
                            {article.category}
                          </div>
                        </div>
                      </Stack>
                    </div>
                  </Col>
                ))}
                {knowledgeBase.length === 0 && <div style={{ fontSize: 16, fontWeight: 600, color: cardText, marginBottom: 16 }}>No articles found</div>}
              </Row>
            </Grid>
          </div>
        </div>
      </Panel>
    </div>
  );
};

export default KnowledgeBase; 