import React, { useState } from 'react';
import { Container, Message } from 'rsuite';
import CreateInvoiceHeader from './CreateInvoiceHeader';
import SenderRecipientDetails from './SenderRecipientDetails';
import InvoiceMetadata from './InvoiceMetadata';
import InvoiceItems from './InvoiceItems';
import InvoiceSummary from './InvoiceSummary';
import InvoiceNotes from './InvoiceNotes';
import InvoiceActions from './InvoiceActions';
import { useTheme } from '../../../../Theme/theme';
import { getThemeVars } from '../../../../Theme/themeVars';

const CreateInvoice = () => {
  const { theme } = useTheme();
  const { pageBg } = getThemeVars(theme);
  
  // Form state
  const [formData, setFormData] = useState({
    senderBusinessName: '',
    senderAddress: '',
    senderEmail: '',
    senderPhone: '',
    selectedClient: '',
    clientName: '',
    clientAddress: '',
    clientEmail: '',
    invoiceNumber: 'INV-2025-001',
    issueDate: new Date('2025-01-15'),
    dueDate: new Date('2025-02-15'),
    notes: '',
    terms: ''
  });

  // Items state
  const [items, setItems] = useState([
    { description: '', qty: 1, rate: 0 },
    { description: '', qty: 1, rate: 0 }
  ]);

  // Tax and discount state
  const [taxRate, setTaxRate] = useState(18);
  const [discount, setDiscount] = useState(0);

  // Message state
  const [message, setMessage] = useState(null);

  // Form change handler
  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Items handlers
  const handleAddItem = () => {
    setItems(prev => [...prev, { description: '', qty: 1, rate: 0 }]);
  };

  const handleRemoveItem = (index) => {
    if (items.length > 1) {
      setItems(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleUpdateItem = (index, field, value) => {
    setItems(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  // Action handlers
  const handlePreview = () => {
    setMessage({
      type: 'info',
      content: 'Preview functionality will be implemented here'
    });
  };

  const handleSendInvoice = () => {
    setMessage({
      type: 'success',
      content: 'Invoice sent successfully!'
    });
  };

  const handleSaveDraft = () => {
    setMessage({
      type: 'success',
      content: 'Invoice saved as draft'
    });
  };

  const handleDownloadPDF = () => {
    setMessage({
      type: 'info',
      content: 'PDF download will be implemented here'
    });
  };

  const handleCancel = () => {
    setMessage({
      type: 'warning',
      content: 'Are you sure you want to cancel? All changes will be lost.'
    });
  };

  // Clear message after 3 seconds
  React.useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div style={{ 
      background: pageBg,
      minHeight: '100vh',
      padding: '2%',
      marginTop: '5%'
    }}>
      <Container>
        {message && (
          <Message
            type={message.type}
            style={{ marginBottom: 24 }}
            closable
            onClose={() => setMessage(null)}
          >
            {message.content}
          </Message>
        )}

        <CreateInvoiceHeader 
          onPreview={handlePreview}
          onSendInvoice={handleSendInvoice}
        />

        <SenderRecipientDetails 
          formData={formData}
          onFormChange={handleFormChange}
        />

        <InvoiceMetadata 
          formData={formData}
          onFormChange={handleFormChange}
        />

            <InvoiceItems 
              items={items}
              onAddItem={handleAddItem}
              onRemoveItem={handleRemoveItem}
              onUpdateItem={handleUpdateItem}
            />
            <InvoiceSummary 
              items={items}
              taxRate={taxRate}
              discount={discount}
              onTaxChange={setTaxRate}
              onDiscountChange={setDiscount}
            />
         

        <InvoiceNotes 
          formData={formData}
          onFormChange={handleFormChange}
        />

        <InvoiceActions 
          onSaveDraft={handleSaveDraft}
          onDownloadPDF={handleDownloadPDF}
          onCancel={handleCancel}
          onSendInvoice={handleSendInvoice}
        />
      </Container>
    </div>
  );
};

export default CreateInvoice; 