import React, { useCallback, useEffect, useRef, useState } from "react";
import AddressForm from "../components/user/AddressForm";
import { useGlobalState } from "../reducers/global/GlobalContext";
import { toast } from "react-toastify";
import { placeOrder, updateOrder } from "../reducers/order/orderApi";
import { ORDER_ACTIONS } from "../reducers/order/orderReducer";
import { displayRazorpay, handleRazorPayPayment } from "../components/checkout/utils/razorpay";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDetails, updateUserProfile } from "../reducers/user/userAPI";
import { USER_ACTIONS } from "../reducers/user/userReducer";
import { CART_ACTIONS } from "../reducers/cart/cartReducer";
import { clearUserCart, removeFromCart } from "../reducers/cart/CartAPI";
import CustomRadioButton from "../components/templates/CustomRadioButton";
import LoadingOverlay from "../components/order/LoadingOverlay";
import BreadCrumb from "../components/templates/BreadCrumb";

const CheckoutPage = () => {
  const {
    state: {
      user: { userData },
      cartGlobal: { cart },
      ordersGlobal: { loading: orderLoading },
    },
    dispatch,
  } = useGlobalState();

  const { id } = useParams();
  const navigate = useNavigate();
  const [displayCart, setDisplayCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [loading, setloading] = useState(false);
  const formRef = useRef(null);

  const calculateTotalPrice = useCallback(() => {
    const totalPrice = displayCart
      .reduce((acc, item) => acc + Number(item.price) * item.quantity, 0)
      .toFixed(2);
    setTotalAmount(totalPrice);
  }, [displayCart]);

  const fetchUserDetails = useCallback(async () => {
    try {
      setloading(true);
      const { success, data } = await getUserDetails();
      if (success) {
        const { firstName, lastName, name, email, phoneNumber, address } = data;
        let initialData = {
          firstName: firstName || name?.split(" ")[0], // First part is the first name
          lastName: lastName || name?.split(" ").slice(1).join(" "), // Remaining parts are the last name
          email,
          phoneNumber,
          ...address,
        };
        setUserAddress(initialData);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  }, []);

  const setDisplayCartItems = useCallback(() => {
    if (id) {
      let item = cart.filter((cartItem) => cartItem.pId == id);
      setDisplayCart(item);
      return;
    }
    setDisplayCart(cart);
  }, [id]);

  useEffect(() => {
    calculateTotalPrice();
    fetchUserDetails();
  }, [calculateTotalPrice, fetchUserDetails]);

  useEffect(() => {
    setDisplayCartItems();
  }, []);


  const handlePlaceOrder = async () => {
    try {
      // Ensure payment option is selected
      if (!selectedPaymentOption) {
        return toast.error("Please select a payment option");
      }
  
      // Validate the form and get the address from the form directly
      if (!(await validateAddressForm())) return;
  
      const formData = formRef.current.getFormData();
      const { saveAddress, ...userAddressData } = formData; // Extract address data
  
      dispatch({ type: ORDER_ACTIONS.SET_LOADING, payload: true });
      setloading(true);
  
      // Create the order data object
      const orderData = createOrderData(userAddressData);
  
      // Handle different payment options (Cash on Delivery / Online)
      if (selectedPaymentOption === "cashondelivery") {
        await handleCashOnPayment(orderData);
      } else {
        await handleOnlinePayment(orderData, userAddressData);
      }
    } catch (error) {
      handleError("Error placing order.", error);
    } finally {
      setloading(false);
      dispatch({ type: ORDER_ACTIONS.SET_LOADING, payload: false });
    }
  };
  
  // Validate Address Form
  const validateAddressForm = async () => {
    if (formRef.current) {
      const isValid = await formRef.current.trigger();
      if (isValid) {
        const formData = formRef.current.getFormData();
        const { saveAddress, firstName, lastName, email, phoneNumber, ...userAddress } = formData;
  
        // If user opted to save the address, update profile
        if (saveAddress) {
          const updatedData = {
            ...userData,
            firstName,
            lastName,
            email,
            phoneNumber,
            address: { ...userAddress },
          };
          const { success, error } = await updateUserProfile(updatedData);
          if (success) {
            dispatch({
              type: USER_ACTIONS.SET_USER_DATA,
              payload: updatedData,
            });
          } else if (error) {
            console.error("Error updating profile:", error);
          }
        }
  
        // Set user address for further processing
        setUserAddress(formData);
        return true;
      }
      toast.error("Form validation failed.");
    }
    return false;
  };
  
  // Create Order Data (used by both COD and online payments)
  const createOrderData = (userAddressData) => ({
    cart: displayCart,
    totalAmount,
    shippingAddress: userAddressData,
    paymentOption: selectedPaymentOption,
  });
  
  // Handle Cash on Delivery (COD) Payment
  const handleCashOnPayment = async (orderData) => {
    const codOrder = { ...orderData, paymentInfo: { method: "CashOnDelivery", status: "pending" } };
    const { success, orderId, error } = await placeOrder(codOrder);
  
    if (success) {
      await clearCartAfterOrder(orderId);
      toast.success("Order placed successfully with Cash on Delivery!");
      navigate(`/order-success/${orderId}`);
    } else {
      handleError(error || "Error placing COD order.");
    }
  };
  
  // Handle Online Payment
  const handleOnlinePayment = async (orderData, userAddressData) => {
    try {
      await displayRazorpay();
  
      const paymentResult = await handleRazorPayPayment(totalAmount, userAddressData);
  
      if (paymentResult.success) {
        const onlineOrder = {
          ...orderData,
          paymentInfo: paymentResult.paymentInfo,
        };
        await handleAfterPaymentSuccess(onlineOrder);
      } else {
        await handleAfterPaymentFailure(orderData);
      }
    } catch (error) {
      handleError("Error placing online order.", error);
    } finally {
      setloading(false);
      dispatch({ type: ORDER_ACTIONS.SET_LOADING, payload: false });
    }
  };
  
  // Handle success after payment
  const handleAfterPaymentSuccess = async (onlineOrder) => {
    const { success, orderId, error } = await placeOrder(onlineOrder);
  
    if (success) {
      await clearCartAfterOrder();
      toast.success("Order successfully placed with online payment!");
      navigate(`/order-success/${orderId}`);
    } else {
      handleError(error || "Error adding order to database.");
    }
  };
  
  // Handle payment failure
  const handleAfterPaymentFailure = async (orderData) => {
    const failedOrder = { ...orderData, paymentInfo: { status: "failed" } };
    const { success, error } = await placeOrder(failedOrder);
  
    if (success) {
      await clearCartAfterOrder()
      toast.error("Payment failed, but order was logged as failed.");
      navigate("/"); // Redirect on failure
    } else {
      handleError(error || "Error logging failed order.");
    }
  };
  
  // Clear the cart after placing the order
  const clearCartAfterOrder = async () => {
    try {
      if (!id) {
        await clearUserCart(userData.id);
        dispatch({ type: CART_ACTIONS.SET_CART, payload: [] });
      } else {
        await removeFromCart(userData.id, id);
        const updatedCart = cart.filter((item) => item.pId !== id);
        dispatch({ type: CART_ACTIONS.UPDATE_CART, payload: updatedCart });
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };
  
  // Handle Errors
  const handleError = (message, error = null) => {
    console.error("Error:", message, error);
    toast.error(message);
    setloading(false);
    dispatch({ type: ORDER_ACTIONS.SET_ERROR, payload: message });
  };



  return (
    <div className="min-h-screen px-32 py-10 flex flex-col gap-4">
      <BreadCrumb />
      <div className="flex gap-56">
        <AddressForm
          userAddress={userAddress}
          setUserAddress={setUserAddress}
          ref={formRef}
        />
        <OrderSummary
          cart={displayCart}
          totalPrice={totalAmount}
          selectedPaymentOption={selectedPaymentOption}
          setSelectedPaymentOption={setSelectedPaymentOption}
          orderLoading={loading}
          handlePlaceOrder={handlePlaceOrder}
        />
      </div>
      <LoadingOverlay isLoading={loading} />
    </div>
  );
};

export default CheckoutPage;

// OrderSummary Component
const OrderSummary = ({
  cart,
  totalPrice,
  selectedPaymentOption,
  setSelectedPaymentOption,
  orderLoading,
  handlePlaceOrder,
}) => (
  <div className="mt-20 w-96">
    <div className="flex flex-col gap-6">
      {cart.map(({ pId, thumbnail, name, price, quantity }) => (
        <div key={pId} className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <img className="w-16" src={thumbnail} alt={name} />
            <p>{name}</p>
          </div>
          <p>${price}</p>
        </div>
      ))}
    </div>
    <SummaryDetails totalPrice={totalPrice} />
    <PaymentOptions
      selectedPaymentOption={selectedPaymentOption}
      setSelectedPaymentOption={setSelectedPaymentOption}
    />
    <button
      onClick={handlePlaceOrder}
      className={`bg-secondary px-5 py-2 rounded w-full text-white mt-5 ${
        orderLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={orderLoading}
    >
      {orderLoading ? "Placing Order..." : "Place Order"}
    </button>
  </div>
);

// SummaryDetails Component
const SummaryDetails = ({ totalPrice }) => (
  <div>
    <div className="flex justify-between items-center border-b border-gray-400 pb-2 mt-8">
      <p>Subtotal</p>
      <p>${totalPrice}</p>
    </div>
    <div className="flex justify-between items-center border-b border-gray-400 pb-2 mt-4">
      <p>Shipping</p>
      <p>Free</p>
    </div>
    <div className="flex justify-between items-center mt-4">
      <p>Total</p>
      <p>${totalPrice}</p>
    </div>
  </div>
);

// PaymentOptions Component
const PaymentOptions = ({
  selectedPaymentOption,
  setSelectedPaymentOption,
}) => (
  <div className="mt-5">
    <p className="text-base font-semibold text-gray-700 mb-3 dark:text-white">
      Choose Payment Options:
    </p>
    {["Net Banking / UPI", "Cash On Delivery"].map((option) => (
      <CustomRadioButton
        key={option}
        label={option}
        value={option.toLowerCase().replace(/\s+/g, "")}
        selectedOption={selectedPaymentOption}
        setSelectedOption={setSelectedPaymentOption}
      />
    ))}
  </div>
);
