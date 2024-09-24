
// cartReducer.js
export const CART_ACTIONS = {
    SET_CART : "SET_CART",
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    UPDATE_CART : "UPDATE_CART",
    DELETE_CART : "DELETE_CART",
    SET_LOADING : "SET_LOADING",
    SET_ERROR : "SET_ERROR",
  };
  
  export const cartReducer = (state, action) => {
    switch (action.type) {
      case CART_ACTIONS.SET_CART:
        return {
          ...state,
          cart : action.payload,
          loading : false,
          error : null
        };
      case CART_ACTIONS.ADD_TO_CART:
        
        return {
          ...state,
          cart : [...state.cart, action.payload],
          loading : false,
          error : null
        };
      case CART_ACTIONS.UPDATE_CART:
        return {
          ...state,
          cart  : action.payload,
          loading : false,
          error : null
        }
      case CART_ACTIONS.REMOVE_FROM_CART:
         updatedCart = state.cart.filter(item => item.pId !== action.payload);  // i will send only ID
        return {
          ...state,
          cart  : updatedCart,
          loading : false,
          error : null
        }
      case CART_ACTIONS.SET_LOADING:
        return {
          ...state,
          loading : true,
          error : null
        }
      case CART_ACTIONS.SET_ERROR:
        return {
          ...state,
          loading : false,
          error : action.payload 
        }
      default:
        return state;
    }
  };
  