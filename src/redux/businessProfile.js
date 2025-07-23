import {
  FETCH_BUSINESS_PROFILE_REQUEST,
  FETCH_BUSINESS_PROFILE_SUCCESS,
  FETCH_BUSINESS_PROFILE_FAILURE,
  UPDATE_BUSINESS_PROFILE_REQUEST,
  UPDATE_BUSINESS_PROFILE_SUCCESS,
  UPDATE_BUSINESS_PROFILE_FAILURE
} from '../reducers/types';
import dataService from '../services/dataService';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage, firestoreDb, auth, currentSubscriptionRef } from '../Firebase/firebase';
import { collection, addDoc, serverTimestamp , doc, setDoc, onSnapshot} from 'firebase/firestore';
import { SUBSCRIBE_PLAN_REQUEST, SUBSCRIBE_PLAN_SUCCESS, SUBSCRIBE_PLAN_FAILURE } from '../reducers/types';
// Actions
export const fetchBusinessProfileRequest = () => ({ type: FETCH_BUSINESS_PROFILE_REQUEST });
export const fetchBusinessProfileSuccess = (data) => ({ type: FETCH_BUSINESS_PROFILE_SUCCESS, payload: data });
export const fetchBusinessProfileFailure = (error) => ({ type: FETCH_BUSINESS_PROFILE_FAILURE, payload: error });

export const updateBusinessProfileRequest = () => ({ type: UPDATE_BUSINESS_PROFILE_REQUEST });
export const updateBusinessProfileSuccess = (data) => ({ type: UPDATE_BUSINESS_PROFILE_SUCCESS, payload: data });
export const updateBusinessProfileFailure = (error) => ({ type: UPDATE_BUSINESS_PROFILE_FAILURE, payload: error });

export const uploadBusinessDocumentRequest = () => ({ type: 'UPLOAD_BUSINESS_DOCUMENT_REQUEST' });
export const uploadBusinessDocumentProgress = (progress) => ({ type: 'UPLOAD_BUSINESS_DOCUMENT_PROGRESS', payload: progress });
export const uploadBusinessDocumentSuccess = (doc) => ({ type: 'UPLOAD_BUSINESS_DOCUMENT_SUCCESS', payload: doc });
export const uploadBusinessDocumentFailure = (error) => ({ type: 'UPLOAD_BUSINESS_DOCUMENT_FAILURE', payload: error });

export const fetchBusinessDocumentsRequest = () => ({ type: 'FETCH_BUSINESS_DOCUMENTS_REQUEST' });
export const fetchBusinessDocumentsSuccess = (data) => ({ type: 'FETCH_BUSINESS_DOCUMENTS_SUCCESS', payload: data });
export const fetchBusinessDocumentsFailure = (error) => ({ type: 'FETCH_BUSINESS_DOCUMENTS_FAILURE', payload: error });

export const fetchSubscriptionRequest = () => ({ type: 'FETCH_SUBSCRIPTION_REQUEST' });
export const fetchSubscriptionSuccess = (data) => ({ type: 'FETCH_SUBSCRIPTION_SUCCESS', payload: data });
export const fetchSubscriptionFailure = (error) => ({ type: 'FETCH_SUBSCRIPTION_FAILURE', payload: error });

export const addBusinessUserRequest = () => ({ type: 'ADD_BUSINESS_USER_REQUEST' });
export const addBusinessUserSuccess = (data) => ({ type: 'ADD_BUSINESS_USER_SUCCESS', payload: data });
export const addBusinessUserFailure = (error) => ({ type: 'ADD_BUSINESS_USER_FAILURE', payload: error });

export const editBusinessUserRequest = () => ({ type: 'EDIT_BUSINESS_USER_REQUEST' });
export const editBusinessUserSuccess = (data) => ({ type: 'EDIT_BUSINESS_USER_SUCCESS', payload: data });
export const editBusinessUserFailure = (error) => ({ type: 'EDIT_BUSINESS_USER_FAILURE', payload: error });

export const removeBusinessUserRequest = () => ({ type: 'REMOVE_BUSINESS_USER_REQUEST' });
export const removeBusinessUserSuccess = (data) => ({ type: 'REMOVE_BUSINESS_USER_SUCCESS', payload: data });
export const removeBusinessUserFailure = (error) => ({ type: 'REMOVE_BUSINESS_USER_FAILURE', payload: error });

export const fetchBusinessUsersRequest = () => ({ type: 'FETCH_BUSINESS_USERS_REQUEST' });
export const fetchBusinessUsersSuccess = (data) => ({ type: 'FETCH_BUSINESS_USERS_SUCCESS', payload: data });
export const fetchBusinessUsersFailure = (error) => ({ type: 'FETCH_BUSINESS_USERS_FAILURE', payload: error });

export const subscribeToPlan = (plan) => async (dispatch) => {
  dispatch({ type: SUBSCRIBE_PLAN_REQUEST });
  try {
    const userId = auth.currentUser.uid;
    const subRef = doc(firestoreDb, `users/${userId}/subscriptions/current`);
    await setDoc(subRef, {
      ...plan,
      status: 'active',
      subscribedAt: serverTimestamp(),
      nextBillingDate: plan.nextBillingDate || null,
      billingHistory: [],
    }, { merge: true });
    dispatch({ type: SUBSCRIBE_PLAN_SUCCESS, payload: plan });
  } catch (error) {
    dispatch({ type: SUBSCRIBE_PLAN_FAILURE, payload: error.message });
  }
};

// Listener for subscription changes
export const listenToSubscription = (userId) => (dispatch) => {
  // FIX: Use valid document path (4 segments)
  const subRef = doc(firestoreDb, `users/${userId}/subscriptions/current`);
  return onSnapshot(subRef, (docSnap) => {
    if (docSnap.exists()) {
      dispatch({ type: 'FETCH_SUBSCRIPTION_SUCCESS', payload: docSnap.data() });
    }
  });
};

// Thunks
export const fetchBusinessProfile = (userId) => async (dispatch) => {
  dispatch(fetchBusinessProfileRequest());
  try {
    const data = await dataService.businessProfileService.fetchBusinessProfile(userId);
    dispatch(fetchBusinessProfileSuccess(data));
  } catch (error) {
    dispatch(fetchBusinessProfileFailure(error.message));
  }
};

export const updateBusinessProfile = (userId, profileData) => async (dispatch) => {
  dispatch(updateBusinessProfileRequest());
  try {
    await dataService.businessProfileService.updateBusinessProfile(userId, profileData);
    dispatch(updateBusinessProfileSuccess(profileData));
  } catch (error) {
    dispatch(updateBusinessProfileFailure(error.message));
  }
};

export const uploadBusinessDocument = (file, document) => async (dispatch) => {
  dispatch(uploadBusinessDocumentRequest());
  try {
    const userId = auth.currentUser.uid;
    const ext = file.name.split('.').pop().toLowerCase();
    const storageRef = ref(storage, `business_documents/${userId}/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        dispatch(uploadBusinessDocumentProgress(progress));
      },
      (error) => {
        dispatch(uploadBusinessDocumentFailure(error.message));
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        const docData = {
          uploadedAt: serverTimestamp(),
          fileName: file.name,
          fileType: ext,
          status: 'Pending',
          downloadUrl,
          ...document
        };
        const docsRef = collection(firestoreDb, `users/${userId}/business_documents`);
        await addDoc(docsRef, docData);
        dispatch(uploadBusinessDocumentSuccess(docData));
      }
    );
  } catch (error) {
    dispatch(uploadBusinessDocumentFailure(error.message));
  }
};

export const fetchBusinessDocuments = (userId) => async (dispatch) => {
  dispatch(fetchBusinessDocumentsRequest());
  try {
    const data = await dataService.businessProfileService.fetchBusinessDocuments(userId);
    dispatch(fetchBusinessDocumentsSuccess(data));
  } catch (error) {
    dispatch(fetchBusinessDocumentsFailure(error.message));
  }
};

export const fetchSubscriptionDetails = () => async (dispatch) => {

  try {
    dispatch(fetchSubscriptionRequest());
    const data = await dataService.businessProfileService.fetchSubscription();
    dispatch(fetchSubscriptionSuccess(data));
  } catch (error) {
    dispatch(fetchSubscriptionFailure(error.message));
  }
};

export const fetchBusinessUsers = () => async (dispatch) => {

  try {
    dispatch(fetchBusinessUsersRequest());
    const data = await dataService.businessProfileService.fetchBusinessUsers();
    dispatch(fetchBusinessUsersSuccess(data));
  } catch (error) {
    dispatch(fetchBusinessUsersFailure(error.message));
  }
};

export const addBusinessUser = (newUser) => async (dispatch) => {
  try {
    dispatch(addBusinessUserRequest());
    const data = await dataService.businessProfileService.addBusinessUser(newUser);
    dispatch(addBusinessUserSuccess(data));
    dispatch(fetchBusinessUsers());
  } catch (error) {
    dispatch(addBusinessUserFailure(error.message));
  }
};

// Edit user in business profile
export const editBusinessUser = (updatedUser) => async (dispatch) => {
  try {
    dispatch(editBusinessUserRequest());
    const data = await dataService.businessProfileService.updateBusinessUser(updatedUser);
    dispatch(editBusinessUserSuccess(data));
  } catch (error) {
    dispatch(editBusinessUserFailure(error.message));
  }
};

// Remove user from business profile
export const removeBusinessUser = (userIdToRemove) => async (dispatch) => {
  try {
    dispatch(removeBusinessUserRequest());
    const data = await dataService.businessProfileService.deleteBusinessUser(userIdToRemove);
    dispatch(removeBusinessUserSuccess(data));
    dispatch(fetchBusinessUsers());
  } catch (error) {
    dispatch(removeBusinessUserFailure(error.message));
  }
};

// Reducer
const initialState = {
  profile: null,
  loading: false,
  error: null,
  uploading: false,
  uploadProgress: 0,
  uploadError: null,
  documents: [],
  documentsLoading: false,
  documentsError: null,
  subscription: null,
  subscriptionLoading: false,
  subscriptionError: null
};

export default function businessProfileReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_BUSINESS_PROFILE_REQUEST:
    case UPDATE_BUSINESS_PROFILE_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_BUSINESS_PROFILE_SUCCESS:
    case UPDATE_BUSINESS_PROFILE_SUCCESS:
      return { ...state, loading: false, profile: action.payload, error: null };
    case FETCH_BUSINESS_PROFILE_FAILURE:
    case UPDATE_BUSINESS_PROFILE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case 'UPLOAD_BUSINESS_DOCUMENT_REQUEST':
      return { ...state, uploading: true, uploadProgress: 0, uploadError: null };
    case 'UPLOAD_BUSINESS_DOCUMENT_PROGRESS':
      return { ...state, uploadProgress: action.payload };
    case 'UPLOAD_BUSINESS_DOCUMENT_SUCCESS':
      return { ...state, uploading: false, uploadProgress: 100, uploadError: null };
    case 'UPLOAD_BUSINESS_DOCUMENT_FAILURE':
      return { ...state, uploading: false, uploadError: action.payload };
    case 'FETCH_BUSINESS_DOCUMENTS_REQUEST':
      return { ...state, documentsLoading: true, documentsError: null };
    case 'FETCH_BUSINESS_DOCUMENTS_SUCCESS':
      return { ...state, documentsLoading: false, documents: action.payload, documentsError: null };
    case 'FETCH_BUSINESS_DOCUMENTS_FAILURE':
      return { ...state, documentsLoading: false, documentsError: action.payload };
    case 'FETCH_SUBSCRIPTION_REQUEST':
      return { ...state, subscriptionLoading: true, subscriptionError: null };
    case 'FETCH_SUBSCRIPTION_SUCCESS':
      return { ...state, subscriptionLoading: false, subscription: action.payload, subscriptionError: null };
    case 'FETCH_SUBSCRIPTION_FAILURE':
      return { ...state, subscriptionLoading: false, subscriptionError: action.payload };
    case SUBSCRIBE_PLAN_REQUEST:
      return { ...state, subscriptionLoading: true, subscriptionError: null };
    case SUBSCRIBE_PLAN_SUCCESS:
      return { ...state, subscriptionLoading: false, subscription: action.payload, subscriptionError: null };
    case SUBSCRIBE_PLAN_FAILURE:
      return { ...state, subscriptionLoading: false, subscriptionError: action.payload };
    case 'ADD_BUSINESS_USER_REQUEST':
      return { ...state, loading: true, error: null };
    case 'ADD_BUSINESS_USER_SUCCESS':
      return { ...state, loading: false, users: [...state.users, action.payload], error: null };
    case 'ADD_BUSINESS_USER_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'EDIT_BUSINESS_USER_REQUEST': 
      return { ...state, loading: true, error: null };
    case 'EDIT_BUSINESS_USER_SUCCESS':
      return { ...state, loading: false, users: state.users.map(user => user.id === action.payload.id ? action.payload : user), error: null };
    case 'EDIT_BUSINESS_USER_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'REMOVE_BUSINESS_USER_REQUEST':
      return { ...state, loading: true, error: null };
    case 'REMOVE_BUSINESS_USER_SUCCESS':
      return { ...state, loading: false, users: state.users.filter(user => user.id !== action.payload), error: null };
    case 'REMOVE_BUSINESS_USER_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'FETCH_BUSINESS_USERS_REQUEST':
      return { ...state, usersLoading: true, usersError: null };
    case 'FETCH_BUSINESS_USERS_SUCCESS':
      return { ...state, usersLoading: false, users: action.payload, usersError: null };
    case 'FETCH_BUSINESS_USERS_FAILURE':
      return { ...state, usersLoading: false, usersError: action.payload };
    default:
      return state;
  }
}
