import React, { useState, useRef } from 'react';
import { 
  Form, 
  Button, 
  ButtonToolbar, 
  Panel, 
  Stack, 
  Message,
  Divider,
  IconButton,
  Schema,
  Grid,
  Col,
  Row,
  Loader,
  SelectPicker,
  // Breadcrumb
} from 'rsuite';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaSave, FaTimes, FaUser, FaBuilding, FaEnvelope, FaPhone, FaHome, FaHandHoldingUsd } from 'react-icons/fa';
import { useTheme } from '../../../../Theme/theme';
import { getThemeVars } from '../../../../Theme/themeVars';
import { useClients } from '../../../../../hooks/useDataService';

const { StringType, NumberType } = Schema.Types;

// Define the form schema
const model = Schema.Model({
  name: StringType()
    .isRequired('Client name is required')
    .minLength(2, 'Client name must be at least 2 characters'),
  
  email: StringType()
    .isRequired('Email is required')
    .isEmail('Please enter a valid email address'),
  
  phone: StringType()
    .isRequired('Phone number is required')
    .minLength(10, 'Phone number must be at least 10 digits'),
  
  company: StringType()
    .isRequired('Company name is required')
    .minLength(2, 'Company name must be at least 2 characters'),
  
  contactPerson: StringType()
    .isRequired('Contact person is required')
    .minLength(2, 'Contact person name must be at least 2 characters'),
  
  position: StringType(),
  address: StringType(),
  industry: StringType(),
  website: StringType(),
  notes: StringType(),
  
  status: StringType()
    .isRequired('Status is required')
    .addRule((value) => ['active', 'inactive', 'pending'].includes(value), 'Invalid status'),
  
  type: StringType()
    .isRequired('Client type is required')
    .addRule((value) => ['corporate', 'startup', 'small_business', 'individual'].includes(value), 'Invalid client type')
});

// Client Information Panel Component
const ClientInfoPanel = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor } = getThemeVars(theme);

  return (
    <Panel 
      header="Client Information" 
      style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, marginBottom: 20 }}
    >
      <Stack direction="column" spacing={15}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <FaUser style={{ color: '#3498db' }} size={120} />
          <div>
            <div style={{ fontWeight: 'bold', color: cardText }}>Client Details</div>
            <div style={{ fontSize: '14px', color: '#666' }}>
              Enter basic client information including name, company, and contact details.
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <FaBuilding style={{ color: '#27ae60' }} size={80} />
          <div>
            <div style={{ fontWeight: 'bold', color: cardText }}>Business Information</div>
            <div style={{ fontSize: '14px', color: '#666' }}>
              Specify client type, industry, and business status.
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <FaEnvelope style={{ color: '#e74c3c' }} size={80} />
          <div>
            <div style={{ fontWeight: 'bold', color: cardText }}>Contact Details</div>
            <div style={{ fontSize: '14px', color: '#666' }}>
              Provide email, phone, and contact person information.
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <FaPhone style={{ color: '#f39c12' }} size={80} />
          <div>
            <div style={{ fontWeight: 'bold', color: cardText }}>Communication</div>
            <div style={{ fontSize: '14px', color: '#666' }}>
              Add website and additional notes for better client management.
            </div>
          </div>
        </div>
      </Stack>
    </Panel>
  );
};

// Client Guidelines Panel Component
const ClientGuidelinesPanel = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor } = getThemeVars(theme);

  const guidelines = [
    {
      title: "Required Fields",
      items: ["Client Name", "Email Address", "Phone Number", "Company Name", "Contact Person"]
    },
    {
      title: "Client Types",
      items: ["Corporate", "Startup", "Small Business", "Individual"]
    },
    {
      title: "Status Options",
      items: ["Active", "Inactive", "Pending"]
    },
    {
      title: "Best Practices",
      items: [
        "Use clear, professional names",
        "Verify email addresses",
        "Include complete contact information",
        "Add relevant business notes"
      ]
    }
  ];

  return (
    <Panel 
      header="Guidelines & Requirements" 
      style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}
    >
      <Stack direction="column" spacing={15} alignItems='flex-start'>
        {guidelines.map((section, index) => (
          <div key={index}>
            <div style={{ fontWeight: 'bold', color: cardText, marginBottom: 8 }}>
              {section.title}
            </div>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: '14px', color: '#666' }}>
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex} style={{ marginBottom: 4 }}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </Stack>
    </Panel>
  );
};

const NewClient = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { bgMain, cardBg, cardText, borderColor, muted, cardBorderBottomColor } = getThemeVars(theme);
  
  const { createClient } = useClients();
  const formRef = useRef();
  
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

  const handleSubmit = async () => {
    if (!formRef.current.check()) {
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
    setMessage(null);
    formRef.current?.cleanErrors();
  };

  return (
    <div style={{ 
      marginTop: '5%', 
      backgroundColor: bgMain, 
      padding: "2%",
      minHeight: '100vh'
    }}>
      <div style={{ marginBottom: 32 }}>
       {/* Custom Breadcrumbs using Link */}
       <nav aria-label="breadcrumb" style={{ marginBottom: 16 }} >
         <ol style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0, fontSize: 13 }}>
           <li>
             <Link to="/dashboard" style={{ textDecoration: 'none', color: '#1677ff', display: 'flex', alignItems: 'center' }}>
                 Home
             </Link>
           </li>
           <li style={{ margin: '0 4px', color: '#aaa' }}>/</li>
           <li>
             <Link to="/dashboard/clients" style={{ textDecoration: 'none', color: '#1677ff', display: 'flex', alignItems: 'center' }}>
               Clients
             </Link>
           </li>
           <li style={{ margin: '0 4px', color: '#aaa' }}>/</li>
           <li style={{ color: '#888', display: 'flex', alignItems: 'center' }}>
             Create New Client
           </li>
         </ol>
       </nav>

      {/* Title and Subtitle */}
      <div>
        <h1 style={{ 
          fontSize: 32, 
          fontWeight: 700, 
          margin: 0, 
          marginBottom: 12,
          color: cardText
        }}>
          Create New Client
        </h1>
        <p style={{ 
          fontSize: 16, 
          color: muted,
          margin: 0,
          lineHeight: 1.5
        }}>
          Complete the application form to create a new client.
        </p>
      </div>
    </div>

      <Grid fluid>
        <Row gutter={24}>
          {/* Left Column - Information and Guidelines */}
          <Col md={8} lg={8} sm={24} xs={24} xl={8}>
            <ClientInfoPanel />
            <ClientGuidelinesPanel />
          </Col>

          {/* Right Column - Application Form */}
          <Col md={16} lg={16} sm={24} xs={24} xl={16}>
            {loading && (
              <div style={{ marginBottom: 16 }}>
                <Loader size="md" content="Creating client..." />
              </div>
            )}
            {message && (
              <Message 
                type={message.type} 
                style={{ marginBottom: 16 }}
                closable
                onClose={() => setMessage(null)}
              >
                {message.content}
              </Message>
            )}
            
            <Panel 
               style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}
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
          Client Application Form
        </div>
              <Form 
                ref={formRef}
                model={model}
                formValue={formData}
                onChange={setFormData}
                fluid
              >
                {/* Basic Information */}
                <Panel header="Basic Information" style={{ marginBottom: 10, paddingBottom: 10 }}>
                     <Form.Group >
                      <Form.ControlLabel>Client Name *</Form.ControlLabel>
                      <Form.Control
                        name="name"
                        placeholder="Enter client name"
                      />
                    </Form.Group>
                    
                    <Form.Group >
                      <Form.ControlLabel>Company Name *</Form.ControlLabel>
                      <Form.Control
                        name="company"
                        placeholder="Enter company name"
                      />
                    </Form.Group>
 
                     <Form.Group >
                      <Form.ControlLabel>Email Address *</Form.ControlLabel>
                      <Form.Control
                        name="email"
                        type="email"
                        placeholder="client@company.com"
                      />
                    </Form.Group>
                    
                    <Form.Group >
                      <Form.ControlLabel>Phone Number *</Form.ControlLabel>
                      <Form.Control
                        name="phone"
                        placeholder="+1-555-123-4567"
                      />
                    </Form.Group>
                 </Panel>

                {/* Contact Information */}
                <Panel header="Contact Information" style={{ marginBottom: 0, paddingBottom: 0 }}>
                     <Form.Group  >
                      <Form.ControlLabel>Contact Person *</Form.ControlLabel>
                      <Form.Control
                        name="contactPerson"
                        placeholder="John Doe"
                      />
                    </Form.Group>
                    
                    <Form.Group >
                      <Form.ControlLabel>Position</Form.ControlLabel>
                      <Form.Control
                        name="position"
                        placeholder="CEO, Manager, etc."
                      />
                    </Form.Group>
 
                  <Form.Group style={{ marginTop: 20 }}>
                    <Form.ControlLabel>Address</Form.ControlLabel>
                    <Form.Control
                      name="address"
                      rows={3}
                      placeholder="Enter full address"
                    />
                  </Form.Group>
                </Panel>

                {/* Business Information */}
                <Panel header="Business Information" style={{ marginBottom: 10, paddingBottom: 10 }}>
                     <Form.Group >
                      <Form.ControlLabel>Client Type</Form.ControlLabel>
                      <Form.Control
                        name="type"
                        block
                        accepter={SelectPicker}
                        data={[
                          { label: 'Corporate', value: 'corporate' },
                          { label: 'Startup', value: 'startup' },
                          { label: 'Small Business', value: 'small_business' },
                          { label: 'Individual', value: 'individual' }
                        ]}
                      >
                       </Form.Control>
                    </Form.Group>
                    
                    <Form.Group >
                      <Form.ControlLabel>Industry</Form.ControlLabel>
                      <Form.Control
                        name="industry"
                        placeholder="e.g., Technology, Healthcare, Finance"
                      />
                    </Form.Group>
 
                     <Form.Group >
                      <Form.ControlLabel>Website</Form.ControlLabel>
                      <Form.Control
                        name="website"
                        placeholder="https://example.com"
                      />
                    </Form.Group>
                    
                    <Form.Group >
                      <Form.ControlLabel>Status</Form.ControlLabel>
                      <Form.Control
                        name="status" 
                        block
                        accepter={SelectPicker}
                        data={[
                          { label: 'Active', value: 'active' },
                          { label: 'Inactive', value: 'inactive' },
                          { label: 'Pending', value: 'pending' }
                        ]}
                      >
                        
                      </Form.Control>
                    </Form.Group>
                 </Panel>

                {/* Additional Information */}
                <Panel header="Additional Information" style={{ marginBottom: 10, paddingBottom: 10 }}>
                  <Form.Group>
                    <Form.ControlLabel>Notes</Form.ControlLabel>
                    <Form.Control
                      name="notes"
                      rows={4}
                      placeholder="Add any additional notes about this client..."
                    />
                  </Form.Group>
                </Panel>

                <Divider />

                <Stack direction="column" spacing={15} alignItems='flex-end'>
                {/* Form Actions */}
                <ButtonToolbar style={{ marginTop: 20 }}>
                  
                <Button
                    appearance="subtle"
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    Cancel
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
                    appearance="primary"
                    onClick={handleSubmit}
                    loading={loading}
                    disabled={loading}
                    icon={<FaSave />}
                  >
                    Create Client
                  </Button>
                </ButtonToolbar>
                </Stack>
              </Form>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default NewClient; 