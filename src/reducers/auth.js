import * as types from './types';

const initialState = {
  // Role-based auth state
  

  // Existing auth state
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  
};

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    // Role-based authentication cases
    case types.LOGIN_REQUEST:
    case types.LOGOUT_REQUEST:
    case types.GET_CURRENT_USER_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case types.LOGIN_SUCCESS:
      return {
        ...state,
        user: payload.user,
        path: payload.path,
        isAuthenticated: true,
        loading: false,
        error: null
      };

    case types.LOGOUT_SUCCESS:
      return {
        ...initialState
      };
    case types.GET_CURRENT_USER_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case types.GET_CURRENT_USER_DATA_SUCCESS:
        return {
          ...state,
          loading: false,
          user: {
            ...state.user,
            ...payload
          },
          isAuthenticated: true
        };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case types.LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload
      };
    
    case 'SET_AUTH_STATE':
      return {
        ...state,
        isAuthenticated: payload.isAuthenticated,
        user: payload.user,
        loading: false,
        error: null
      };
    
 default:
      return state;
  }
};

export default authReducer;