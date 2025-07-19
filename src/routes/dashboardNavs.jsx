import { 
  FaChartLine, 
  FaExchangeAlt, 
  FaFileAlt, 
  FaHandHoldingUsd, 
  FaFileInvoiceDollar, 
  FaCreditCard, 
  FaUsers, 
  FaBuilding, 
  FaChartBar, 
  FaUserCog, 
  FaCog, 
  FaHeadset 
} from 'react-icons/fa';
import { Icon } from '@rsuite/icons';

export const dashboardNavItems = [
  {
    eventKey: 'dashboard',
    icon: <Icon as={FaChartLine} />,
    title: 'Dashboard',
    to: '/dashboard',
  },
  {
    eventKey: 'transactions',
    icon: <Icon as={FaExchangeAlt} />,
    title: 'Transactions',
    to: '/dashboard/transactions',
  },
  {
    eventKey: 'reports',
    icon: <Icon as={FaFileAlt} />,
    title: 'Reports',
    to: '/dashboard/reports',
  },
  {
    eventKey: 'loans',
    icon: <Icon as={FaHandHoldingUsd} />,
    title: 'Loans',
    to: '/dashboard/loans',
  },
  {
    eventKey: 'invoices',
    icon: <Icon as={FaFileInvoiceDollar} />,
    title: 'Invoices',
    to: '/dashboard/invoices',
  },
  {
    eventKey: 'payments',
    icon: <Icon as={FaCreditCard} />,
    title: 'Payments',
    to: '/dashboard/payments',
  },
  {
    eventKey: 'clients',
    icon: <Icon as={FaUsers} />,
    title: 'Clients',
    to: '/dashboard/clients',
  },
  {
    eventKey: 'business-profile',
    icon: <Icon as={FaBuilding} />,
    title: 'Business Profile',
    to: '/dashboard/business-profile',
  },
  {
    eventKey: 'analytics',
    icon: <Icon as={FaChartBar} />,
    title: 'Analytics',
    to: '/dashboard/analytics',
  },
  {
    eventKey: 'account-settings',
    icon: <Icon as={FaUserCog} />,
    title: 'Account Settings',
    to: '/dashboard/account-settings',
  },
  {
    eventKey: 'system-preferences',
    icon: <Icon as={FaCog}       />,
    title: 'System Preferences',
    to: '/dashboard/system-preferences',
  },
  {
    eventKey: 'support',
    icon: <Icon as={FaHeadset} />,
    title: 'Support',
    to: '/dashboard/support',
  },
];