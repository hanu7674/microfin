import React, { useState, useEffect } from 'react';
import { Button, Col, Divider, Grid, Panel, Row, Stack, Tag, Modal, Message } from 'rsuite';
import { FaCrown } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import { useBusinessProfile } from '../../../../hooks/useDataService';
import { Loader } from 'rsuite';

const SubscriptionPlan = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, success, cardBorderBottomColor } = getThemeVars(theme);
  const [showModal, setShowModal] = useState(false);
  const [actionMessage, setActionMessage] = useState(null);
  const { subscription, subscriptionLoading, subscriptionError, fetchSubscription } = useBusinessProfile();
  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);
  // Fallback/defaults
  const planName = subscription?.planName || 'Professional Plan';
  const price = subscription?.price || 999;
  const status = subscription?.status || 'Active';
  const nextBilling = subscription?.nextBilling
    ? new Date(subscription.nextBilling.seconds * 1000).toLocaleDateString()
    : 'Aug 15, 2025';

  // Simulate plan management actions
  const handleUpgrade = () => {
    setActionMessage('Upgrade request sent! (Simulated)');
    setTimeout(() => setActionMessage(null), 2000);
  };
  const handleCancel = () => {
    setActionMessage('Cancel request sent! (Simulated)');
    setTimeout(() => setActionMessage(null), 2000);
  };

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
        {subscriptionLoading ? (
          <div style={{ color: cardText, opacity: 0.7, fontSize: 14, padding: 16, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Loader content="Loading subscription..." />
          </div>
        ) : <>  
        <Panel shaded style={{ border: `1px solid ${borderColor}` }}>
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
                    <FaCrown size={24} />
                  </div>
                </Stack>
              </Col>
              <Col md={16}>
                <div style={{ fontSize: 18, fontWeight: 600, color: cardText }}>{planName}</div>
                <div style={{ fontSize: 14, color: cardText, opacity: 0.7 }}>
                  ₹{price}/month <Divider vertical /> Next billing: {nextBilling}
                </div>
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
                    {status}
                  </Tag>
                  <Button appearance="ghost" size="md" style={{ padding: '8px 16px' }} onClick={() => setShowModal(true)}>
                    Manage Plan
                  </Button>
                </Stack>
              </Col>
            </Row>
          </Grid>
        </Panel>
        </>}
        {subscriptionError && (
          <div style={{ color: cardText, opacity: 0.7, fontSize: 14, padding: 16 }}>
            Error loading subscription.
          </div>
        )}
        <div style={{ marginTop: 20 }}></div>
      </div>
      <Modal open={showModal} onClose={() => setShowModal(false)} size="xs">
        <Modal.Header>
          <Modal.Title>Manage Subscription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {actionMessage && <Message type="success" style={{ marginBottom: 12 }}>{actionMessage}</Message>}
          <div style={{ fontWeight: 600, marginBottom: 12 }}>Current Plan: {planName}</div>
          <div style={{ marginBottom: 16 }}>Next billing date: {nextBilling}</div>
          <Button appearance="primary" block style={{ marginBottom: 10 }} onClick={handleUpgrade}>
            Upgrade Plan
          </Button>
          <Button appearance="subtle" block style={{ marginBottom: 10 }} onClick={handleCancel}>
            Cancel Subscription
          </Button>
          <Button appearance="link" block onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SubscriptionPlan; 