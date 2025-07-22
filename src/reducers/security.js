import * as types from './types';


const initialState = {
    sessions: [],
    loading: false,
    error: null,
    passwordResetSuccess: false,
    twoFAEnabled: false,
  };
  
  export default function securityReducer(state = initialState, action) {
    switch (action.type) {
      case types.FETCH_SESSIONS_REQUEST:
      case types.REVOKE_SESSION_REQUEST:
      case types.PASSWORD_RESET_REQUEST:
      case types.FETCH_2FA_STATUS_REQUEST:
        return { ...state, loading: true, error: null, passwordResetSuccess: false };
      case types.FETCH_SESSIONS_SUCCESS:
        return { ...state, loading: false, sessions: action.payload };
      case types.FETCH_SESSIONS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case types.REVOKE_SESSION_SUCCESS:
        return { ...state, loading: false, sessions: state.sessions.filter(s => s.sessionId !== action.payload) };
      case types.REVOKE_SESSION_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case types.PASSWORD_RESET_SUCCESS:
        return { ...state, loading: false, passwordResetSuccess: true };
      case types.PASSWORD_RESET_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case types.FETCH_2FA_STATUS_SUCCESS:
        return { ...state, loading: false, twoFAEnabled: action.payload };
      case types.FETCH_2FA_STATUS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  }