import React, { useCallback, useEffect, useRef, useState } from "react";
import BreadCrumb from "../AdminDashboard/adminComponent/sidebar/BreadCrumb";
import AddressForm from "../components/user/AddressForm";
import { useGlobalState } from "../reducers/global/GlobalContext";
import { toast } from "react-toastify";
import { placeOrder, updateOrder } from "../reducers/order/orderApi";
import { ORDER_ACTIONS } from "../reducers/order/orderReducer";
import { handleRazorPayPayment } from "../components/checkout/utils/razorpay";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDetails, updateUserProfile } from "../reducers/user/userAPI";
import { USER_ACTIONS } from "../reducers/user/userReducer";
import { CART_ACTIONS } from "../reducers/cart/cartReducer";
import { clearUserCart, removeFromCart } from "../reducers/cart/CartAPI";

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
      if (!selectedPaymentOption)
        return toast.error("Please select a payment option");

      // Validate form and get address directly from the form
      if (!(await validateAddressForm())) return;

      // Instead of relying on `userAddress`, use the form data directly
      const formData = formRef.current.getFormData();
      const { saveAddress, ...userAddressData } = formData; // Extract user address from form data

      dispatch({ type: ORDER_ACTIONS.SET_LOADING, payload: true });
      setloading(true);
      const orderData = createOrderData(userAddressData); // Pass the address data to createOrderData

      if (selectedPaymentOption === "cashondelivery") {
        await handleCashOnPayment(orderData);
        return;
      }

      const { success, orderId } = await placeOrder(orderData);

      if (!success) {
        handleError("Error placing order.");
        return;
      }

      const paymentResult = await handleRazorPayPayment(
        totalAmount,
        userAddressData
      );
      await handleOrderCompletion(paymentResult, orderId, orderData);
    } catch (error) {
      handleError("Error placing order.");
    } finally {
      setloading(false);
      dispatch({ type: ORDER_ACTIONS.SET_LOADING, payload: false });
    }
  };

  const validateAddressForm = async () => {
    if (formRef.current) {
      const isValid = await formRef.current.trigger();
      if (isValid) {
        const formData = formRef.current.getFormData();
        const {
          saveAddress,
          firstName,
          lastName,
          email,
          phoneNumber,
          ...userAddress
        } = formData;
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
          }
          if (error) {
            console.log("error on Updating data", error);
          }
        }
        delete formData.saveAddress;
        setUserAddress(formData);
        return true;
      }
      toast.error("Form validation failed.");
    }
    return false;
  };

  const createOrderData = (userAddressData) => ({
    cart: displayCart,
    totalAmount,
    shippingAddress: userAddressData,
    paymentOption: selectedPaymentOption,
  });

  const handleCashOnPayment = async (orderData) => {
    const codOrder = { ...orderData, paymentInfo: { status: "pending" } };
    const { success, orderId } = await placeOrder(codOrder);
    if (!success) {
      handleError("Error placing order.");
      return;
    }
    const updatedOrder = { ...codOrder, id: orderId };
    dispatch({ type: ORDER_ACTIONS.PLACE_ORDER, payload: updatedOrder });
    setloading(false);
    toast.success("Order Placed successfully with Cash On Delivery");
    navigate(`/order-success/${orderId}`);
  };

  const handleOrderCompletion = async (paymentResult, orderId, orderData) => {
    if (paymentResult.success) {
      const updatedOrder = {
        ...orderData,
        id: orderId,
        paymentInfo: paymentResult.paymentInfo,
      };

      const { success } = await updateOrder(orderId, updatedOrder);
      if (success) {
        dispatch({ type: ORDER_ACTIONS.PLACE_ORDER, payload: updatedOrder });
        // clearing cart when came from cart page
        if (!id) {
          await clearUserCart();
          dispatch({ type: CART_ACTIONS.SET_CART, payload: [] });
        }
        // remove from cart when came from product-detail page
        if (id) {
          await removeFromCart(userData.id, pId);
          const updatedCart = cart.filter(item => item.pId != id);
          dispatch({ type: CART_ACTIONS.UPDATE_CART, payload: updatedCart });
        }
        setloading(false);
        toast.success("Order successfully placed");
        navigate(`/order-success/${orderId}`);
      } else {
        toast.error("Error updating order.");
      }
    } else {
      const failedOrder = { ...orderData, paymentInfo: { status: "failed" } };
      await updateOrder(orderId, failedOrder);
      dispatch({ type: ORDER_ACTIONS.PLACE_ORDER, payload: failedOrder });
      setloading(false);
      navigate(-1);
    }
  };

  const handleError = (message) => {
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
    <p className="text-base font-semibold text-gray-700 mb-3">
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

// CustomRadioButton Component
const CustomRadioButton = ({
  label,
  value,
  selectedOption,
  setSelectedOption,
}) => (
  <div className="flex items-center gap-2">
    <input
      name={value}
      type="radio"
      id={value}
      className="hidden"
      value={value}
      checked={selectedOption === value}
      onChange={() => setSelectedOption(value)}
    />
    <label htmlFor={value} className="flex items-center cursor-pointer">
      <span className="w-4 h-4 border-2 rounded-full flex-shrink-0 border-gray-800 flex justify-center items-center transition duration-200">
        {selectedOption === value && (
          <span className="w-2 h-2 bg-gray-800 rounded-full"></span>
        )}
      </span>
      <span className="ml-2 text-base text-gray-700">{label}</span>
    </label>
  </div>
);
