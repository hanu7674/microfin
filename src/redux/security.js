import {
  FETCH_SESSIONS_REQUEST, FETCH_SESSIONS_SUCCESS, FETCH_SESSIONS_FAILURE,
  REVOKE_SESSION_REQUEST, REVOKE_SESSION_SUCCESS, REVOKE_SESSION_FAILURE,
  PASSWORD_RESET_REQUEST, PASSWORD_RESET_SUCCESS, PASSWORD_RESET_FAILURE,
  FETCH_2FA_STATUS_REQUEST, FETCH_2FA_STATUS_SUCCESS, FETCH_2FA_STATUS_FAILURE
} from '../reducers/types';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { collection, getDocs, deleteDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { firestoreDb } from '../Firebase/firebase';

export const fetchSessions = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_SESSIONS_REQUEST });
  try {
    const sessionsRef = collection(firestoreDb, `users/${userId}/sessions`);
    const snapshot = await getDocs(sessionsRef);
    const sessionList = snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
    dispatch({ type: FETCH_SESSIONS_SUCCESS, payload: sessionList });
  } catch (error) {
    dispatch({ type: FETCH_SESSIONS_FAILURE, payload: error.message });
  }
};

export const revokeSession = (userId, sessionId) => async (dispatch) => {
  dispatch({ type: REVOKE_SESSION_REQUEST });
  try {
    await deleteDoc(doc(firestoreDb, `users/${userId}/sessions/${sessionId}`));
    dispatch({ type: REVOKE_SESSION_SUCCESS, payload: sessionId });
  } catch (error) {
    dispatch({ type: REVOKE_SESSION_FAILURE, payload: error.message });
  }
};

export const sendPasswordReset = (email) => async (dispatch) => {
  dispatch({ type: PASSWORD_RESET_REQUEST });
  try {
    await sendPasswordResetEmail(getAuth(), email);
    dispatch({ type: PASSWORD_RESET_SUCCESS });
  } catch (error) {
    dispatch({ type: PASSWORD_RESET_FAILURE, payload: error.message });
  }
};

export const fetch2FAStatus = () => async (dispatch) => {
  dispatch({ type: FETCH_2FA_STATUS_REQUEST });
  try {
    const user = getAuth().currentUser;
    const enabled = user && user.multiFactor && user.multiFactor.enrolledFactors.length > 0;
    dispatch({ type: FETCH_2FA_STATUS_SUCCESS, payload: enabled });
  } catch (error) {
    dispatch({ type: FETCH_2FA_STATUS_FAILURE, payload: error.message });
  }
};
