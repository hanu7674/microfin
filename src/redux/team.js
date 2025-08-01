import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { teamCollection, teamMemberById } from '../Firebase/firebase';

// Async thunks
export const fetchTeamMembers = createAsyncThunk(
  'team/fetchTeamMembers',
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(teamCollection());
      const teamMembers = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      return teamMembers;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const teamMembers = [
  { 
    name: 'HANUMANTHA REDDY LINGALA', 
    role: 'Team Lead and Developer', 
    github: 'hanu7674' 
  },
  { 
    name: 'PORANDLA SHIVARAMA KRISHNA', 
    role: 'Developer', 
    github: 'shivaramakrishna123' 
  },
  { 
    name: 'PAVAN KUMAR BOGADI', 
    role: 'Developer', 
    github: 'pavan123' 
  },
  { 
    name: 'LAKSHETTI MANIDEEP', 
    role: 'Developer', 
    github: 'manideep123' 
  },
  { 
    name: 'THOMBARAPU CHANDU', 
    role: 'Developer', 
    github: 'chandu123' 
  }
];

// Function to add team members to Firebase
export const addTeamMembersToFirebase = createAsyncThunk(
  'team/addTeamMembersToFirebase',
  async (_, { rejectWithValue }) => {
  try {
    console.log('Starting to add team members to Firebase...');
    
    for (const member of teamMembers) {
      const docRef = await addDoc(teamCollection(), {
        ...member,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      console.log(`✅ Added team member: ${member.name} (ID: ${docRef.id})`);
    }
    
    console.log('🎉 All team members have been successfully added to Firebase!');
  } catch (error) {
    console.error('❌ Error adding team members:', error);
    return rejectWithValue(error.message);
  }
});

export const addTeamMember = createAsyncThunk(
  'team/addTeamMember',
  async (memberData, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(teamCollection(), {
        ...memberData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return {
        id: docRef.id,
        ...memberData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTeamMember = createAsyncThunk(
  'team/updateTeamMember',
  async ({ id, memberData }, { rejectWithValue }) => {
    try {
      await updateDoc(teamMemberById(id), {
        ...memberData,
        updatedAt: serverTimestamp()
      });
      return {
        id,
        ...memberData,
        updatedAt: new Date()
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTeamMember = createAsyncThunk(
  'team/deleteTeamMember',
  async (id, { rejectWithValue }) => {
    try {
      await deleteDoc(teamMemberById(id));
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  teamMembers: [],
  loading: false,
  error: null,
  lastUpdated: null
};

// Team slice
const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    clearTeamError: (state) => {
      state.error = null;
    },
    clearTeam: (state) => {
      state.teamMembers = [];
      state.loading = false;
      state.error = null;
      state.lastUpdated = null;
    }
  },
  extraReducers: (builder) => {
    // Fetch team members
    builder
      .addCase(fetchTeamMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.teamMembers = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchTeamMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Add team member
      .addCase(addTeamMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTeamMember.fulfilled, (state, action) => {
        state.loading = false;
        state.teamMembers.unshift(action.payload);
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(addTeamMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update team member
      .addCase(updateTeamMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTeamMember.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.teamMembers.findIndex(member => member.id === action.payload.id);
        if (index !== -1) {
          state.teamMembers[index] = action.payload;
        }
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(updateTeamMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete team member
      .addCase(deleteTeamMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTeamMember.fulfilled, (state, action) => {
        state.loading = false;
        state.teamMembers = state.teamMembers.filter(member => member.id !== action.payload);
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(deleteTeamMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearTeamError, clearTeam } = teamSlice.actions;
export default teamSlice.reducer; 