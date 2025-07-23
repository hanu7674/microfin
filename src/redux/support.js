import { collection, onSnapshot, addDoc } from 'firebase/firestore';
import { auth, firestoreDb, supportTicketsCollection, callbackRequestsCollection, knowledgeBaseCollection } from '../Firebase/firebase';
import * as types from './types';
import dataService from '../services/dataService';

const initialState = {
  tickets: [],
  ticketsLoading: false,
  ticketsError: null,
  callbackRequests: [],
  callbackLoading: false,
  callbackError: null,
  knowledgeBase: [],
  kbLoading: false,
  kbError: null,
};

export const listenToSupportTickets = () => (dispatch) => {
  dispatch({ type: types.FETCH_SUPPORT_TICKETS_REQUEST });
  const userId = auth?.currentUser?.uid;
  const ref = supportTicketsCollection(userId);
  return onSnapshot(ref, (snapshot) => {
    const tickets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    dispatch({ type: types.FETCH_SUPPORT_TICKETS_SUCCESS, payload: tickets });
  }, (error) => {
    dispatch({ type: types.FETCH_SUPPORT_TICKETS_FAILURE, payload: error.message });
  });
};

export const listenToCallbackRequests = () => (dispatch) => {
  dispatch({ type: types.FETCH_CALLBACK_REQUESTS_REQUEST });
  const userId = auth?.currentUser?.uid;
  const ref = callbackRequestsCollection(userId);
  return onSnapshot(ref, (snapshot) => {
    const requests = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    dispatch({ type: types.FETCH_CALLBACK_REQUESTS_SUCCESS, payload: requests });
  }, (error) => {
    dispatch({ type: types.FETCH_CALLBACK_REQUESTS_FAILURE, payload: error.message });
  });
};

export const listenToKnowledgeBase = () => (dispatch) => {
  dispatch({ type: types.FETCH_KNOWLEDGE_BASE_REQUEST });
  const userId = auth?.currentUser?.uid;
  const ref = knowledgeBaseCollection(userId);
  return onSnapshot(ref, (snapshot) => {
    const articles = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    dispatch({ type: types.FETCH_KNOWLEDGE_BASE_SUCCESS, payload: articles });
  }, (error) => {
    dispatch({ type: types.FETCH_KNOWLEDGE_BASE_FAILURE, payload: error.message });
  });
};

export const addSupportTicket = (userId, ticket) => async (dispatch) => {
    return dataService.supportService.createSupportTicket(
        userId,
        ticket,
        (data) => dispatch({ type: types.ADD_SUPPORT_TICKET_SUCCESS, payload: data }),
        (error) => dispatch({ type: types.ADD_SUPPORT_TICKET_FAILURE, payload: error.message })
      );
}

    
export default function supportReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_SUPPORT_TICKETS_REQUEST:
      return { ...state, ticketsLoading: true, ticketsError: null };
    case types.FETCH_SUPPORT_TICKETS_SUCCESS:
      return { ...state, ticketsLoading: false, tickets: action.payload, ticketsError: null };
    case types.FETCH_SUPPORT_TICKETS_FAILURE:
      return { ...state, ticketsLoading: false, ticketsError: action.payload };
    case types.FETCH_CALLBACK_REQUESTS_REQUEST:
      return { ...state, callbackLoading: true, callbackError: null };
    case types.FETCH_CALLBACK_REQUESTS_SUCCESS:
      return { ...state, callbackLoading: false, callbackRequests: action.payload, callbackError: null };
    case types.FETCH_CALLBACK_REQUESTS_FAILURE:
      return { ...state, callbackLoading: false, callbackError: action.payload };
    case types.FETCH_KNOWLEDGE_BASE_REQUEST:
      return { ...state, kbLoading: true, kbError: null };
    case types.FETCH_KNOWLEDGE_BASE_SUCCESS:
      return { ...state, kbLoading: false, knowledgeBase: action.payload, kbError: null };
    case types.FETCH_KNOWLEDGE_BASE_FAILURE:
      return { ...state, kbLoading: false, kbError: action.payload };
    default:
      return state;
  }
} 