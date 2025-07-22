import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  FETCH_LOANS_REQUEST, 
  FETCH_LOANS_SUCCESS, 
  FETCH_LOANS_FAILURE,
  CREATE_LOAN_REQUEST,
  CREATE_LOAN_SUCCESS,
  CREATE_LOAN_FAILURE,
  UPDATE_LOAN_REQUEST,
  UPDATE_LOAN_SUCCESS,
  UPDATE_LOAN_FAILURE,
  DELETE_LOAN_REQUEST,
  DELETE_LOAN_SUCCESS,
  DELETE_LOAN_FAILURE
} from './types';
import dataService from '../services/dataService';

// Async thunks
export const fetchLoans = createAsyncThunk(
  'loans/fetchLoans',
  async ({ userId, filters = {} }, { rejectWithValue }) => {
    try {
      console.log('Fetching loans for user:', userId, 'with filters:', filters);
      const loans = await dataService.loansService.fetchLoans(userId, filters);
      console.log('Fetched loans:', loans);
      return loans;
    } catch (error) {
      console.error('Failed to fetch loans:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const createLoan = createAsyncThunk(
  'loans/createLoan',
  async ({ userId, loanData }, { rejectWithValue }) => {
    try {
      console.log('Creating loan for user:', userId, 'with data:', loanData);
      const loan = await dataService.loansService.createLoan(userId, loanData);
      console.log('Created loan:', loan);
      return loan;
    } catch (error) {
      console.error('Failed to create loan:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const updateLoan = createAsyncThunk(
  'loans/updateLoan',
  async ({ loanId, updateData }, { rejectWithValue }) => {
    try {
      console.log('Updating loan:', loanId, 'with data:', updateData);
      const loan = await dataService.loansService.updateLoan(loanId, updateData);
      console.log('Updated loan:', loan);
      return loan;
    } catch (error) {
      console.error('Failed to update loan:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteLoan = createAsyncThunk(
  'loans/deleteLoan',
  async ({ loanId }, { rejectWithValue }) => {
    try {
      console.log('Deleting loan:', loanId);
      await dataService.loansService.deleteLoan(loanId);
      console.log('Deleted loan:', loanId);
      return loanId;
    } catch (error) {
      console.error('Failed to delete loan:', error);
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  loans: [],
  loading: false,
  error: null,
  lastUpdated: null
};

// Loans slice
const loansSlice = createSlice({
  name: 'loans',
  initialState,
  reducers: {
    clearLoansError: (state) => {
      state.error = null;
    },
    clearLoans: (state) => {
      state.loans = [];
      state.loading = false;
      state.error = null;
      state.lastUpdated = null;
    }
  },
  extraReducers: (builder) => {
    // Fetch loans
    builder
      .addCase(fetchLoans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoans.fulfilled, (state, action) => {
        state.loading = false;
        state.loans = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchLoans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create loan
      .addCase(createLoan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLoan.fulfilled, (state, action) => {
        state.loading = false;
        state.loans.unshift(action.payload);
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(createLoan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update loan
      .addCase(updateLoan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLoan.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.loans.findIndex(loan => loan.id === action.payload.id);
        if (index !== -1) {
          state.loans[index] = action.payload;
        }
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(updateLoan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete loan
      .addCase(deleteLoan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLoan.fulfilled, (state, action) => {
        state.loading = false;
        state.loans = state.loans.filter(loan => loan.id !== action.payload);
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(deleteLoan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearLoansError, clearLoans } = loansSlice.actions;
export default loansSlice.reducer; 