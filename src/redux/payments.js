import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dataService from '../services/dataService';

export const fetchPayments = createAsyncThunk(
  'payments/fetchPayments',
  async (userId, { rejectWithValue }) => {
    try {
      return await dataService.paymentsService.fetchPayments(userId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const generatePaymentLinkAction = createAsyncThunk(
    'paymentLinks/generate',
    async (formData, { rejectWithValue }) => {
      try {
        return await dataService.paymentsService.generatePaymentLink(formData);
      } catch (error) {
        return rejectWithValue(error.message);
      }
    } 
  );
export const expireOldPaymentLinksAction = createAsyncThunk(
  'paymentLinks/expireOld',
  async (userId, { rejectWithValue }) => {
    try {
      return await dataService.paymentsService.expireOldPaymentLinks();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }

);
export const listenToPaymentLinkAction = (linkId) => (dispatch) => {
  return dataService.paymentsService.listenToPaymentLink(
    linkId,
    (data) => dispatch(updatePaymentLinkStatus(data)),
    (error) => dispatch(setPaymentLinkError(error.message))
  );
};
export const clearPaymentLinkStatusAction = (linkId) => (dispatch) => {
  dataService.paymentsService.clearPaymentLinkStatus(linkId);
  dispatch(clearPaymentLinkStatus(linkId));
};

const paymentsSlice = createSlice({
  name: 'payments',
  initialState: {
    payments: [],
    paymentMethods: [],
    loading: false,
    error: null,
    generatedLink: null,
    expiredLinks: [],
    linkLoading: false,
    linkError: null,
    paymentLinkStatus: null,
  },
  reducers: {
    updatePaymentLinkStatus: (state, action) => {
      state.paymentLinkStatus = action.payload;
      // Optionally update generatedLink if you want to keep it in sync
      if (state.generatedLink && action.payload && action.payload.id === state.generatedLink.id) {
        state.generatedLink = { ...state.generatedLink, ...action.payload };
      }
      state.linkError = null;
    },
    setPaymentLinkError: (state, action) => {
      state.linkError = action.payload;
    },
    clearPaymentLinkStatus: (state) => {
      state.paymentLinkStatus = null;
      state.linkError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload.transactions || [];
        state.paymentMethods = action.payload.methods || [];
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(generatePaymentLinkAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generatePaymentLinkAction.fulfilled, (state, action) => {
        state.loading = false;
        state.generatedLink = action.payload;
      })
      .addCase(generatePaymentLinkAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(expireOldPaymentLinksAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(expireOldPaymentLinksAction.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally update expiredLinks or other state here
      })
      .addCase(expireOldPaymentLinksAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export const { updatePaymentLinkStatus, setPaymentLinkError, clearPaymentLinkStatus } = paymentsSlice.actions;
export default paymentsSlice.reducer;
