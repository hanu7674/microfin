import React from 'react';
import { Stack, Panel, Button, Grid, Row, Col } from 'rsuite';
import { FaPhone, FaEnvelope, FaComments, FaWhatsapp, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const ContactSupport = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, cardBorderBottomColor } = getThemeVars(theme);

  const contactMethods = [
    {
      title: 'Phone Support',
      description: 'Speak directly with our support team',
      icon: <FaPhone style={{ fontSize: 24, color: '#4285F4' }} />,
      contact: '+1 (555) 123-4567',
      availability: 'Mon-Fri, 9AM-6PM IST',
      color: '#4285F4',
      action: 'Call Now'
    },
    {
      title: 'Email Support',
      description: 'Send us a detailed message',
      icon: <FaEnvelope style={{ fontSize: 24, color: '#EA4335' }} />,
      contact: 'support@microfin.com',
      availability: '24/7 response within 4 hours',
      color: '#EA4335',
      action: 'Send Email'
    },
    {
      title: 'Live Chat',
      description: 'Get instant help via chat',
      icon: <FaComments style={{ fontSize: 24, color: '#34A853' }} />,
      contact: 'Available on website',
      availability: 'Mon-Fri, 9AM-6PM IST',
      color: '#34A853',
      action: 'Start Chat'
    },
    {
      title: 'WhatsApp Support',
      description: 'Quick support via WhatsApp',
      icon: <FaWhatsapp style={{ fontSize: 24, color: '#25D366' }} />,
      contact: '+91 98765 43210',
      availability: 'Mon-Sat, 10AM-8PM IST',
      color: '#25D366',
      action: 'Message Us'
    }
  ];

  const supportInfo = [
    {
      title: 'Office Hours',
      icon: <FaClock style={{ fontSize: 20, color: '#666' }} />,
      details: 'Monday - Friday: 9:00 AM - 6:00 PM IST'
    },
    {
      title: 'Location',
      icon: <FaMapMarkerAlt style={{ fontSize: 20, color: '#666' }} />,
      details: 'Mumbai, Maharashtra, India'
    }
  ];

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
          Contact Support
        </div>

        <div style={{ padding: '0 16px 16px' }}>
          {/* Contact Methods */}
          <div style={{ marginBottom: 32 }}>
            <div style={{
              fontSize: 16,
              fontWeight: 600,
              color: cardText,
              marginBottom: 16
            }}>
              Get in Touch
            </div>
            <Grid fluid>
              <Row gutter={48}>
                {contactMethods.map((method, index) => (
                  <Col key={index} xs={24} sm={24} md={24} >
                    <div style={{
                      padding: '20px',
                      border: `1px solid ${borderColor}`,
                      borderRadius: 8,
                      background: 'transparent',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      marginBottom: 16
                    }}>
                      <div>
                        {/* <Stack alignItems="center" spacing={16}> 
                          <div>
                          <div style={{
                            width: 48,
                            height: 48,
                            borderRadius: 8,
                            backgroundColor: `${method.color}20`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 12
                          }}>
                            {method.icon}
                          </div>
                          </div>
                          <div>
                          <div>
                            <div style={{
                              fontSize: 16,
                              fontWeight: 600,
                              color: cardText,
                              marginBottom: 4
                            }}>
                              {method.title}
                            </div>
                            <div style={{
                              fontSize: 12,
                              color: cardText,
                              opacity: 0.7
                            }}>
                              {method.description}
                            </div>
                          </div>
                          <div style={{
                          fontSize: 14,
                          fontWeight: 500,
                          color: cardText,
                          marginBottom: 4
                        }}>
                          {method.contact}
                        </div>
                          <div style={{
                          fontSize: 12,
                          color: cardText,
                          opacity: 0.7,
                          marginBottom: 16
                        }}>
                          {method.availability}
                        </div>
                        <Button 
                        appearance="ghost" 
                        size="sm"
                        style={{
                          alignSelf: 'flex-start',
                          color: method.color,
                          borderColor: method.color
                        }}
                      >
                        {method.action}
                      </Button>
                          </div>
                        </Stack>
                        <hr></hr> */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: 16
                        }}>
                          <div style={{
                            width: 48,
                            height: 48,
                            borderRadius: 8,
                            backgroundColor: `${method.color}20`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 12
                          }}>
                            {method.icon}
                          </div>
                          <div>
                            <div style={{
                              fontSize: 16,
                              fontWeight: 600,
                              color: cardText,
                              marginBottom: 4
                            }}>
                              {method.title}
                            </div>
                            <div style={{
                              fontSize: 12,
                              color: cardText,
                              opacity: 0.7
                            }}>
                              {method.description}
                            </div>
                          </div>
                        </div>
                        
                        <div style={{
                          fontSize: 14,
                          fontWeight: 500,
                          color: cardText,
                          marginBottom: 4
                        }}>
                          {method.contact}
                        </div>
                        <div style={{
                          fontSize: 12,
                          color: cardText,
                          opacity: 0.7,
                          marginBottom: 16
                        }}>
                          {method.availability}
                        </div>
                      </div>
                      
                      <Button 
                        appearance="ghost" 
                        size="sm"
                        style={{
                          alignSelf: 'flex-start',
                          color: method.color,
                          borderColor: method.color
                        }}
                      >
                        {method.action}
                      </Button>
                    </div>
                  </Col>
                ))}
              </Row>
            </Grid>
          </div>

          {/* Support Information */}
          <div>
            <div style={{
              fontSize: 16,
              fontWeight: 600,
              color: cardText,
              marginBottom: 16
            }}>
              Support Information
            </div>
            <Stack direction="column" spacing={12} alignItems="stretch">
              {supportInfo.map((info, index) => (
                <Stack key={index} alignItems="center" spacing={12} style={{
                  padding: '16px',
                  border: `1px solid ${borderColor}`,
                  borderRadius: 6,
                  background: 'transparent'
                }}>
                  {info.icon}
                  <div>
                    <div style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: cardText,
                      marginBottom: 2
                    }}>
                      {info.title}
                    </div>
                    <div style={{
                      fontSize: 12,
                      color: cardText,
                      opacity: 0.7
                    }}>
                      {info.details}
                    </div>
                  </div>
                </Stack>
              ))}
            </Stack>
          </div>
        </div>
      </Panel>
    </div>
  );
};

export default ContactSupport; 