export const PRODUCT_ACTIONS = {
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  SET_PRODUCTS: "SET_PRODUCTS",
  ADD_PRODUCTS: "ADD_PRODUCTS",
  DELETE_PRODUCT : "DELETE_PRODUCT",
  UPDATE_PRODUCT : "UPDATE_PRODUCT"
};

export const productReducer = (state, action) => {
  // console.log(state)   ---->  {products: Array(0), loading: true, error: null}
  switch (action.type) {
    case PRODUCT_ACTIONS.SET_PRODUCTS:
      console.log("set")
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null,
      };
      
    case PRODUCT_ACTIONS.ADD_PRODUCTS: 
    console.log("add") 
      return {...state}    
      return {
        ...state,
        products: [...state.products, action.payload],  // Add products to existing array
        loading: false,
        error: null,
      };
      case PRODUCT_ACTIONS.DELETE_PRODUCT:
        // Ensure products is always an array
        const updatedProducts = (state.products || []).filter(item => item.pId !== action.payload);
        
        return {
          ...state,
          products: updatedProducts,
          loading: false,
          error: null,
        };      

    case PRODUCT_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload, error: null };

    case PRODUCT_ACTIONS.SET_ERROR:
      return { 
        ...state,
        loading: false,  // Set loading to false since there's an error
        error: action.payload 
      };

    default:
      return state;
  }
};
