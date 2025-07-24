import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, Schema, Message, Stack } from 'rsuite';
import { FaLink } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars'; 
import { usePayments } from '../../../../hooks/useDataService';
import dataService from '../../../../services/dataService';
import { useDispatch } from 'react-redux';
import { updatePaymentLinkStatus, setPaymentLinkError } from '../../../../redux/payments';

const { StringType } = Schema.Types;

const model = Schema.Model({
  amount: StringType().isRequired('Amount is required').pattern(/^\d+(\.\d{1,2})?$/, 'Enter a valid amount'),
  description: StringType().isRequired('Description is required'),
  customerName: StringType().isRequired('Customer name is required'),
  customerEmail: StringType().isEmail('Enter a valid email').isRequired('Customer email is required')
});

const QuickPaymentLink = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, cardBorderBottomColor } = getThemeVars(theme);
  const { generatedLink, linkLoading, linkError, generatePaymentLink, expireOldPaymentLinks,  clearPaymentLinkStatus } = usePayments();
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    amount: '',
    description: '',
    customerName: '',
    customerEmail: ''
  });
  const [formError, setFormError] = useState({});
  const formRef = useRef();

  useEffect(() => {
    expireOldPaymentLinks();
  }, [expireOldPaymentLinks]);

  useEffect(() => {
    if (!generatedLink || !generatedLink.id) return;

    const unsubscribe = dataService.paymentsService.listenToPaymentLink(
      generatedLink.id,
      (data) => dispatch(updatePaymentLinkStatus(data)),
      (error) => dispatch(setPaymentLinkError(error.message))
    );

    return () => {
      if (unsubscribe) unsubscribe();
      dispatch(clearPaymentLinkStatus());
    };
  }, [generatedLink, dispatch]);

  const handleSubmit = () => {
    if (!formRef.current.check()) {
      setFormError(formRef.current.formError);
      return;
    }
    generatePaymentLink(formValue);
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
        <h3 style={{
          fontSize: 18,
          fontWeight: 600,
          margin: 0,
          marginBottom: 20,
          color: cardText,
          padding: '10px 16px',
          borderBottom: `3px solid ${cardBorderBottomColor}`,
          borderBottomWidth: 1
        }}>
          Quick Payment Link
        </h3>
        <Form
          ref={formRef}
          model={model}
          formValue={formValue}
          onChange={setFormValue}
          formError={formError}
          fluid
        >
          <Form.Group>
            <Form.ControlLabel>Amount *</Form.ControlLabel>
            <Form.Control name="amount" placeholder="0.00" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Description *</Form.ControlLabel>
            <Form.Control name="description" placeholder="Payment for..." />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Customer Name *</Form.ControlLabel>
            <Form.Control name="customerName" placeholder="Customer Name" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Email *</Form.ControlLabel>
            <Form.Control name="customerEmail" placeholder="customer@email.com" />
          </Form.Group>
          <Stack alignItems='center' justifyContent="center" wrap spacing={10}>
            
          <Button
            appearance="primary"
            size="md"
            onClick={handleSubmit}
            disabled={linkLoading}
            startIcon={<FaLink />}
          >
             {linkLoading ? 'Generating...' : 'Generate Payment Link'}
          </Button>
          <Button  onClick={() => clearPaymentLinkStatus(generatedLink.id)} disabled={!generatedLink || !generatedLink.id}>
            Clear Link
          </Button>
          </Stack>

          {linkError && <Message type="error" style={{ marginTop: 8 }}>{linkError}</Message>}
          {generatedLink && (
            <div style={{ marginTop: 16 }}>
               <strong>Payment Link:</strong>
              <Button appearance="link" href={`/dashboard/payments/payment-link/${generatedLink.id}`} target="_blank" rel="noopener noreferrer">
                Payment Link
              </Button>

              <div>Status: Pending</div>
              <div style={{ color: 'red' }}>This link will expire in 10 minutes.</div>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default QuickPaymentLink; 