import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firestoreDb } from '../Firebase/firebase';

export const fetchGeneralSettings = createAsyncThunk(
  'generalSettings/fetch',
  async (_, { rejectWithValue }) => {
    const user = getAuth().currentUser;
    if (!user) return rejectWithValue('Not authenticated');
    const ref = doc(firestoreDb, `users/${user.uid}/generalSettings/settings`);
    const snap = await getDoc(ref);
    return snap.exists() ? snap.data() : null;
  }
);

export const updateGeneralSettings = createAsyncThunk(
  'generalSettings/update',
  async (settings, { rejectWithValue }) => {
    const user = getAuth().currentUser;
    if (!user) return rejectWithValue('Not authenticated');
    const ref = doc(firestoreDb, `users/${user.uid}/generalSettings/settings`);
    await setDoc(ref, settings, { merge: true });
    return settings;
  }
);

const initialState = {
  settings: null,
  loading: false,
  error: null
};

const generalSettingsSlice = createSlice({
  name: 'generalSettings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGeneralSettings.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchGeneralSettings.fulfilled, (state, action) => { state.loading = false; state.settings = action.payload; })
      .addCase(fetchGeneralSettings.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(updateGeneralSettings.fulfilled, (state, action) => { state.settings = action.payload; });
  }
});

export default generalSettingsSlice.reducer;
