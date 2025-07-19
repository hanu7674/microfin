


const initialState = {
    mode: 'light',
  };
  
  export default function themeReducer(state = initialState, action) {
    switch (action.type) {
      case 'SET_THEME':
        return { ...state, mode: action.payload };
      default:
        return state;
    }
  }