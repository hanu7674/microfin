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
  serverTimestamp 
} from 'firebase/firestore';
import { 
  transactionsCollection, 
  transactionById, 
  userTransactionsRef
} from '../Firebase/firebase';
import { dismissNotification, notify } from 'reapop';

// Fetch Transactions Actions
export const fetchTransactionsRequest = () => ({
  type: 'FETCH_TRANSACTIONS_REQUEST'
});

export const fetchTransactionsSuccess = (transactions) => ({
  type: 'FETCH_TRANSACTIONS_SUCCESS',
  payload: transactions
});

export const fetchTransactionsFailure = (error) => ({
  type: 'FETCH_TRANSACTIONS_FAILURE',
  payload: error
});

export const fetchTransactions = (userId, filters = {}) => async (dispatch) => {
  try {
    dispatch(fetchTransactionsRequest());
    
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
    const transactions = transactionsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    dispatch(fetchTransactionsSuccess(transactions));
  } catch (error) {
    dispatch(fetchTransactionsFailure(error.message));
    dispatch(notify({ message: error.message, status: 'error' }));
  }
};

// Create Transaction Actions
export const createTransactionRequest = () => ({
  type: 'CREATE_TRANSACTION_REQUEST'
});

export const createTransactionSuccess = (transaction) => ({
  type: 'CREATE_TRANSACTION_SUCCESS',
  payload: transaction
});

export const createTransactionFailure = (error) => ({
  type: 'CREATE_TRANSACTION_FAILURE',
  payload: error
});

export const createTransaction = (userId, transactionData) => async (dispatch) => {
  try {
    console.log('createTransaction action called with:', { userId, transactionData });
    dispatch(createTransactionRequest());
    
    const transactionRef = userTransactionsRef(userId);
    
    // Ensure date is properly formatted for Firestore
    let processedTransactionData = { ...transactionData };
    if (processedTransactionData.date) {
      // Convert to Firestore timestamp if it's a Date object
      if (processedTransactionData.date instanceof Date) {
        processedTransactionData.date = processedTransactionData.date;
      } else if (typeof processedTransactionData.date === 'string') {
        processedTransactionData.date = new Date(processedTransactionData.date);
      }
    }
    
    const newTransaction = {
      ...processedTransactionData,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    console.log('Creating transaction with data:', newTransaction);
    
    const docRef = await addDoc(transactionRef, newTransaction);
    const createdTransaction = {
      id: docRef.id,
      ...newTransaction
    };
    
    console.log('Transaction created successfully:', createdTransaction);
    
    dispatch(createTransactionSuccess(createdTransaction));
    dispatch(notify({ message: 'Transaction created successfully', status: 'success' }));
    
    console.log('Redux actions dispatched successfully');
    
    // Don't automatically refresh - let the component handle it
    // dispatch(fetchTransactions(userId));
  } catch (error) {
    console.error('Error creating transaction:', error);
    dispatch(createTransactionFailure(error.message));
    dispatch(notify({ message: error.message, status: 'error' }));
  }
};

// Update Transaction Actions
export const updateTransactionRequest = () => ({
  type: 'UPDATE_TRANSACTION_REQUEST'
});

export const updateTransactionSuccess = (transaction) => ({
  type: 'UPDATE_TRANSACTION_SUCCESS',
  payload: transaction
});

export const updateTransactionFailure = (error) => ({
  type: 'UPDATE_TRANSACTION_FAILURE',
  payload: error
});

export const updateTransaction = (userId, transactionId, updateData) => async (dispatch) => {
  try {
    dispatch(updateTransactionRequest());
    
    const transactionRef = transactionById(transactionId);
    const updatedData = {
      ...updateData,
      updatedAt: serverTimestamp()
    };
    
    await updateDoc(transactionRef, updatedData);
    
    const updatedTransaction = {
      id: transactionId,
      ...updateData
    };
    
    dispatch(updateTransactionSuccess(updatedTransaction));
    dispatch(notify({ message: 'Transaction updated successfully', status: 'success' }));
    
    // Don't automatically refresh - let the component handle it
    // dispatch(fetchTransactions(userId));
  } catch (error) {
    dispatch(updateTransactionFailure(error.message));
    dispatch(notify({ message: error.message, status: 'error' }));
  }
};

// Delete Transaction Actions
export const deleteTransactionRequest = () => ({
  type: 'DELETE_TRANSACTION_REQUEST'
});

export const deleteTransactionSuccess = (transactionId) => ({
  type: 'DELETE_TRANSACTION_SUCCESS',
  payload: transactionId
});

export const deleteTransactionFailure = (error) => ({
  type: 'DELETE_TRANSACTION_FAILURE',
  payload: error
});

export const deleteTransaction = (userId, transactionId) => async (dispatch) => {
  try {
    dispatch(deleteTransactionRequest());
    
    const transactionRef = transactionById(transactionId);
    await deleteDoc(transactionRef);
    
    dispatch(deleteTransactionSuccess(transactionId));
    dispatch(notify({ message: 'Transaction deleted successfully', status: 'success' }));
    
    // Don't automatically refresh - let the component handle it
    // dispatch(fetchTransactions(userId));
  } catch (error) {
    dispatch(deleteTransactionFailure(error.message));
    dispatch(notify({ message: error.message, status: 'error' }));
  }
};

// Get Transaction by ID
export const getTransactionById = (transactionId) => async (dispatch) => {
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
    dispatch(notify({ message: error.message, status: 'error' }));
    throw error;
  }
}; 