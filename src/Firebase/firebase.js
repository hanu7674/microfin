import { initializeApp } from 'firebase/app';
import { config } from './config'
import { 
  collection, 
  doc, 
  getFirestore, 
  writeBatch,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getMessaging } from "firebase/messaging";
import { getDatabase } from "firebase/database";
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";
export const app = initializeApp(config);
export const firestoreDb = getFirestore(app);
export const auth = getAuth(app)
export const db = getDatabase(app);
export const messaging = getMessaging(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
export const batch = writeBatch(firestoreDb);

// =============================================
// STANDARDIZED COLLECTION REFERENCES
// =============================================

// MicroFinance Application Collections
// =============================================

// Users
export const usersRef = () => collection(firestoreDb, "users");
export const userRef = (id) => doc(firestoreDb, `users/${id}`);
export const usermetadata = (id) => doc(firestoreDb, `metadata/userdata/users/${id}`);
export const usermetadataRef = () => collection(firestoreDb, `metadata/userdata/users`);
export const tokensRef = (id) => doc(firestoreDb, `tokens/${id}`);
export const usernameRef = (id) => doc(firestoreDb, `usernames/${id}`);
export const usernamesRef = () => collection(firestoreDb, `usernames`);
export const userLogRef = (uid, id) => doc(firestoreDb, `users/${uid}/logs/${id}`);
export const userLogCollectionRef = (uid) => collection(firestoreDb, `users/${uid}/logs`);

// Transactions
export const transactionsCollection = () => collection(firestoreDb, 'transactions');
export const transactionById = (id) => doc(firestoreDb, `transactions/${id}`);
export const userTransactionsRef = (userId) => collection(firestoreDb, `users/${userId}/transactions`);

// Loans
export const loansCollection = () => collection(firestoreDb, 'loans');
export const loanById = (id) => doc(firestoreDb, `loans/${id}`);
export const userLoansRef = (userId) => collection(firestoreDb, `users/${userId}/loans`);
export const loanPaymentsRef = (loanId) => collection(firestoreDb, `loans/${loanId}/payments`);
export const loanPaymentById = (loanId, paymentId) => doc(firestoreDb, `loans/${loanId}/payments/${paymentId}`);

// Invoices
export const invoicesCollection = () => collection(firestoreDb, 'invoices');
export const invoiceById = (id) => doc(firestoreDb, `invoices/${id}`);
export const userInvoicesRef = (userId) => collection(firestoreDb, `users/${userId}/invoices`);

// Clients
export const clientsCollection = () => collection(firestoreDb, 'clients');
export const clientById = (id) => doc(firestoreDb, `clients/${id}`);
export const userClientsRef = (userId) => collection(firestoreDb, `users/${userId}/clients`);

// Business Profile
export const businessProfilesCollection = () => collection(firestoreDb, 'business_profiles');
export const businessProfileById = (id) => doc(firestoreDb, `business_profiles/${id}`);
export const userBusinessProfileRef = (userId) => doc(firestoreDb, `users/${userId}/business_profile/data`);
export const userBusinessDocumentsRef = (userId) => collection(firestoreDb, `users/${userId}/business_documents`);
 
// Analytics & Reports
export const analyticsCollection = () => collection(firestoreDb, 'analytics');
export const analyticsById = (id) => doc(firestoreDb, `analytics/${id}`);
export const userAnalyticsRef = (userId) => collection(firestoreDb, `users/${userId}/analytics`);

// Financial Reports
export const financialReportsCollection = () => collection(firestoreDb, 'financial_reports');
export const financialReportById = (id) => doc(firestoreDb, `financial_reports/${id}`);
export const userFinancialReportsRef = (userId) => collection(firestoreDb, `users/${userId}/financial_reports`);

// Payments
export const paymentsCollection = () => collection(firestoreDb, 'payments');
export const paymentById = (id) => doc(firestoreDb, `payments/${id}`);
export const userPaymentsRef = (userId) => collection(firestoreDb, `users/${userId}/payments`);

// Account Settings
export const accountSettingsCollection = () => collection(firestoreDb, 'account_settings');
export const accountSettingsById = (id) => doc(firestoreDb, `account_settings/${id}`);
export const userAccountSettingsRef = (userId) => doc(firestoreDb, `users/${userId}/account_settings/data`);

// System Preferences
export const systemPreferencesCollection = () => collection(firestoreDb, 'system_preferences');
export const systemPreferencesById = (id) => doc(firestoreDb, `system_preferences/${id}`);
export const userSystemPreferencesRef = (userId) => doc(firestoreDb, `users/${userId}/system_preferences/data`);

// Dashboard Data
export const dashboardDataCollection = () => collection(firestoreDb, 'dashboard_data');
export const dashboardDataById = (id) => doc(firestoreDb, `dashboard_data/${id}`);
export const userDashboardDataRef = (userId) => doc(firestoreDb, `users/${userId}/dashboard_data/data`);

// KPI Data
export const kpiDataCollection = () => collection(firestoreDb, 'kpi_data');
export const kpiDataById = (id) => doc(firestoreDb, `kpi_data/${id}`);
export const userKpiDataRef = (userId) => doc(firestoreDb, `users/${userId}/kpi_data/data`);

// Charts Data
export const chartsDataCollection = () => collection(firestoreDb, 'charts_data');
export const chartsDataById = (id) => doc(firestoreDb, `charts_data/${id}`);
export const userChartsDataRef = (userId) => collection(firestoreDb, `users/${userId}/charts_data`);

// Payment Links
export const paymentLinksCollection = () => collection(firestoreDb, 'payment_links');
export const paymentLinkById = (id) => doc(firestoreDb, `payment_links/${id}`);

// export const subscriptionsRef = (userId) => doc(firestoreDb, `users/${userId}/subscriptions`);
export const subscriptionById = (userId, id) => doc(firestoreDb, `users/${userId}/subscriptions/${id}`);
export const currentSubscriptionRef = (userId) => doc(firestoreDb, `users/${userId}/subscriptions/current`);

export const businessUsersCollection = (userId) => collection(firestoreDb, `users/${userId}/users/`);
export const businessUserById = (userId, id) => doc(firestoreDb, `users/${userId}/users/${id}`);

// Support
export const supportTicketsCollection = (userId) => collection(firestoreDb, `users/${userId}/support_tickets`);
export const supportTicketById = (userId, id) => doc(firestoreDb, `users/${userId}/support_tickets/${id}`);
export const callbackRequestsCollection = (userId) => collection(firestoreDb, `users/${userId}/callback_requests`);
export const callbackRequestById = (userId, id) => doc(firestoreDb, `users/${userId}/callback_requests/${id}`);
export const knowledgeBaseCollection = (userId) => collection(firestoreDb, `users/${userId}/knowledge_base`);
export const knowledgeBaseById = (userId, id) => doc(firestoreDb, `users/${userId}/knowledge_base/${id}`);