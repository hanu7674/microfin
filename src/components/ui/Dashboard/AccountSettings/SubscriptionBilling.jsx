import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stack, Panel, Button, Loader, Message } from 'rsuite';
import { FaCreditCard, FaDownload } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
 import { fetchSubscriptionDetails, subscribeToPlan, listenToSubscription } from '../../../../redux/businessProfile';
import SubscribeModal from './SubscriptionModel';

const SubscriptionBilling = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, cardBorderBottomColor } = getThemeVars(theme);
  const dispatch = useDispatch();
 
  const { subscription, subscriptionLoading, subscriptionError } = useSelector(state => state.businessProfile);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchSubscriptionDetails());
    // Listen for real-time subscription changes
    const unsubscribe = dispatch(listenToSubscription());
    return () => { if (unsubscribe) unsubscribe(); };
  }, [dispatch]);

  const handleSubscribe = (plan) => {
    dispatch(subscribeToPlan(plan));
    setModalOpen(false);
  };

  if (subscriptionLoading) {
    return <div style={{ padding: 32, textAlign: 'center' }}><Loader size="md" content="Loading subscription..." /></div>;
  }
  if (subscriptionError) {
    return <div style={{ padding: 32 }}><Message type="error">{subscriptionError}</Message></div>;
  }

  // Show subscribe options if no subscription or not active
  if (!subscription || subscription.status !== 'active') {
    return (
      <>
        <div style={{ padding: 32, textAlign: 'center', color: '#888' }}>
          <div style={{ marginBottom: 16 }}>No subscription found.</div>
          <Button appearance="primary" onClick={() => setModalOpen(true)}>Subscribe Now</Button>
        </div>
        <SubscribeModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubscribe={handleSubscribe}
           
        />
      </>
    );
  }

  // Example: subscription.billingHistory = [{ plan, date, amount }]
  const billingHistory = subscription.billingHistory || [];

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
          Subscription & Billing
        </div>

        <div style={{ padding: '0 16px 16px' }}>
          {/* Subscription Details */}
          <div style={{ marginBottom: 32 }}>
            <Stack justifyContent="space-between" alignItems="center" style={{ marginBottom: 16 }}>
              <div>
                <div style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: cardText,
                  marginBottom: 4
                }}>
                  {subscription.planName || 'No Plan'}
                </div>
                <div style={{
                  fontSize: 14,
                  color: cardText,
                  opacity: 0.8,
                  marginBottom: 4
                }}>
                  {subscription.price ? `$${subscription.price}/month` : ''} {subscription.billingCycle ? `• Billed ${subscription.billingCycle}` : ''}
                </div>
                <div style={{
                  fontSize: 12,
                  color: cardText,
                  opacity: 0.7
                }}>
                  Next billing date: {subscription.nextBillingDate || 'N/A'}
                </div>
              </div>
              <Stack spacing={8}>
                <Button appearance="ghost" size="sm">
                  Change Plan
                </Button>
                <Button appearance="ghost" size="sm" color="red">
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </div>

          {/* Payment Method */}
          <div style={{ marginBottom: 32 }}>
            <div style={{
              fontSize: 16,
              fontWeight: 600,
              color: cardText,
              marginBottom: 16
            }}>
              Payment Method
            </div>
            <Stack justifyContent="space-between" alignItems="center" style={{
              padding: '16px',
              border: `1px solid ${borderColor}`,
              borderRadius: 6,
              background: 'transparent'
            }}>
              <Stack alignItems="center" spacing={12}>
                <FaCreditCard style={{ fontSize: 20, color: '#1a1a1a' }} />
                <div>
                  <div style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: cardText,
                    marginBottom: 2
                  }}>
                    {subscription.paymentMethod || 'No payment method'}
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: cardText,
                    opacity: 0.7
                  }}>
                    {subscription.paymentExpiry ? `Expires ${subscription.paymentExpiry}` : ''}
                  </div>
                </div>
              </Stack>
              <Button appearance="ghost" size="sm">
                Update
              </Button>
            </Stack>
          </div>

          {/* Billing History */}
          <div>
            <div style={{
              fontSize: 16,
              fontWeight: 600,
              color: cardText,
              marginBottom: 16
            }}>
              Billing History
            </div>
            <Stack direction="column" spacing={12}>
              {billingHistory.length === 0 ? (
                <div style={{ color: '#888', fontSize: 14 }}>No billing history found.</div>
              ) : billingHistory.map((item, index) => (
                <Stack key={index} justifyContent="space-between" alignItems="center" style={{
                  padding: '12px 0',
                  borderBottom: index < billingHistory.length - 1 ? `1px solid ${borderColor}` : 'none'
                }}>
                  <div>
                    <div style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: cardText,
                      marginBottom: 2
                    }}>
                      {item.plan}
                    </div>
                    <div style={{
                      fontSize: 12,
                      color: cardText,
                      opacity: 0.7
                    }}>
                      {item.date}
                    </div>
                  </div>
                  <Stack alignItems="center" spacing={12}>
                    <div style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: cardText
                    }}>
                      {item.amount}
                    </div>
                    <Button appearance="ghost" size="xs">
                      <FaDownload style={{ marginRight: 4 }} />
                      Download
                    </Button>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </div>
        </div>
      </Panel>
    </div>
  );
};

export default SubscriptionBilling; 