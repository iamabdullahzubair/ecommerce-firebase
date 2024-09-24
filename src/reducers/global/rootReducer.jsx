import { CART_ACTIONS, cartReducer } from "../cart/cartReducer";
import { ORDER_ACTIONS, orderReducer } from "../order/orderReducer";
import { PRODUCT_ACTIONS, productReducer } from "../products/productsReducer";
import { USER_ACTIONS, userReducer } from "../user/userReducer";

export const initialState = {
  user: { user: null, userData: null, loading: false, error: null },
  productsGlobal: { products: [], loading: true, error: null },
  cartGlobal: { cart: [], loading: true, error: null },
  ordersGlobal: { orders: [], loading: false, error: null },
};

export const rootReducer = (state, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
    case USER_ACTIONS.SET_USER_DATA:
    case USER_ACTIONS.LOGOUT:
    case USER_ACTIONS.SET_LOADING:
      return { ...state, user: userReducer(state.user, action) };

    case PRODUCT_ACTIONS.SET_PRODUCTS:
    case PRODUCT_ACTIONS.ADD_PRODUCTS:
    case PRODUCT_ACTIONS.SET_LOADING:
    case PRODUCT_ACTIONS.SET_ERROR:
    case PRODUCT_ACTIONS.DELETE_PRODUCT:
      return {
        ...state,
        productsGlobal: productReducer(state.productsGlobal, action),
      };

    case CART_ACTIONS.SET_CART:
    case CART_ACTIONS.ADD_TO_CART:
    case CART_ACTIONS.UPDATE_CART:
    case CART_ACTIONS.REMOVE_FROM_CART:
    case CART_ACTIONS.DELETE_CART:
    case CART_ACTIONS.SET_LOADING:
    case CART_ACTIONS.SET_ERROR:
      return { ...state, cartGlobal: cartReducer(state.cartGlobal, action) };

    case ORDER_ACTIONS.PLACE_ORDER:
    case ORDER_ACTIONS.GET_ORDER:
    case ORDER_ACTIONS.CANCEL_ORDER:
    case ORDER_ACTIONS.SET_LOADING:
    case ORDER_ACTIONS.SET_ERROR:
      return {
        ...state,
        ordersGlobal: orderReducer(state.ordersGlobal, action),
      };

    default:
      return state;
  }
};
