import React, { useState } from 'react';
import { 
  Form, 
  Button, 
  ButtonToolbar, 
  Panel, 
  Stack, 
  Message,
  Divider,
  IconButton
} from 'rsuite';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSave, FaTimes } from 'react-icons/fa';
import { useTheme } from '../../../../Theme/theme';
import { getThemeVars } from '../../../../Theme/themeVars';
import { useClients } from '../../../../../hooks/useDataService';

const NewClient = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, pageBg } = getThemeVars(theme);
  
  const { createClient } = useClients();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    status: 'active',
    type: 'corporate',
    industry: '',
    website: '',
    notes: '',
    contactPerson: '',
    position: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Client name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }
    
    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = 'Contact person is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setMessage({
        type: 'error',
        content: 'Please fix the errors in the form'
      });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      // Clean the data before submission
      const cleanedData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        company: formData.company.trim(),
        address: formData.address.trim(),
        status: formData.status,
        type: formData.type,
        industry: formData.industry.trim(),
        website: formData.website.trim(),
        notes: formData.notes.trim(),
        contactPerson: formData.contactPerson.trim(),
        position: formData.position.trim()
      };

      console.log('Creating new client with data:', cleanedData);
      
      await createClient(cleanedData);
      
      setMessage({
        type: 'success',
        content: 'Client created successfully!'
      });
      
      // Redirect to clients list after a short delay
      setTimeout(() => {
        navigate('/dashboard/clients');
      }, 1500);
      
    } catch (error) {
      console.error('Error creating client:', error);
      setMessage({
        type: 'error',
        content: `Failed to create client: ${error.message}`
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard/clients');
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      address: '',
      status: 'active',
      type: 'corporate',
      industry: '',
      website: '',
      notes: '',
      contactPerson: '',
      position: ''
    });
    setErrors({});
    setMessage(null);
  };

  return (
    <div style={{ 
      marginTop: '5%', 
      backgroundColor: pageBg, 
      padding: "2%",
      minHeight: '100vh'
    }}>
      <Panel 
        header={
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={10}>
              <IconButton 
                icon={<FaArrowLeft />} 
                onClick={handleCancel}
                appearance="subtle"
                size="sm"
              />
              <h3 style={{ margin: 0, color: cardText }}>Create New Client</h3>
            </Stack>
          </Stack>
        }
        style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}
      >
        {message && (
          <Message 
            type={message.type} 
            style={{ marginBottom: 20 }}
            closable
            onClose={() => setMessage(null)}
          >
            {message.content}
          </Message>
        )}

        <Form fluid>
          {/* Basic Information */}
          <Panel header="Basic Information" style={{ marginBottom: 20 }}>
            <Stack direction="row" spacing={20}>
              <Form.Group style={{ flex: 1 }}>
                <Form.ControlLabel>Client Name *</Form.ControlLabel>
                <Form.Control
                  name="name"
                  value={formData.name}
                  onChange={(value) => handleInputChange('name', value)}
                  placeholder="Enter client name"
                  errorMessage={errors.name}
                  errorPlacement="bottomStart"
                />
              </Form.Group>
              
              <Form.Group style={{ flex: 1 }}>
                <Form.ControlLabel>Company Name *</Form.ControlLabel>
                <Form.Control
                  name="company"
                  value={formData.company}
                  onChange={(value) => handleInputChange('company', value)}
                  placeholder="Enter company name"
                  errorMessage={errors.company}
                  errorPlacement="bottomStart"
                />
              </Form.Group>
            </Stack>

            <Stack direction="row" spacing={20} style={{ marginTop: 20 }}>
              <Form.Group style={{ flex: 1 }}>
                <Form.ControlLabel>Email Address *</Form.ControlLabel>
                <Form.Control
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(value) => handleInputChange('email', value)}
                  placeholder="client@company.com"
                  errorMessage={errors.email}
                  errorPlacement="bottomStart"
                />
              </Form.Group>
              
              <Form.Group style={{ flex: 1 }}>
                <Form.ControlLabel>Phone Number *</Form.ControlLabel>
                <Form.Control
                  name="phone"
                  value={formData.phone}
                  onChange={(value) => handleInputChange('phone', value)}
                  placeholder="+1-555-123-4567"
                  errorMessage={errors.phone}
                  errorPlacement="bottomStart"
                />
              </Form.Group>
            </Stack>
          </Panel>

          {/* Contact Information */}
          <Panel header="Contact Information" style={{ marginBottom: 20 }}>
            <Stack direction="row" spacing={20}>
              <Form.Group style={{ flex: 1 }}>
                <Form.ControlLabel>Contact Person *</Form.ControlLabel>
                <Form.Control
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={(value) => handleInputChange('contactPerson', value)}
                  placeholder="John Doe"
                  errorMessage={errors.contactPerson}
                  errorPlacement="bottomStart"
                />
              </Form.Group>
              
              <Form.Group style={{ flex: 1 }}>
                <Form.ControlLabel>Position</Form.ControlLabel>
                <Form.Control
                  name="position"
                  value={formData.position}
                  onChange={(value) => handleInputChange('position', value)}
                  placeholder="CEO, Manager, etc."
                />
              </Form.Group>
            </Stack>

            <Form.Group style={{ marginTop: 20 }}>
              <Form.ControlLabel>Address</Form.ControlLabel>
              <Form.Control
                name="address"
                rows={3}
                value={formData.address}
                onChange={(value) => handleInputChange('address', value)}
              />
            </Form.Group>
          </Panel>

          {/* Business Information */}
          <Panel header="Business Information" style={{ marginBottom: 20 }}>
            <Stack direction="row" spacing={20}>
              <Form.Group style={{ flex: 1 }}>
                <Form.ControlLabel>Client Type</Form.ControlLabel>
                <Form.Control
                  name="type"
                  accepter="select"
                  value={formData.type}
                  onChange={(value) => handleInputChange('type', value)}
                >
                  <option value="corporate">Corporate</option>
                  <option value="startup">Startup</option>
                  <option value="small_business">Small Business</option>
                  <option value="individual">Individual</option>
                </Form.Control>
              </Form.Group>
              
              <Form.Group style={{ flex: 1 }}>
                <Form.ControlLabel>Industry</Form.ControlLabel>
                <Form.Control
                  name="industry"
                  value={formData.industry}
                  onChange={(value) => handleInputChange('industry', value)}
                  placeholder="e.g., Technology, Healthcare, Finance"
                />
              </Form.Group>
            </Stack>

            <Stack direction="row" spacing={20} style={{ marginTop: 20 }}>
              <Form.Group style={{ flex: 1 }}>
                <Form.ControlLabel>Website</Form.ControlLabel>
                <Form.Control
                  name="website"
                  value={formData.website}
                  onChange={(value) => handleInputChange('website', value)}
                  placeholder="https://example.com"
                />
              </Form.Group>
              
              <Form.Group style={{ flex: 1 }}>
                <Form.ControlLabel>Status</Form.ControlLabel>
                <Form.Control
                  name="status"
                  accepter="select"
                  value={formData.status}
                  onChange={(value) => handleInputChange('status', value)}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </Form.Control>
              </Form.Group>
            </Stack>
          </Panel>

          {/* Additional Information */}
          <Panel header="Additional Information">
            <Form.Group>
              <Form.ControlLabel>Notes</Form.ControlLabel>
              <Form.Control
                name="notes"
                rows={4}
                value={formData.notes}
                onChange={(value) => handleInputChange('notes', value)}
                placeholder="Add any additional notes about this client..."
              />
            </Form.Group>
          </Panel>

          <Divider />

          {/* Form Actions */}
          <ButtonToolbar style={{ marginTop: 20 }}>
            <Button
              appearance="primary"
              onClick={handleSubmit}
              loading={loading}
              disabled={loading}
              icon={<FaSave />}
            >
              Create Client
            </Button>
            
            <Button
              appearance="subtle"
              onClick={handleReset}
              disabled={loading}
              icon={<FaTimes />}
            >
              Reset Form
            </Button>
            
            <Button
              appearance="subtle"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </Button>
          </ButtonToolbar>
        </Form>
      </Panel>
    </div>
  );
};

export default NewClient; 