import { combineReducers } from 'redux';
import {reducer as notificationsReducer} from 'reapop';
import { authReducer } from './auth';
import { dashboardReducer } from './dashboard';
import { transactionsReducer } from './transactions';
import loansReducer from '../redux/loans';
import invoicesReducer from '../redux/invoices';
import clientsReducer from '../redux/clients';
import businessProfileReducer from '../redux/businessProfile';
import paymentsReducer from '../redux/payments';
import securityReducer from './security';

const rootReducer = combineReducers({
  notifications: notificationsReducer(),
  auth: authReducer,
  dashboard: dashboardReducer,
  transactions: transactionsReducer,
  loans: loansReducer,
  invoices: invoicesReducer,
  clients: clientsReducer,
  businessProfile: businessProfileReducer,
  payments: paymentsReducer,
  security: securityReducer
});

export default rootReducer;