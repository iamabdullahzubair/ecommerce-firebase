// userReducer.js
export const USER_ACTIONS = {
  SET_USER: 'SET_USER',
  SET_USER_DATA: 'SET_USER_DATA',
  LOGOUT: 'LOGOUT',
  SET_LOADING: 'SET_LOADING',
};

export const userReducer = (state, action) => {
  // console.log("Current State:", state); // For debugging, remove in production
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return { ...state, user: action.payload, loading: false };
    case USER_ACTIONS.SET_USER_DATA:
      return { ...state, userData: action.payload, loading: false };
    case USER_ACTIONS.LOGOUT:
      return { ...state, user: null, userData: null, loading: false }; // Added loading: false on logout
    case USER_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload }; // Handle loading state properly
    default:
      return state;
  }
};
