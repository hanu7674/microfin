


import React, { useEffect, useState } from 'react';
import { Modal, Button, Stack, CardGroup, Card, Loader } from 'rsuite';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const plans = [
  {
    planName: 'Starter',
    price: 299,
    billingCycle: 'monthly',
    features: ["Up to 100 clients", "Basic reporting", "Email support"],
  },
  {
    planName: 'Professional',
    price: 999,
    billingCycle: 'monthly',
    features: ["Up to 1,000 clients", "Advanced analytics", "Priority support", "Mobile app access"],
  }
];

function PricingCard({ title, price, features, highlight,  sublabel,  cardText, shadow }) {
    return (
      <div id="pricing" style={{
          color: highlight ? '#fff' : cardText, borderRadius: 12, padding: 12, margin: 2, boxShadow: highlight ? '0 4px 16px rgba(0,0,0,0.08)' : shadow, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
         {highlight && <div style={{ background: '#fff', color: '#000', fontWeight: 700, fontSize: 13, borderRadius: 6, padding: '12px' }}>Most Popular</div>}
        <h3 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 8px 0' }}>{title}</h3>
        <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>₹{price}<span style={{ fontSize: 16, fontWeight: 400 }}>/month</span></div>
        {sublabel && <div style={{ fontSize: 14, color: highlight ? '#eee' : '#888', marginBottom: 8 }}>{sublabel}</div>}
        <ul style={{ padding: 0, margin: '0 0 18px 0', listStyle: 'none', color: highlight ? '#fff' : cardText, fontSize: 16 }}>
          {features.map((f, i) => <li key={i} style={{ marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>✔ {f}</li>)}
        </ul>
       </div>
    );
  }
  
const SubscribeModal = ({ open, onClose, onSubscribe }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  const { cardBg, cardText, borderColor, shadow } = getThemeVars(theme);
  return (
    <Modal open={open} onClose={onClose} size="sm">
      <Modal.Header>
        <Modal.Title>Choose a Subscription Plan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
            {loading ? 
            <Stack direction="row" justifyContent="center" alignItems="center" style={{height: '100%'}}>
                <Loader content="Loading plan details... Please wait" />
            </Stack> :
            <CardGroup columns={2} spacing={10}>
           {plans.map((plan, idx) => (<>
                <Card shaded bordered style={{cursor: 'pointer', borderTop: selectedPlan === plan ? '4px solid #fff' : 'none'}} onClick={() => setSelectedPlan(plan)} >
                    <Card.Body>
                        <PricingCard  title={plan.planName} price={plan.price} features={plan.features} highlight={plan.price === 999} buttonText="Get Started" cardBg={cardBg} cardText={cardText} borderColor={borderColor} shadow={shadow} />
                    </Card.Body>
                 </Card>
            </>
          ))}
          </CardGroup>
}
       </Modal.Body>
      <Modal.Footer>
        <Button appearance="primary" onClick={() => onSubscribe(selectedPlan)}  disabled={!selectedPlan}>
          Subscribe
        </Button>
        <Button onClick={onClose} appearance="subtle">Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SubscribeModal;