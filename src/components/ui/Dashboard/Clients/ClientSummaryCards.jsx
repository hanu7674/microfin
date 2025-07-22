import React from 'react';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import { FaUsers, FaUser, FaUserPlus, FaUserTimes } from 'react-icons/fa';
import { Grid, Row, Col, Panel, Stack, IconButton } from 'rsuite';

const ClientSummaryCards = ({ data = {} }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, muted, success, info, warning, danger } = getThemeVars(theme);

  const cards = [
    {
      title: "Total Clients",
      value: data.totalClients || 0,
      icon: <FaUsers style={{ color: info }} />,
      color: info
    },
    {
      title: "Active Clients",
      value: data.activeClients || 0,
      icon: <FaUser style={{ color: success }} />,
      color: success
    },
    {
      title: "New This Month",
      value: data.newClients || 0,
      icon: <FaUserPlus style={{ color: warning }} />,
      color: warning
    },
    {
      title: "Inactive Clients",
      value: data.inactiveClients || 0,
      icon: <FaUserTimes style={{ color: danger }} />,
      color: danger
    }
  ];

  return (
    <div style={{ marginBottom: 32 }}>
       
    <Grid fluid>
      <Row gutter={16}>
        {
          cards.map((card, index) => (

         
        <Col md={6} lg={6} sm={12} xs={24} xl={6} key={index}>
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

export default ClientSummaryCards; 