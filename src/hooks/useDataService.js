import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../Firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import dataService from '../services/dataService';
import {
  fetchTransactions as fetchTransactionsAction,
  createTransaction as createTransactionAction,
  updateTransaction as updateTransactionAction,
  deleteTransaction as deleteTransactionAction
} from '../redux/transactions';
import {
  fetchLoans as fetchLoansAction,
  createLoan as createLoanAction,
  updateLoan as updateLoanAction,
  deleteLoan as deleteLoanAction
} from '../redux/loans';
import {
  fetchInvoices as fetchInvoicesAction,
  createInvoice as createInvoiceAction,
  updateInvoice as updateInvoiceAction,
  deleteInvoice as deleteInvoiceAction
} from '../redux/invoices';
import {
  fetchClients as fetchClientsAction,
  createClient as createClientAction,
  updateClient as updateClientAction,
  deleteClient as deleteClientAction
} from '../redux/clients';
import {
  FETCH_BUSINESS_PROFILE_REQUEST,
  FETCH_BUSINESS_PROFILE_SUCCESS,
  FETCH_BUSINESS_PROFILE_FAILURE,
  UPDATE_BUSINESS_PROFILE_REQUEST,
  UPDATE_BUSINESS_PROFILE_SUCCESS,
  UPDATE_BUSINESS_PROFILE_FAILURE
} from '../reducers/types';
import {
  fetchBusinessDocuments,
  fetchBusinessProfile as fetchBusinessProfileAction,
  fetchSubscriptionDetails,
  updateBusinessProfile as updateBusinessProfileAction,
  uploadBusinessDocuments
} from '../redux/businessProfile';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { clearPaymentLinkStatusAction, expireOldPaymentLinksAction, fetchPayments as fetchPaymentsAction, generatePaymentLinkAction, listenToPaymentLinkAction } from '../redux/payments';
import {
  fetchDashboardData,
  fetchKpiData,
  fetchChartsData
} from '../redux/dashboard';

// Custom hook to get auth state
const useAuthState = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Setting up auth state listener...');
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        console.log('Auth state changed - User:', user ? user.uid : 'null');
        setUser(user);
        setLoading(false);
      },
      (error) => {
        console.error('Auth state error:', error);
        setError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return [user, loading, error];
};

export const useDashboardData = () => {
  const [user, loading, error] = useAuthState();
  const dispatch = useDispatch();
  const dashboardState = useSelector(state => state.dashboard);

  // Fetch all analytics data from Redux actions
  const fetchAllDashboardAnalytics = useCallback(async () => {
    if (!user) return;
    dispatch(fetchDashboardData(user.uid));
    dispatch(fetchKpiData(user.uid));
    dispatch(fetchChartsData(user.uid));
  }, [user, dispatch]);

  useEffect(() => {
    fetchAllDashboardAnalytics();
  }, [fetchAllDashboardAnalytics]);

  return {
    dashboardData: dashboardState.dashboardData,
    kpiData: dashboardState.kpiData,
    chartsData: dashboardState.chartsData,
    loading: dashboardState.loading || loading,
    error: dashboardState.error || error,
    fetchDashboardData: fetchAllDashboardAnalytics
  };
};

export const useTransactions = () => {
  const [user, loading, error] = useAuthState();
  const dispatch = useDispatch();
  const transactionsState = useSelector(state => state.transactions);

  const fetchTransactionsData = useCallback(async (filters = {}) => {
    if (!user) return;

    try {
      console.log('Fetching transactions for user:', user.uid);
      // Dispatch Redux action instead of calling dataService directly
      await dispatch(fetchTransactionsAction(user.uid, filters));
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      throw error;
    }
  }, [user, dispatch]);

  const createTransaction = useCallback(async (transactionData) => {
    if (!user) return;

    try {
      console.log('Creating transaction for user:', user.uid, 'with data:', transactionData);
      // Dispatch Redux action instead of calling dataService directly
      await dispatch(createTransactionAction(user.uid, transactionData));
      return true;
    } catch (error) {
      console.error('Failed to create transaction:', error);
      throw error;
    }
  }, [user, dispatch]);

  const updateTransaction = useCallback(async (transactionId, updateData) => {
    if (!user) return;

    try {
      console.log('Updating transaction:', transactionId, 'for user:', user.uid);
      // Dispatch Redux action instead of calling dataService directly
      await dispatch(updateTransactionAction(user.uid, transactionId, updateData));
      return true;
    } catch (error) {
      console.error('Failed to update transaction:', error);
      throw error;
    }
  }, [user, dispatch]);

  const deleteTransaction = useCallback(async (transactionId) => {
    if (!user) return;

    try {
      console.log('Deleting transaction:', transactionId, 'for user:', user.uid);
      // Dispatch Redux action instead of calling dataService directly
      await dispatch(deleteTransactionAction(user.uid, transactionId));
      return true;
    } catch (error) {
      console.error('Failed to delete transaction:', error);
      throw error;
    }
  }, [user, dispatch]);

  return {
    transactions: transactionsState.transactions,
    loading: transactionsState.loading || loading,
    error: transactionsState.error || error,
    fetchTransactions: fetchTransactionsData,
    createTransaction,
    updateTransaction,
    deleteTransaction
  };
};

export const useLoans = () => {
  const [user, loading, error] = useAuthState();
  const dispatch = useDispatch();
  const loansState = useSelector(state => state.loans);

  const fetchLoansData = useCallback(async (filters = {}) => {
    if (!user || !user.uid) {
      console.error('User not authenticated or missing UID');
      throw new Error('User authentication required to fetch loans');
    }

    try {
      console.log('Fetching loans for user:', user.uid);
      // Dispatch Redux action instead of calling dataService directly
      await dispatch(fetchLoansAction({ userId: user.uid, filters }));
    } catch (error) {
      console.error('Failed to fetch loans:', error);
      throw error;
    }
  }, [user, dispatch]);

  const createLoan = useCallback(async (loanData) => {
    if (!user || !user.uid) {
      console.error('User not authenticated or missing UID');
      throw new Error('User authentication required to create loan');
    }

    try {
      console.log('Creating loan for user:', user.uid, 'with data:', loanData);
      // Dispatch Redux action instead of calling dataService directly
      await dispatch(createLoanAction({ userId: user.uid, loanData }));
      return true;
    } catch (error) {
      console.error('Failed to create loan:', error);
      throw error;
    }
  }, [user, dispatch]);

  const updateLoan = useCallback(async (loanId, updateData) => {
    if (!user || !user.uid) {
      console.error('User not authenticated or missing UID');
      throw new Error('User authentication required to update loan');
    }

    try {
      console.log('Updating loan:', loanId, 'for user:', user.uid);
      // Dispatch Redux action instead of calling dataService directly
      await dispatch(updateLoanAction({ loanId, updateData }));
      return true;
    } catch (error) {
      console.error('Failed to update loan:', error);
      throw error;
    }
  }, [user, dispatch]);

  const deleteLoan = useCallback(async (loanId) => {
    if (!user || !user.uid) {
      console.error('User not authenticated or missing UID');
      throw new Error('User authentication required to delete loan');
    }

    try {
      console.log('Deleting loan:', loanId, 'for user:', user.uid);
      // Dispatch Redux action instead of calling dataService directly
      await dispatch(deleteLoanAction({ loanId }));
      return true;
    } catch (error) {
      console.error('Failed to delete loan:', error);
      throw error;
    }
  }, [user, dispatch]);

  return {
    loans: loansState.loans,
    loading: loansState.loading || loading,
    error: loansState.error || error,
    fetchLoans: fetchLoansData,
    createLoan,
    updateLoan,
    deleteLoan
  };
};

export const useInvoices = () => {
  const [user, loading, error] = useAuthState();
  const dispatch = useDispatch();
  const invoicesState = useSelector(state => state.invoices);

  const fetchInvoicesData = useCallback(async (filters = {}) => {
    if (!user || !user.uid) {
      console.error('User not authenticated or missing UID');
      throw new Error('User authentication required to fetch invoices');
    }

    try {
      console.log('Fetching invoices for user:', user.uid);
      await dispatch(fetchInvoicesAction({ userId: user.uid, filters }));
    } catch (error) {
      console.error('Failed to fetch invoices:', error);
      throw error;
    }
  }, [user, dispatch]);

  const createInvoice = useCallback(async (invoiceData) => {
    if (!user || !user.uid) {
      console.error('User not authenticated or missing UID');
      throw new Error('User authentication required to create invoice');
    }

    try {
      console.log('Creating invoice for user:', user.uid, 'with data:', invoiceData);
      await dispatch(createInvoiceAction({ userId: user.uid, invoiceData }));
      return true;
    } catch (error) {
      console.error('Failed to create invoice:', error);
      throw error;
    }
  }, [user, dispatch]);

  const updateInvoice = useCallback(async (invoiceId, updateData) => {
    if (!user || !user.uid) {
      console.error('User not authenticated or missing UID');
      throw new Error('User authentication required to update invoice');
    }

    try {
      console.log('Updating invoice:', invoiceId, 'for user:', user.uid);
      await dispatch(updateInvoiceAction({ invoiceId, updateData }));
      return true;
    } catch (error) {
      console.error('Failed to update invoice:', error);
      throw error;
    }
  }, [user, dispatch]);

  const deleteInvoice = useCallback(async (invoiceId) => {
    if (!user || !user.uid) {
      console.error('User not authenticated or missing UID');
      throw new Error('User authentication required to delete invoice');
    }

    try {
      console.log('Deleting invoice:', invoiceId, 'for user:', user.uid);
      await dispatch(deleteInvoiceAction({ invoiceId }));
      return true;
    } catch (error) {
      console.error('Failed to delete invoice:', error);
      throw error;
    }
  }, [user, dispatch]);

  return {
    invoices: invoicesState.invoices || [],
    loading: invoicesState.loading || loading,
    error: invoicesState.error || error,
    fetchInvoices: fetchInvoicesData,
    createInvoice,
    updateInvoice,
    deleteInvoice
  };
};

export const useClients = () => {
  const [user, loading, error] = useAuthState();
  const dispatch = useDispatch();
  const clientsState = useSelector(state => state.clients);

  const fetchClientsData = useCallback(async (filters = {}) => {
    if (!user) {
      console.error('User not authenticated or missing UID');
      throw new Error('User authentication required to fetch clients');
    }

    try {
      console.log('Fetching clients for user:', user.uid);
      await dispatch(fetchClientsAction({ userId: user.uid, filters }));
    } catch (error) {
      console.error('Failed to fetch clients:', error);
      throw error;
    }
  }, [user, dispatch]);

  const createClient = useCallback(async (clientData) => {
    if (!user) {
      console.error('User not authenticated or missing UID');
      throw new Error('User authentication required to create client');
    }

    try {
      console.log('Creating client for user:', user.uid, 'with data:', clientData);
      await dispatch(createClientAction({ userId: user.uid, clientData }));
      return true;
    } catch (error) {
      console.error('Failed to create client:', error);
      throw error;
    }
  }, [user, dispatch]);

  const updateClient = useCallback(async (clientId, updateData) => {
    if (!user) {
      console.error('User not authenticated or missing UID');
      throw new Error('User authentication required to update client');
    }

    try {
      console.log('Updating client:', clientId, 'for user:', user.uid);
      await dispatch(updateClientAction({ clientId, updateData }));
      return true;
    } catch (error) {
      console.error('Failed to update client:', error);
      throw error;
    }
  }, [user, dispatch]);

  const deleteClient = useCallback(async (clientId) => {
    if (!user) {
      console.error('User not authenticated or missing UID');
      throw new Error('User authentication required to delete client');
    }

    try {
      console.log('Deleting client:', clientId, 'for user:', user.uid);
      await dispatch(deleteClientAction({ clientId }));
      return true;
    } catch (error) {
      console.error('Failed to delete client:', error);
      throw error;
    }
  }, [user, dispatch]);

  return {
    clients: clientsState.clients || [],
    loading: clientsState.loading || loading,
    error: clientsState.error || error,
    fetchClients: fetchClientsData,
    createClient,
    updateClient,
    deleteClient
  };
};

export const useSupport = () => {
  const [user, loading, error] = useAuthState();

  const fetchSupportTickets = useCallback(async (filters = {}) => {
    if (!user) return;

    try {
      const tickets = await dataService.supportService.fetchSupportTickets(user.uid, filters);
      return tickets;
    } catch (error) {
      console.error('Failed to fetch support tickets:', error);
      throw error;
    }
  }, [user]);

  const createSupportTicket = useCallback(async (ticketData) => {
    if (!user) return;

    try {
      const ticket = await dataService.supportService.createSupportTicket({
        ...ticketData,
        userId: user.uid
      });
      return ticket;
    } catch (error) {
      console.error('Failed to create support ticket:', error);
      throw error;
    }
  }, [user]);

  const updateSupportTicket = useCallback(async (ticketId, updateData) => {
    try {
      const ticket = await dataService.supportService.updateSupportTicket(ticketId, updateData);
      return ticket;
    } catch (error) {
      console.error('Failed to update support ticket:', error);
      throw error;
    }
  }, []);

  return {
    loading,
    error,
    fetchSupportTickets,
    createSupportTicket,
    updateSupportTicket
  };
};

export const useBusinessProfile = () => {
  const [user, loading, error] = useAuthState();
  const dispatch = useDispatch();
  const businessProfileState = useSelector(state => state.businessProfile);

  const fetchProfile = useCallback(async () => {
    if (!user) return;
    await dispatch(fetchBusinessProfileAction(user.uid));
  }, [user, dispatch]);

  const updateProfile = useCallback(async (profileData) => {
    if (!user) return;
    await dispatch(updateBusinessProfileAction(user.uid, profileData));
  }, [user, dispatch]);

  const fetchDocuments = useCallback(async () => {
    if (!user) return;
    await dispatch(fetchBusinessDocuments(user.uid));
  }, [user, dispatch]);

  const fetchSubscription = useCallback(async () => {
    if (!user) return;
    await dispatch(fetchSubscriptionDetails(user.uid));
  }, [user, dispatch]);

  return {
    profile: businessProfileState.profile,
    loading: businessProfileState.loading || loading,
    error: businessProfileState.error || error,
    documents: businessProfileState.documents,
    documentsLoading: businessProfileState.documentsLoading,
    documentsError: businessProfileState.documentsError,
    fetchProfile,
    updateProfile,
    fetchDocuments,
    fetchSubscription
  };
};

export const usePayments = () => {
  const [user, loading, error] = useAuthState();
  const dispatch = useDispatch();
  const paymentsState = useSelector(state => state.payments);

  const fetchPayments = useCallback(async () => {
    if (!user) return;
    await dispatch(fetchPaymentsAction(user.uid));
  }, [user, dispatch]);

  const generatePaymentLink = useCallback(async (formData) => {
    if (!user) return;
    await dispatch(generatePaymentLinkAction(formData));
  }, [user, dispatch]);

  const expireOldPaymentLinks = useCallback(async () => {
    if (!user) return;
    await dispatch(expireOldPaymentLinksAction(user.uid));
  }, [user, dispatch]);
  const listenToPaymentLink = useCallback(async (linkId, onUpdate, onError) => {
    if (!user) return;
    return await dispatch(listenToPaymentLinkAction(linkId, onUpdate, onError));
  }, [user, dispatch]);
  const clearPaymentLinkStatus = useCallback(async (linkId) => {
    if (!user) return;
    await dispatch(clearPaymentLinkStatusAction(linkId));
  }, [user, dispatch]);

  return {
    payments: paymentsState.payments || [],
    paymentMethods: paymentsState.paymentMethods || [],
    loading: paymentsState.loading || loading,
    error: paymentsState.error || error,
    generatedLink: paymentsState.generatedLink,
    linkLoading: paymentsState.linkLoading,
    linkError: paymentsState.linkError,
    fetchPayments,
    generatePaymentLink,
    expireOldPaymentLinks,
    listenToPaymentLink,
    clearPaymentLinkStatus
  };
}; 