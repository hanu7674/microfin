import React, { useState, useEffect } from 'react';
import { Container, Message, Loader, Button, Modal } from 'rsuite';
import { useNavigate } from 'react-router-dom';
import CreateInvoiceHeader from './CreateInvoiceHeader';
import SenderRecipientDetails from './SenderRecipientDetails';
import InvoiceMetadata from './InvoiceMetadata';
import InvoiceItems from './InvoiceItems';
import InvoiceSummary from './InvoiceSummary';
import InvoiceNotes from './InvoiceNotes';
import InvoiceActions from './InvoiceActions';
import { useTheme } from '../../../../Theme/theme';
import { getThemeVars } from '../../../../Theme/themeVars';
import { useInvoices } from '../../../../../hooks/useDataService';
import jsPDF from 'jspdf';
import { FaEye } from 'react-icons/fa';

const CreateInvoice = () => {
  const { theme } = useTheme();
  const { pageBg } = getThemeVars(theme);
  const navigate = useNavigate();
  const { createInvoice } = useInvoices();
  
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
    clientPhone: '',
    invoiceNumber: '',
    issueDate: new Date(),
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    status: 'Draft',
    paymentTerms: 'Net 30',
    notes: '',
    terms: ''
  });

  // Items state
  const [items, setItems] = useState([
    { id: 1, description: '', qty: 1, rate: 0, amount: 0 }
  ]);

  // Tax and discount state
  const [taxRate, setTaxRate] = useState(18);
  const [discount, setDiscount] = useState(0);

  // Loading and message state
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Preview state
  const [showPreview, setShowPreview] = useState(false);

  // Generate invoice number
  useEffect(() => {
    const generateInvoiceNumber = () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      return `INV-${year}${month}-${random}`;
    };
    
    if (!formData.invoiceNumber) {
      setFormData(prev => ({
        ...prev,
        invoiceNumber: generateInvoiceNumber()
      }));
    }
  }, [formData.invoiceNumber]);

  // Form change handler
  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Items handlers
  const handleAddItem = () => {
    const newId = Math.max(...items.map(item => item.id)) + 1;
    setItems(prev => [...prev, { id: newId, description: '', qty: 1, rate: 0, amount: 0 }]);
  };

  const handleRemoveItem = (index) => {
    if (items.length > 1) {
      setItems(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleUpdateItem = (index, field, value) => {
    setItems(prev => prev.map((item, i) => {
      if (i === index) {
        const updatedItem = { ...item, [field]: value };
        // Calculate amount
        if (field === 'qty' || field === 'rate') {
          updatedItem.amount = updatedItem.qty * updatedItem.rate;
        }
        return updatedItem;
      }
      return item;
    }));
  };

  // Calculate totals
  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.amount || 0), 0);
  };

  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    return subtotal * (taxRate / 100);
  };

  const calculateDiscount = () => {
    const subtotal = calculateSubtotal();
    return subtotal * (discount / 100);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax();
    const discountAmount = calculateDiscount();
    return subtotal + tax - discountAmount;
  };

  // Action handlers
  const handlePreview = () => {
    console.log(formData);
    setShowPreview(true);
  };

  const handleSendInvoice = async () => {
    setLoading(true);
    setMessage(null);
    
    try {
      const invoiceData = {
        ...formData,
        items: items,
        subtotal: calculateSubtotal(),
        tax: calculateTax(),
        discount: calculateDiscount(),
        total: calculateTotal(),
        taxRate: taxRate,
        discountRate: discount,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      await createInvoice(invoiceData);
      
      setMessage({
        type: 'success',
        content: 'Invoice sent successfully!'
      });
      
      setTimeout(() => {
        navigate('/dashboard/invoices');
      }, 2000);
    } catch (error) {
      setMessage({
        type: 'error',
        content: `Failed to send invoice: ${error.message}`
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    setLoading(true);
    setMessage(null);
    
    try {
      const invoiceData = {
        ...formData,
        status: 'Draft',
        items: items,
        subtotal: calculateSubtotal(),
        tax: calculateTax(),
        discount: calculateDiscount(),
        total: calculateTotal(),
        taxRate: taxRate,
        discountRate: discount,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      await createInvoice(invoiceData);
      
      setMessage({
        type: 'success',
        content: 'Invoice saved as draft'
      });
      
      setTimeout(() => {
        navigate('/dashboard/invoices');
      }, 2000);
    } catch (error) {
      setMessage({
        type: 'error',
        content: `Failed to save draft: ${error.message}`
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica');
    doc.setFontSize(22);
    doc.text('INVOICE', 20, 20);

    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Invoice Number: ${formData.invoiceNumber || 'N/A'}`, 20, 30);
    doc.text(`Issue Date: ${formData.issueDate ? new Date(formData.issueDate).toLocaleDateString() : ''}`, 120, 30);
    doc.text(`Due Date: ${formData.dueDate ? new Date(formData.dueDate).toLocaleDateString() : ''}`, 120, 38);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text('From:', 20, 48);
    doc.setFontSize(12);

    // Split addresses into lines
    const senderAddressLines = (formData.senderAddress || '').split('\n');
    const recipientAddressLines = (formData.clientAddress || '').split('\n');

    let senderY = 54;
    doc.text(formData.senderBusinessName || '', 20, senderY);
    senderY += 6;
    senderAddressLines.forEach(line => {
      doc.text(line, 20, senderY);
      senderY += 6;
    });
    doc.text(`Email: ${formData.senderEmail || ''}`, 20, senderY);
    senderY += 6;
    doc.text(`Phone: ${formData.senderPhone || ''}`, 20, senderY);

    // Calculate recipient Y so it doesn't overlap
    let recipientY = 54;
    doc.setFontSize(14);
    doc.text('To:', 120, 48);
    doc.setFontSize(12);
    doc.text(formData.clientName || '', 120, recipientY);
    recipientY += 6;
    recipientAddressLines.forEach(line => {
      doc.text(line, 120, recipientY);
      recipientY += 6;
    });
    doc.text(`Email: ${formData.clientEmail || ''}`, 120, recipientY);
    recipientY += 6;
    doc.text(`Phone: ${formData.clientPhone || ''}`, 120, recipientY);

    // Continue with items table, totals, etc. (use the greater of senderY/recipientY for next section)
    let y = Math.max(senderY, recipientY) + 10;
    // Items Table
    doc.setFontSize(13);
    doc.setFillColor(245, 245, 245);
    doc.rect(20, y, 170, 10, 'F');
    doc.setTextColor(0, 0, 0);
    doc.text('Description', 22, y + 7);
    doc.text('Qty', 100, y + 7);
    doc.text('Rate', 120, y + 7);
    doc.text('Amount', 150, y + 7);
    y += 14;
    doc.setFontSize(12);
    formData.items?.forEach(item => {
      doc.text(item.description || '', 22, y);
      doc.text(String(item.qty || 1), 100, y);
      doc.text(`₹${item.rate || 0}`, 120, y);
      doc.text(`₹${item.amount || 0}`, 150, y);
      y += 8;
      if (y > 260) { doc.addPage(); y = 20; }
    });
    y += 4;
    // Totals
    doc.setFontSize(13);
    doc.text('Subtotal:', 120, y);
    doc.text(`₹${calculateSubtotal()}`, 150, y);
    y += 8;
    doc.text('Tax:', 120, y);
    doc.text(`₹${calculateTax()}`, 150, y);
    y += 8;
    doc.text('Discount:', 120, y);
    doc.text(`₹${calculateDiscount()}`, 150, y);
    y += 8;
    doc.setFontSize(14);
    doc.setTextColor(0, 128, 0);
    doc.text('Total:', 120, y);
    doc.text(`₹${calculateTotal()}`, 150, y);
    doc.setTextColor(0, 0, 0);
    y += 12;
    // Notes
    if (formData.notes) {
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text('Notes:', 20, y);
      doc.text(formData.notes, 35, y);
      y += 8;
    }
    // Footer
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text('Generated by MicroFin', 20, 285);
    doc.save(`invoice-${formData.invoiceNumber || 'microfin'}.pdf`);
  };

  const handleCancel = () => {
    setMessage({
      type: 'warning',
      content: 'Are you sure you want to cancel? All changes will be lost.'
    });
  };

  // Clear message after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const renderInvoicePreview = () => (
    <Modal open={showPreview} onClose={() => setShowPreview(false)} size="lg">
      <Modal.Header>
        <Modal.Title>Invoice Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ padding: 24, background: pageBg, borderRadius: 8 }}>
          <h2 style={{ marginBottom: 8 }}>INVOICE</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <strong>From:</strong>
              <div>{formData.senderBusinessName}</div>
              <div style={{ whiteSpace: 'pre-line' }}>{formData.senderAddress}</div>
              <div>{formData.senderEmail}</div>
              <div>{formData.senderPhone}</div>
            </div>
            <div>
              <strong>To:</strong>
              <div>{formData.clientName}</div>
              <div style={{ whiteSpace: 'pre-line' }}>{formData.clientAddress}</div>
              <div>{formData.clientEmail}</div>
              <div>{formData.clientPhone}</div>
            </div>
          </div>
          <div>
            <strong>Invoice Number:</strong> {formData.invoiceNumber}<br />
            <strong>Issue Date:</strong> {formData.issueDate ? new Date(formData.issueDate).toLocaleDateString() : ''}<br />
            <strong>Due Date:</strong> {formData.dueDate ? new Date(formData.dueDate).toLocaleDateString() : ''}
          </div>
          <hr />
          <table style={{ width: '100%', marginTop: 16, marginBottom: 16, borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th align="left">Description</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {formData.items?.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.description}</td>
                  <td align="center">{item.qty}</td>
                  <td align="right">₹{item.rate}</td>
                  <td align="right">₹{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ textAlign: 'right' }}>
            <div>Subtotal: ₹{calculateSubtotal()}</div>
            <div>Tax: ₹{calculateTax()}</div>
            <div>Discount: ₹{calculateDiscount()}</div>
            <div style={{ fontWeight: 600, fontSize: 18 }}>Total: ₹{calculateTotal()}</div>
          </div>
          {formData.notes && (
            <div style={{ marginTop: 16 }}>
              <strong>Notes:</strong>
              <div>{formData.notes}</div>
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );

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

        {loading && (
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Loader size="md" content="Processing invoice..." />
          </div>
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
          subtotal={calculateSubtotal()}
          tax={calculateTax()}
          discountAmount={calculateDiscount()}
          total={calculateTotal()}
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
          onPreview={() => setShowPreview(true)}
          loading={loading}
        />
        {renderInvoicePreview()}
      </Container>
    </div>
  );
};

export default CreateInvoice; 