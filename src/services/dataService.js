import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp,
  runTransaction,
  writeBatch,
  setDoc,
  onSnapshot
} from 'firebase/firestore';
import { 
  transactionsCollection, 
  transactionById, 
  userTransactionsRef,
  loansCollection,
  loanById,
  userLoansRef,
  invoicesCollection,
  invoiceById,
  userInvoicesRef,
  clientsCollection,
  clientById,
  userClientsRef,
  businessProfilesCollection,
  businessProfileById,
  userBusinessProfileRef,
  analyticsCollection,
  userAnalyticsRef,
  financialReportsCollection,
  userFinancialReportsRef,
  paymentsCollection,
  paymentById,
  userPaymentsRef,
  accountSettingsCollection,
  accountSettingsById,
  userAccountSettingsRef,
  systemPreferencesCollection,
  systemPreferencesById,
  userSystemPreferencesRef,
  dashboardDataCollection,
  dashboardDataById,
  userDashboardDataRef,
  kpiDataCollection,
  userKpiDataRef,
  chartsDataCollection,
  userChartsDataRef,
  ticketsCollection,
  ticketById,
  userBusinessDocumentsRef,
  userBusinessSubscriptionRef,
  paymentLinksCollection,
  paymentLinkById,
  currentSubscriptionRef,
  auth
} from '../Firebase/firebase';

// Dashboard Data Service
export const dashboardService = {
  // Fetch dashboard data for a user
  async fetchDashboardData(userId) {
    try {
      const dashboardRef = userDashboardDataRef(userId);
      const dashboardDoc = await getDoc(dashboardRef);
      
      if (dashboardDoc.exists()) {
        const data = dashboardDoc.data();
        return {
          ...data,
          // Include previous month's data for percentage calculations
          previousRevenue: data.previousRevenue || 0,
          previousClients: data.previousClients || 0,
          previousProfit: data.previousProfit || 0,
          previousOverdue: data.previousOverdue || 0,
          // Current month data
          totalRevenue: data.totalRevenue || 0,
          totalExpenses: data.totalExpenses || 0,
          netProfit: data.netProfit || 0,
          activeLoans: data.activeLoans || 0,
          totalClients: data.totalClients || 0,
          pendingInvoices: data.pendingInvoices || 0,
          overduePayments: data.overduePayments || 0,
          monthlyGrowth: data.monthlyGrowth || 0,
          lastUpdated: data.lastUpdated
        };
      } else {
        // Create default dashboard data with previous month's data
        const defaultData = {
          // Current month data
          totalRevenue: 0,
          totalExpenses: 0,
          netProfit: 0,
          activeLoans: 0,
          totalClients: 0,
          pendingInvoices: 0,
          overduePayments: 0,
          monthlyGrowth: 0,
          // Previous month data for percentage calculations
          previousRevenue: 0,
          previousClients: 0,
          previousProfit: 0,
          previousOverdue: 0,
          lastUpdated: serverTimestamp()
        };
        
        await setDoc(dashboardRef, defaultData);
        return defaultData;
      }
    } catch (error) {
      throw new Error(`Failed to fetch dashboard data: ${error.message}`);
    }
  },

  // Update dashboard data
  async updateDashboardData(userId, data) {
    try {
      const dashboardRef = userDashboardDataRef(userId);
      await updateDoc(dashboardRef, {
        ...data,
        lastUpdated: serverTimestamp()
      });
      return true;
    } catch (error) {
      throw new Error(`Failed to update dashboard data: ${error.message}`);
    }
  },

  // Fetch KPI data
  async fetchKpiData(userId) {
    try {
      const kpiRef = userKpiDataRef(userId);
      const kpiDoc = await getDoc(kpiRef);
      
      if (kpiDoc.exists()) {
        return kpiDoc.data();
      } else {
        // Create default KPI data
        const defaultKpiData = {
          totalRevenue: { value: 0, change: 0, trend: 'positive' },
          activeCustomers: { value: 0, change: 0, trend: 'positive' },
          avgTransaction: { value: 0, change: 0, trend: 'positive' },
          growthRate: { value: 0, change: 0, trend: 'positive' },
          lastUpdated: serverTimestamp()
        };
        
        await setDoc(kpiRef, defaultKpiData);
        return defaultKpiData;
      }
    } catch (error) {
      throw new Error(`Failed to fetch KPI data: ${error.message}`);
    }
  },

  // Fetch charts data
  async fetchChartsData(userId, limit = 10) {
    try {
      const chartsQuery = query(
        userChartsDataRef(userId),
        orderBy('createdAt', 'desc'),
        limit(limit)
      );
      
      const chartsSnapshot = await getDocs(chartsQuery);
      return chartsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      throw new Error(`Failed to fetch charts data: ${error.message}`);
    }
  }
};

// Transactions Service
export const transactionsService = {
  // Fetch transactions with filters
  async fetchTransactions(userId, filters = {}) {
    try {
      let transactionsQuery = query(
        userTransactionsRef(userId),
        orderBy('date', 'desc')
      );
      
      // Apply filters
      if (filters.type) {
        transactionsQuery = query(transactionsQuery, where('type', '==', filters.type));
      }
      
      if (filters.category) {
        transactionsQuery = query(transactionsQuery, where('category', '==', filters.category));
      }
      
      if (filters.limit) {
        transactionsQuery = query(transactionsQuery, limit(filters.limit));
      }
      
      const transactionsSnapshot = await getDocs(transactionsQuery);
      return transactionsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      throw new Error(`Failed to fetch transactions: ${error.message}`);
    }
  },

  // Create transaction
  async createTransaction(userId, transactionData) {
    try {
      const transactionRef = userTransactionsRef(userId);
      const newTransaction = {
        ...transactionData,
        userId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      const docRef = await addDoc(transactionRef, newTransaction);
      return {
        id: docRef.id,
        ...newTransaction
      };
    } catch (error) {
      throw new Error(`Failed to create transaction: ${error.message}`);
    }
  },

  // Update transaction
  async updateTransaction(transactionId, updateData) {
    try {
      const transactionRef = transactionById(transactionId);
      const updatedData = {
        ...updateData,
        updatedAt: serverTimestamp()
      };
      
      await updateDoc(transactionRef, updatedData);
      return {
        id: transactionId,
        ...updatedData
      };
    } catch (error) {
      throw new Error(`Failed to update transaction: ${error.message}`);
    }
  },

  // Delete transaction
  async deleteTransaction(transactionId) {
    try {
      const transactionRef = transactionById(transactionId);
      await deleteDoc(transactionRef);
      return true;
    } catch (error) {
      throw new Error(`Failed to delete transaction: ${error.message}`);
    }
  },

  // Get transaction by ID
  async getTransactionById(transactionId) {
    try {
      const transactionRef = transactionById(transactionId);
      const transactionDoc = await getDoc(transactionRef);
      
      if (transactionDoc.exists()) {
        return {
          id: transactionDoc.id,
          ...transactionDoc.data()
        };
      } else {
        throw new Error('Transaction not found');
      }
    } catch (error) {
      throw new Error(`Failed to get transaction: ${error.message}`);
    }
  }
};

// Loans Service
export const loansService = {
  // Fetch loans with filters
  async fetchLoans(userId, filters = {}) {
    try {
      console.log('Fetching loans for user:', userId, 'with filters:', filters);
      
      if (!userId) {
        throw new Error('User ID is required to fetch loans');
      }
      
      let loansQuery = query(
        userLoansRef(userId),
        orderBy('createdAt', 'desc')
      );
      
      // Apply filters
      if (filters.status) {
        loansQuery = query(loansQuery, where('status', '==', filters.status));
      }
      
      if (filters.limit) {
        loansQuery = query(loansQuery, limit(filters.limit));
      }
      
      console.log('Executing loans query for user:', userId);
      const loansSnapshot = await getDocs(loansQuery);
      console.log('Loans snapshot size:', loansSnapshot.size);
      
      const loans = loansSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      console.log('Fetched loans:', loans);
      return loans;
    } catch (error) {
      console.error('Failed to fetch loans:', error);
      console.error('Error details:', {
        code: error.code,
        message: error.message,
        userId: userId,
        filters: filters
      });
      throw new Error(`Failed to fetch loans: ${error.message}`);
    }
  },

  // Create loan
  async createLoan(userId, loanData) {
    try {
      const loanRef = userLoansRef(userId);
      const newLoan = {
        ...loanData,
        userId,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      const docRef = await addDoc(loanRef, newLoan);
      return {
        id: docRef.id,
        ...newLoan
      };
    } catch (error) {
      throw new Error(`Failed to create loan: ${error.message}`);
    }
  },

  // Update loan
  async updateLoan(loanId, updateData) {
    try {
      const loanRef = loanById(loanId);
      const updatedData = {
        ...updateData,
        updatedAt: serverTimestamp()
      };
      
      await updateDoc(loanRef, updatedData);
      return {
        id: loanId,
        ...updatedData
      };
    } catch (error) {
      throw new Error(`Failed to update loan: ${error.message}`);
    }
  },

  // Delete loan
  async deleteLoan(loanId) {
    try {
      const loanRef = loanById(loanId);
      await deleteDoc(loanRef);
      return true;
    } catch (error) {
      throw new Error(`Failed to delete loan: ${error.message}`);
    }
  }
};

// Invoices Service
export const invoicesService = {
  // Fetch invoices with filters
  async fetchInvoices(userId, filters = {}) {
    try {
      let invoicesQuery = query(
        userInvoicesRef(userId),
        orderBy('createdAt', 'desc')
      );
      
      // Apply filters
      if (filters.status) {
        invoicesQuery = query(invoicesQuery, where('status', '==', filters.status));
      }
      
      if (filters.limit) {
        invoicesQuery = query(invoicesQuery, limit(filters.limit));
      }
      
      const invoicesSnapshot = await getDocs(invoicesQuery);
      return invoicesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      throw new Error(`Failed to fetch invoices: ${error.message}`);
    }
  },

  // Create invoice
  async createInvoice(userId, invoiceData) {
    try {
      const invoiceRef = userInvoicesRef(userId);
      const newInvoice = {
        ...invoiceData,
        userId,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      const docRef = await addDoc(invoiceRef, newInvoice);
      return {
        id: docRef.id,
        ...newInvoice
      };
    } catch (error) {
      throw new Error(`Failed to create invoice: ${error.message}`);
    }
  },

  // Update invoice
  async updateInvoice(invoiceId, updateData) {
    try {
      const invoiceRef = invoiceById(invoiceId);
      const updatedData = {
        ...updateData,
        updatedAt: serverTimestamp()
      };
      
      await updateDoc(invoiceRef, updatedData);
      return {
        id: invoiceId,
        ...updatedData
      };
    } catch (error) {
      throw new Error(`Failed to update invoice: ${error.message}`);
    }
  },

  // Delete invoice
  async deleteInvoice(invoiceId) {
    try {
      const invoiceRef = invoiceById(invoiceId);
      await deleteDoc(invoiceRef);
      return true;
    } catch (error) {
      throw new Error(`Failed to delete invoice: ${error.message}`);
    }
  }
};

// Clients Service
export const clientsService = {
  // Fetch clients with filters
  async fetchClients(userId, filters = {}) {
    try {
      let clientsQuery = query(
        userClientsRef(userId),
        orderBy('createdAt', 'desc')
      );
      
      // Apply filters
      if (filters.status) {
        clientsQuery = query(clientsQuery, where('status', '==', filters.status));
      }
      
      if (filters.limit) {
        clientsQuery = query(clientsQuery, limit(filters.limit));
      }
      
      const clientsSnapshot = await getDocs(clientsQuery);
      return clientsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      throw new Error(`Failed to fetch clients: ${error.message}`);
    }
  },

  // Create client
  async createClient(userId, clientData) {
    try {
      const clientRef = userClientsRef(userId);
      const newClient = {
        ...clientData,
        userId,
        status: 'active',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      const docRef = await addDoc(clientRef, newClient);
      return {
        id: docRef.id,
        ...newClient
      };
    } catch (error) {
      throw new Error(`Failed to create client: ${error.message}`);
    }
  },

  // Update client
  async updateClient(clientId, updateData) {
    try {
      const clientRef = clientById(clientId);
      const updatedData = {
        ...updateData,
        updatedAt: serverTimestamp()
      };
      
      await updateDoc(clientRef, updatedData);
      return {
        id: clientId,
        ...updatedData
      };
    } catch (error) {
      throw new Error(`Failed to update client: ${error.message}`);
    }
  },

  // Delete client
  async deleteClient(clientId) {
    try {
      const clientRef = clientById(clientId);
      await deleteDoc(clientRef);
      return true;
    } catch (error) {
      throw new Error(`Failed to delete client: ${error.message}`);
    }
  }
};

// Support Service
export const supportService = {
  // Fetch support tickets
  async fetchSupportTickets(userId, filters = {}) {
    try {
      let ticketsQuery = query(
        ticketsCollection(),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      
      // Apply filters
      if (filters.status) {
        ticketsQuery = query(ticketsQuery, where('status', '==', filters.status));
      }
      
      if (filters.priority) {
        ticketsQuery = query(ticketsQuery, where('priority', '==', filters.priority));
      }
      
      if (filters.limit) {
        ticketsQuery = query(ticketsQuery, limit(filters.limit));
      }
      
      const ticketsSnapshot = await getDocs(ticketsQuery);
      return ticketsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      throw new Error(`Failed to fetch support tickets: ${error.message}`);
    }
  },

  // Create support ticket
  async createSupportTicket(ticketData) {
    try {
      const ticketRef = ticketsCollection();
      const newTicket = {
        ...ticketData,
        status: 'open',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      const docRef = await addDoc(ticketRef, newTicket);
      return {
        id: docRef.id,
        ...newTicket
      };
    } catch (error) {
      throw new Error(`Failed to create support ticket: ${error.message}`);
    }
  },

  // Update support ticket
  async updateSupportTicket(ticketId, updateData) {
    try {
      const ticketRef = ticketById(ticketId);
      const updatedData = {
        ...updateData,
        updatedAt: serverTimestamp()
      };
      
      await updateDoc(ticketRef, updatedData);
      return {
        id: ticketId,
        ...updatedData
      };
    } catch (error) {
      throw new Error(`Failed to update support ticket: ${error.message}`);
    }
  }
};

export const businessProfileService = {
  async fetchBusinessProfile(userId) {
    const ref = userBusinessProfileRef(userId);
    const snap = await getDoc(ref);
    if (snap.exists()) return snap.data();
    throw new Error('Business profile not found');
  },
  async updateBusinessProfile(userId, profileData) {
    const ref = userBusinessProfileRef(userId);
    await updateDoc(ref, { ...profileData, updatedAt: serverTimestamp() });
    return true;
  },
  async uploadBusinessDocuments(userId, document) {
    const ref = userBusinessProfileRef(userId);
    await updateDoc(ref, { documents: document });
    return true;
  },
  async fetchBusinessDocuments(userId) {
    const ref = userBusinessDocumentsRef(userId);
    const snap = await getDocs(ref);
    if(snap.empty) return [];
    return snap.docs.map(doc => doc.data());
  },
  async fetchSubscription() {
    const userId = auth.currentUser.uid;
    const ref = currentSubscriptionRef(userId);
    const snap = await getDoc(ref);
    if(snap.exists()) return snap.data();
    return null;
  }
};

export const paymentsService = {
  async fetchPayments(userId) {
    // Fetch payment methods
    const methodsSnapshot = await getDocs(userPaymentsRef(userId), orderBy('createdAt', 'desc'), limit(10));
    const methods = methodsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Fetch recent transactions (or use a subcollection)
    const transactionsSnapshot = await getDocs(userTransactionsRef(userId));
    const transactions = transactionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return { methods, transactions };
  },
  async generatePaymentLink(formData) {
     const linkRef = paymentLinksCollection();
    const newLink = {
      ...formData,
      status: 'Pending',
      createdAt: serverTimestamp(),
      expired: false
    };
     const docRef = await addDoc(linkRef, newLink);
    return { id: docRef.id, ...newLink };
  },
  async expireOldPaymentLinks() {
    const now = Date.now();
    const snapshot = await getDocs(paymentLinksCollection());
    const updates = [];
    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      if (!data.expired && data.createdAt && data.createdAt.toDate) {
        const createdAt = data.createdAt.toDate().getTime();
        if (now - createdAt > 10 * 60 * 1000) {
          updates.push(updateDoc(paymentLinkById(docSnap.id), { expired: true, status: 'Expired' }));
        }
      }
    });
    await Promise.all(updates);
    return true;
  },
  async listenToPaymentLink(linkId, onUpdate, onError) {
    const linkRef = paymentLinkById(linkId);
    const unsubscribe = onSnapshot(
      linkRef,
      (doc) => {
        const data = doc.data();
        if (data) {
          onUpdate(data); // Pass data to Redux or a callback
        }
      },
      (error) => {
        if (onError) onError(error);
        else console.error('Firestore listener error:', error);
      }
    );
    return unsubscribe;
  },
  async clearPaymentLinkStatus(linkId) {
    const linkRef = paymentLinkById(linkId);
    await updateDoc(linkRef, { status: 'Expired', expired: true });
    return true;
  }
};
  

export default {
  dashboardService,
  transactionsService,
  loansService,
  invoicesService,
  clientsService,
  supportService,
  businessProfileService,
  paymentsService
}; 