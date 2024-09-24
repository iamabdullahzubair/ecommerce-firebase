// orderReducer.js
export const ORDER_ACTIONS = {
    PLACE_ORDER: 'PLACE_ORDER',
    CANCEL_ORDER: 'CANCEL_ORDER',
    GET_ORDER: 'GET_ORDER',
    SET_LOADING : "SET_LOADING",
    SET_ERROR : "SET_ERROR"
  };
  
  export const orderReducer = (state, action) => {
    switch (action.type) {
      case ORDER_ACTIONS.SET_LOADING:
        return {
          ...state,
          loading : payload ? payload : true,
        }
      case ORDER_ACTIONS.SET_ERROR:
        return {
          ...state,
          error : action.payload,
        }
      case ORDER_ACTIONS.PLACE_ORDER:
        return {
          ...state,
          orders : [...state.orders, action.payload],
          loading : false,
          error : null
        }
      case ORDER_ACTIONS.GET_ORDER:
        return {
          ...state,
          orders : action.payload,
          loading : false,
          error : null
        }
      default:
        return state;
    }
  };
  