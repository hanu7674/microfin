import React from 'react';
import { Button, Col, Divider, Grid, Panel, Row, Stack, Tag } from 'rsuite';
import { FaCrown } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const SubscriptionPlan = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, success, cardBorderBottomColor } = getThemeVars(theme);

  return (
    <div style={{ marginBottom: 32 }}>
      <div
        style={{
          background: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: 8,
          padding: '2%',
          boxShadow: shadow
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
          padding: '10px 16px',
          borderBottom: `3px solid ${cardBorderBottomColor}`,
          borderBottomWidth: 1
        }}>
          <h3 style={{
            fontSize: 18,
            fontWeight: 600,
            margin: 0,
            color: cardText
          }}>
            Subscription Plan
          </h3>
        </div>
        
        <Panel shaded style={{
          border: `1px solid ${borderColor}`,

        }}>
        <Grid fluid>
          <Row>
          <Col md={2}>
          <Stack justifyContent="center" alignItems="center">
            <div style={{
              background: "#000",
               borderRadius: 8,
               padding: 10,
               width: 30,
               height: 30,
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center'
             }}>
              <FaCrown size={24}/>
            </div>
          </Stack>
          </Col>
          <Col md={16}>
          <div style={{fontSize: 18, fontWeight: 600, color: cardText}}>Professional Plan</div>
          <div style={{fontSize: 14, color: cardText, opacity: 0.7}}>₹999/month <Divider vertical /> Next billing: Feb 15, 2025</div>
          </Col>
          <Col md={6}>
          <Stack justifyContent="flex-end" alignItems="center" spacing={4}>
          <Tag color="green" style={{ 
              backgroundColor: '#e6f4ea',
              color: '#1e7e34',
              border: 'none',
              borderRadius: 12,
              padding: '4px 12px',
              fontSize: 12,
              fontWeight: 500
            }}>
              Active
            </Tag>
            <Button appearance="ghost" size="md" style={{padding: '8px 16px'}}>Manage Plan</Button>
          </Stack>
          
          </Col>
          </Row>
        </Grid>
        </Panel>
        <div style={{ marginTop: 20 }}></div> 
      </div>
    </div>
  );
};

export default SubscriptionPlan; 