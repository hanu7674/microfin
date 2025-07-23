import React from 'react';
import { Stack, Grid, Row, Col, Panel } from 'rsuite';
import { FaTicketAlt, FaQuestionCircle, FaPhone, FaCheckCircle, FaClock, FaExclamationTriangle } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import { useSelector } from 'react-redux';

// Helper to get start of week/month
const startOfWeek = (date) => {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay());
  d.setHours(0, 0, 0, 0);
  return d;
};
const startOfLastWeek = (date) => {
  const d = startOfWeek(date);
  d.setDate(d.getDate() - 7);
  return d;
};
const startOfMonth = (date) => {
  const d = new Date(date);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
};
const startOfLastMonth = (date) => {
  const d = startOfMonth(date);
  d.setMonth(d.getMonth() - 1);
  return d;
};

const percentChange = (current, previous) => {
  if (previous === 0) return current === 0 ? 0 : 100;
  return Math.round(((current - previous) / previous) * 100);
};

const SupportOverview = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, success, warning, danger, info } = getThemeVars(theme);

  const tickets = useSelector(state => state.support.tickets);
  const callbackRequests = useSelector(state => state.support.callbackRequests);

  const now = new Date();

  // Tickets this week and last week
  const thisWeekStart = startOfWeek(now);
  const lastWeekStart = startOfLastWeek(now);

  const ticketsThisWeek = tickets.filter(t => t.createdAt && new Date(t.createdAt) >= thisWeekStart);
  const ticketsLastWeek = tickets.filter(
    t => t.createdAt && new Date(t.createdAt) >= lastWeekStart && new Date(t.createdAt) < thisWeekStart
  );

  // Open queries now and last week
  const openQueriesNow = tickets.filter(t => t.status === 'Open');
  const openQueriesLastWeek = ticketsLastWeek.filter(t => t.status === 'Open');

  // Callback requests this week and last week
  const callbacksThisWeek = callbackRequests.filter(r => r.createdAt && new Date(r.createdAt) >= thisWeekStart);
  const callbacksLastWeek = callbackRequests.filter(
    r => r.createdAt && new Date(r.createdAt) >= lastWeekStart && new Date(r.createdAt) < thisWeekStart
  );

  // Resolved issues this month and last month
  const thisMonthStart = startOfMonth(now);
  const lastMonthStart = startOfLastMonth(now);

  const resolvedThisMonth = tickets.filter(
    t => t.status === 'Resolved' && t.resolvedAt && new Date(t.resolvedAt) >= thisMonthStart
  );
  const resolvedLastMonth = tickets.filter(
    t => t.status === 'Resolved' && t.resolvedAt && new Date(t.resolvedAt) >= lastMonthStart && new Date(t.resolvedAt) < thisMonthStart
  );

  // Stats and changes
  const supportStats = [
    {
      title: "Total Tickets",
      value: tickets.length,
      change: `${percentChange(ticketsThisWeek.length, ticketsLastWeek.length)}% from last week`,
      changeType: ticketsThisWeek.length >= ticketsLastWeek.length ? "positive" : "negative",
      icon: <FaTicketAlt style={{ color: info }} />,
      color: info
    },
    {
      title: "Open Queries",
      value: openQueriesNow.length,
      change: `${percentChange(openQueriesNow.length, openQueriesLastWeek.length)}% from last week`,
      changeType: openQueriesNow.length >= openQueriesLastWeek.length ? "positive" : "negative",
      icon: <FaQuestionCircle style={{ color: warning }} />,
      color: warning
    },
    {
      title: "Callback Requests",
      value: callbackRequests.length,
      change: `${callbacksThisWeek.length - callbacksLastWeek.length} from last week`,
      changeType: callbacksThisWeek.length >= callbacksLastWeek.length ? "positive" : "negative",
      icon: <FaPhone style={{ color: success }} />,
      color: success
    },
    {
      title: "Resolved Issues",
      value: tickets.filter(t => t.status === 'Resolved').length,
      change: `${percentChange(resolvedThisMonth.length, resolvedLastMonth.length)}% this month`,
      changeType: resolvedThisMonth.length >= resolvedLastMonth.length ? "positive" : "negative",
      icon: <FaCheckCircle style={{ color: success }} />,
      color: success
    }
  ];

  return (
    <div style={{ marginBottom: 32 }}>
      <Grid fluid>
        <Row>
          {supportStats.map((stat, index) => (
            <Col key={index} xs={24} sm={12} md={6}>
              <Panel
                style={{
                  background: cardBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: 8,
                  boxShadow: shadow,
                  height: '100%'
                }}
              >
                <Stack justifyContent="space-between" alignItems="flex-start" style={{ marginBottom: 16 }}>
                  <Stack direction="column" spacing={8} alignItems='flex-start'>
                    <div style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: cardText,
                      opacity: 0.8,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6
                    }}>
                       {stat.title}
                    </div>
                    <div style={{
                      fontSize: 28,
                      fontWeight: 700,
                      color: cardText
                    }}>
                      {stat.value}
                    </div>
                    <div style={{
                      fontSize: 14,
                      color: stat.changeType === 'positive' ? success : danger,
                      fontWeight: 500
                    }}>
                      {stat.change}
                    </div>
                  </Stack>
                  <div style={{
                    fontSize: 24,
                    color: stat.color,
                    opacity: 0.2
                  }}>
                    {stat.icon}
                  </div>
                </Stack>
              </Panel>
            </Col>
          ))}
        </Row>
      </Grid>
    </div>
  );
};

export default SupportOverview; 