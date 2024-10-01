import React, { useCallback, useEffect, useState } from "react";
import CartList from "../components/cart/CartList";
import { useGlobalState } from "../reducers/global/GlobalContext";
import Spinner from "../components/templates/Spinner";
import ButtonTemplate from "../components/templates/ButtonTemplate";
import { CART_ACTIONS } from "../reducers/cart/cartReducer";
import { clearUserCart, removeFromCart, updateCartItem } from "../reducers/cart/CartAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../components/templates/BreadCrumb";

const CartPage = () => {
  const {
    state: {
      cartGlobal: { cart, loading, error },
      user : {userData}
    },
    dispatch,
  } = useGlobalState();

  const navigate = useNavigate()

  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = useCallback(() => {
    const totalPrice = cart
      .reduce((acc, item) => acc + Number(item.price) * item.quantity, 0)
      .toFixed(2);
    setTotalPrice(totalPrice);
  }, [cart]);
  

  useEffect(() => {
    calculateTotalPrice();
  }, [calculateTotalPrice]);

  async function handleUpdateCart({updatedItem, action}) {
    dispatch({type : CART_ACTIONS.SET_LOADING})
    if(action == "update"){
      const updatedCart = cart.map((item) =>
        item.pId === updatedItem.pId
          ? { ...item, quantity: updatedItem.quantity }
          : item
      );
      await updateCartItem(userData.id, updatedItem.pId, updatedItem.quantity )
      dispatch({ type: CART_ACTIONS.UPDATE_CART, payload: updatedCart });
    }
    if(action == "remove"){
      const updatedCart = cart.filter(item => item.pId != updatedItem.pId)
      await removeFromCart(userData.id, updatedItem.pId)
      dispatch({ type: CART_ACTIONS.UPDATE_CART, payload: updatedCart });
      toast.success("Removed from cart")
    }
  }
  
  async function clearCart(){
    dispatch({ type: CART_ACTIONS.SET_LOADING });
    const confirm = window.confirm("Are you sure To Clear Cart")
    if(confirm){
      await clearUserCart(userData.id);
      dispatch({ type: CART_ACTIONS.UPDATE_CART, payload: [] });
      toast.success("Cart cleared!!")
    }
  }

  return (
    <div className="lg:px-40 md:px-16 px-4 py-10 min-h-screen">
  <BreadCrumb />
  <div className="mt-8">
    <div className="w-full">
      <div className="flex gap-5 justify-between border border-gray-100 shadow-md rounded-sm px-4 py-5 mb-4">
        <p className="w-2/6 text-sm lg:text-lg font-semibold">Product</p>
        <p className="w-1/6 text-sm lg:text-lg font-semibold">Price</p>
        <p className="w-1/6 text-sm lg:text-lg font-semibold">Quantity</p>
        <p className="w-1/6 text-sm lg:text-lg font-semibold">Subtotal</p>
        <p className="w-1/6 text-sm lg:text-lg font-semibold">Remove</p>
      </div>

      <div className="">
        {loading && (
          <div className="mt-20">
            <Spinner borderColor="border-secondary" />{" "}
          </div>
        )}
        {!loading &&
          cart &&
          cart.map((cartItem) => (
            <CartList
              key={cartItem.name}
              cart={cartItem}
              onUpdateQuantity={handleUpdateCart}
            />
          ))}
      </div>
    </div>
  </div>

  {/* Buttons Section */}
  <div className="flex justify-between mt-8">
    <ButtonTemplate
      btnText={"Return to Shop"}
      btnColor="white dark:text-gray-300"
      btnTextColor="text-gray-800 lg:font-bold font-semibold"
    />
    <ButtonTemplate
      onBtnTemplateClick={clearCart}
      btnText={"Clear Cart"}
      btnColor="white dark:text-gray-300"
      btnTextColor="text-gray-800 lg:font-bold font-semibold"
    />
  </div>

  {/* Coupon and Cart Total Section */}
  <div className="flex lg:flex-row flex-col justify-between items-start mt-8">
    <div className="flex flex-col lg:flex-row justify-start lg:items-center gap-4">
      <input
        className="focus:outline-none border border-gray-300 rounded pl-3 py-2 shadow-sm dark:text-gray-600"
        type="text"
        placeholder="Enter Coupon"
      />
      <button className="bg-secondary px-6 py-2 rounded font-semibold text-white shadow-sm">
        Apply Coupon
      </button>
    </div>

    {/* Cart Total Section */}
    <div className="border-2 border-gray-700 px-4 py-5 rounded w-full lg:w-1/3 mt-8 lg:mt-0">
      <p className="text-lg font-semibold tracking-wide mb-6">Cart Total</p>
      <span className="flex justify-between items-center border-b border-gray-400 mb-2 py-2">
        <p>Subtotal</p>
        <p>${totalPrice}</p>
      </span>
      <span className="flex justify-between items-center border-b border-gray-400 mb-2 py-2">
        <p>Shipping</p>
        <p>$0</p>
      </span>
      <span className="flex justify-between items-center mb-2 py-2">
        <p>Total : </p>
        <p>${totalPrice}</p>
      </span>
      <span className="flex items-center justify-center mt-6">
        <button
          onClick={() => navigate("checkout")}
          className="bg-secondary px-10 py-2 rounded font-semibold text-white shadow-sm"
        >
          Process to checkout
        </button>
      </span>
    </div>
  </div>
</div>

  );
};

export default CartPage;
