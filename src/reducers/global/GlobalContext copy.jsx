// GlobalContext.js
import React, { createContext, useReducer, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { initialState, rootReducer } from "./rootReducer";
import { USER_ACTIONS } from "../user/userReducer";
import { PRODUCT_ACTIONS } from "../products/productsReducer";
import { getCartList } from "../cart/CartAPI";
import { CART_ACTIONS } from "../cart/cartReducer";
import PageLoadingComplete from "../../pages/PageLoadingComplete";
import { getUserDetails } from "../user/userAPI";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const db = getFirestore();

  async function fetchCart(userId) {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING });
      const cartList = await getCartList(userId);
      dispatch({ type: CART_ACTIONS.SET_CART, payload: cartList });
    } catch (error) {
      console.log("Error to setcart", error);
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: error.message });
    }
  }
  useEffect(() => {
    console.log("I am listening auth");
    setLoading(true);
    dispatch({ type: USER_ACTIONS.SET_LOADING , payload : true });
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch({ type: USER_ACTIONS.SET_USER, payload: user });
        try {
          const { success, data, error } = await getUserDetails();
          if (success) {
            dispatch({ type: USER_ACTIONS.SET_USER_DATA, payload: data });
          } else if (error) {
            dispatch({ type: USER_ACTIONS.SET_ERROR, payload: error });
          }
          await fetchCart(user.uid);
        } catch (error) {
          console.error("Error fetching user data:", error);
          dispatch({ type: USER_ACTIONS.SET_ERROR, payload: error.message });
        } finally {
          console.log("finallly")
          console.log(state.user)
          dispatch({ type: USER_ACTIONS.SET_LOADING , payload : false});
          setLoading(false);
        }
      } else {
        dispatch({ type: USER_ACTIONS.LOGOUT });
        setLoading(false);
      }
    });
  
    return () => unsubscribeAuth();
  }, [auth, db]);
  

  useEffect(() => {
    console.log("Setting up products snapshot listener...");
    dispatch({ type: PRODUCT_ACTIONS.SET_LOADING });
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      console.log(
        "Snapshot data:",
        snapshot.docs.map((doc) => ({ pId: doc.id, ...doc.data() }))
      );
      const productsList = snapshot.docs.map((doc) => ({
        pId: doc.id,
        ...doc.data(),
      }));
      dispatch({ type: PRODUCT_ACTIONS.SET_PRODUCTS, payload: productsList });
    });

    return () => {
      console.log("Unsubscribing from products snapshot listener...");
      unsubscribe();
    };
  }, [dispatch, db]);


  if(loading){
    return (
      <PageLoadingComplete />
    )
  }


  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
