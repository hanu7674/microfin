import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import dataService from '../services/dataService';

// Async thunks
export const fetchClients = createAsyncThunk(
  'clients/fetchClients',
  async ({ userId, filters = {} }, { rejectWithValue }) => {
    try {
      console.log('Fetching clients for user:', userId, 'with filters:', filters);
      const clients = await dataService.clientsService.fetchClients(userId, filters);
      console.log('Fetched clients:', clients);
      return clients;
    } catch (error) {
      console.error('Failed to fetch clients:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const createClient = createAsyncThunk(
  'clients/createClient',
  async ({ userId, clientData }, { rejectWithValue }) => {
    try {
      console.log('Creating client for user:', userId, 'with data:', clientData);
      const client = await dataService.clientsService.createClient(userId, clientData);
      console.log('Created client:', client);
      return client;
    } catch (error) {
      console.error('Failed to create client:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const updateClient = createAsyncThunk(
  'clients/updateClient',
  async ({ clientId, updateData }, { rejectWithValue }) => {
    try {
      console.log('Updating client:', clientId, 'with data:', updateData);
      const client = await dataService.clientsService.updateClient(clientId, updateData);
      console.log('Updated client:', client);
      return client;
    } catch (error) {
      console.error('Failed to update client:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteClient = createAsyncThunk(
  'clients/deleteClient',
  async ({ clientId }, { rejectWithValue }) => {
    try {
      console.log('Deleting client:', clientId);
      await dataService.clientsService.deleteClient(clientId);
      console.log('Deleted client:', clientId);
      return clientId;
    } catch (error) {
      console.error('Failed to delete client:', error);
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  clients: [],
  loading: false,
  error: null,
  lastUpdated: null
};

// Clients slice
const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    clearClientsError: (state) => {
      state.error = null;
    },
    clearClients: (state) => {
      state.clients = [];
      state.loading = false;
      state.error = null;
      state.lastUpdated = null;
    }
  },
  extraReducers: (builder) => {
    // Fetch clients
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create client
      .addCase(createClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.loading = false;
        state.clients.unshift(action.payload);
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(createClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update client
      .addCase(updateClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.clients.findIndex(client => client.id === action.payload.id);
        if (index !== -1) {
          state.clients[index] = action.payload;
        }
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete client
      .addCase(deleteClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = state.clients.filter(client => client.id !== action.payload);
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearClientsError, clearClients } = clientsSlice.actions;
export default clientsSlice.reducer; 