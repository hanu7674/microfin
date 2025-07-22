import React, { useState } from 'react';
import { Button, Message } from 'rsuite';
import { addSampleClients } from '../../../../utils/addSampleClients';

const AddSampleDataButton = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAddSampleData = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      const success = await addSampleClients();
      if (success) {
        setMessage({
          type: 'success',
          content: '✅ Sample clients added successfully! Refresh the page to see them.'
        });
      } else {
        setMessage({
          type: 'error',
          content: '❌ Failed to add sample clients. Please try again.'
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        content: `❌ Error: ${error.message}`
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <Button 
        appearance="primary" 
        onClick={handleAddSampleData}
        loading={loading}
        disabled={loading}
      >
        {loading ? 'Adding Sample Data...' : 'Add Sample Clients'}
      </Button>
      
      {message && (
        <Message 
          type={message.type} 
          style={{ marginTop: 10 }}
        >
          {message.content}
        </Message>
      )}
    </div>
  );
};

export default AddSampleDataButton; 