import React from 'react';
import { Grid, Col, Row, Stack, Panel, IconButton } from 'rsuite';
import { FaRupeeSign, FaBalanceScale, FaCalendar, FaClock, FaDollarSign } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const LoanOverviewCards = ({ data = null }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, muted, cardBorderBottomColor } = getThemeVars(theme);

  // Default loan overview data
  const defaultData = [
    {
      title: 'Total Loan Amount',
      value: '₹2,50,000',
      icon: <FaDollarSign />,
      color: '#4CAF50'
    },
    {
      title: 'Outstanding Balance',
      value: '₹1,85,000',
      icon: <FaBalanceScale />,
      color: '#FF9800'
    },
    {
      title: 'Monthly EMI',
      value: '₹12,500',
      icon: <FaCalendar />,
      color: '#2196F3'
    },
    {
      title: 'Next Payment',
      value: '15 Jan',
      icon: <FaClock />,
      color: '#9C27B0'
    }
  ];

  const overviewData = data || defaultData;

  return (
    <div style={{ marginBottom: 32 }}>
       
      <Grid fluid>
        <Row gutter={16}>
          {
            overviewData.map((card, index) => (

           
          <Col md={6} lg={6} sm={12} xs={24} xl={6} >
            <Panel shaded style={{backgroundColor: cardBg}}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <div >
                <div>
                  <div style={{
                  color: muted

                  }}>
                    {card.title}
                  </div>
                  <div style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: cardText
                  }}>
                      {card.value}
                    </div>
                </div>
              </div>
              <div style={{
                fontSize: 28,
                fontWeight: 700,
                color: card.color,
                 
              }}>
                <IconButton circle appearance="default" color="white" icon={card.icon} disabled />
              </div>
            </Stack>

            </Panel>
          </Col>
           ))
          }
        </Row>
      </Grid>
    </div>
  );
};

export default LoanOverviewCards; 