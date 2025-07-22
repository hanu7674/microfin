const initialState = {
  transactions: [],
  currentTransaction: null,
  loading: false,
  error: null,
  filters: {
    type: '',
    category: '',
    dateRange: null
  }
};

export const transactionsReducer = (state = initialState, action) => {
  console.log('Transactions reducer called with action:', action.type, action.payload);
  
  switch (action.type) {
    case 'FETCH_TRANSACTIONS_REQUEST':
    case 'CREATE_TRANSACTION_REQUEST':
    case 'UPDATE_TRANSACTION_REQUEST':
    case 'DELETE_TRANSACTION_REQUEST':
      console.log('Setting loading to true');
      return {
        ...state,
        loading: true,
        error: null
      };

    case 'FETCH_TRANSACTIONS_SUCCESS':
      console.log('Fetch transactions success, updating state with:', action.payload);
      return {
        ...state,
        transactions: action.payload,
        loading: false,
        error: null
      };

    case 'CREATE_TRANSACTION_SUCCESS':
      console.log('Create transaction success, adding to state:', action.payload);
      console.log('Current transactions:', state.transactions);
      const newTransactions = [action.payload, ...state.transactions];
      console.log('New transactions array:', newTransactions);
      return {
        ...state,
        transactions: newTransactions,
        loading: false,
        error: null
      };

    case 'UPDATE_TRANSACTION_SUCCESS':
      console.log('Update transaction success, updating in state:', action.payload);
      return {
        ...state,
        transactions: state.transactions.map(transaction =>
          transaction.id === action.payload.id ? action.payload : transaction
        ),
        loading: false,
        error: null
      };

    case 'DELETE_TRANSACTION_SUCCESS':
      console.log('Delete transaction success, removing from state:', action.payload);
      return {
        ...state,
        transactions: state.transactions.filter(transaction =>
          transaction.id !== action.payload
        ),
        loading: false,
        error: null
      };

    case 'FETCH_TRANSACTIONS_FAILURE':
    case 'CREATE_TRANSACTION_FAILURE':
    case 'UPDATE_TRANSACTION_FAILURE':
    case 'DELETE_TRANSACTION_FAILURE':
      console.log('Transaction action failed:', action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case 'SET_TRANSACTION_FILTERS':
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      };

    case 'CLEAR_TRANSACTION_FILTERS':
      return {
        ...state,
        filters: initialState.filters
      };

    default:
      return state;
  }
};

export default transactionsReducer; 