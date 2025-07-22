import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  FETCH_INVOICES_REQUEST, 
  FETCH_INVOICES_SUCCESS, 
  FETCH_INVOICES_FAILURE,
  CREATE_INVOICE_REQUEST,
  CREATE_INVOICE_SUCCESS,
  CREATE_INVOICE_FAILURE,
  UPDATE_INVOICE_REQUEST,
  UPDATE_INVOICE_SUCCESS,
  UPDATE_INVOICE_FAILURE,
  DELETE_INVOICE_REQUEST,
  DELETE_INVOICE_SUCCESS,
  DELETE_INVOICE_FAILURE
} from './types';
import dataService from '../services/dataService';

// Async thunks
export const fetchInvoices = createAsyncThunk(
  'invoices/fetchInvoices',
  async ({ userId, filters = {} }, { rejectWithValue }) => {
    try {
      console.log('Fetching invoices for user:', userId, 'with filters:', filters);
      const invoices = await dataService.invoicesService.fetchInvoices(userId, filters);
      console.log('Fetched invoices:', invoices);
      return invoices;
    } catch (error) {
      console.error('Failed to fetch invoices:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const createInvoice = createAsyncThunk(
  'invoices/createInvoice',
  async ({ userId, invoiceData }, { rejectWithValue }) => {
    try {
      console.log('Creating invoice for user:', userId, 'with data:', invoiceData);
      const invoice = await dataService.invoicesService.createInvoice(userId, invoiceData);
      console.log('Created invoice:', invoice);
      return invoice;
    } catch (error) {
      console.error('Failed to create invoice:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const updateInvoice = createAsyncThunk(
  'invoices/updateInvoice',
  async ({ invoiceId, updateData }, { rejectWithValue }) => {
    try {
      console.log('Updating invoice:', invoiceId, 'with data:', updateData);
      const invoice = await dataService.invoicesService.updateInvoice(invoiceId, updateData);
      console.log('Updated invoice:', invoice);
      return invoice;
    } catch (error) {
      console.error('Failed to update invoice:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteInvoice = createAsyncThunk(
  'invoices/deleteInvoice',
  async ({ invoiceId }, { rejectWithValue }) => {
    try {
      console.log('Deleting invoice:', invoiceId);
      await dataService.invoicesService.deleteInvoice(invoiceId);
      console.log('Deleted invoice:', invoiceId);
      return invoiceId;
    } catch (error) {
      console.error('Failed to delete invoice:', error);
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  invoices: [],
  loading: false,
  error: null,
  lastUpdated: null
};

// Invoices slice
const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    clearInvoicesError: (state) => {
      state.error = null;
    },
    clearInvoices: (state) => {
      state.invoices = [];
      state.loading = false;
      state.error = null;
      state.lastUpdated = null;
    }
  },
  extraReducers: (builder) => {
    // Fetch invoices
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create invoice
      .addCase(createInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices.unshift(action.payload);
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(createInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update invoice
      .addCase(updateInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateInvoice.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.invoices.findIndex(invoice => invoice.id === action.payload.id);
        if (index !== -1) {
          state.invoices[index] = action.payload;
        }
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(updateInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete invoice
      .addCase(deleteInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = state.invoices.filter(invoice => invoice.id !== action.payload);
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(deleteInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearInvoicesError, clearInvoices } = invoicesSlice.actions;
export default invoicesSlice.reducer; 