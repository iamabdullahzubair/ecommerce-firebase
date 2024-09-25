import { useState } from "react";
import OrderTrack from "./OrderTrack";
import convertDate from "../../utils/convertTime";
import DownloadButton from "./DownloadButton";


const formatDateTime = (createdAt) => {
  if (!createdAt) return "N/A"; // Handle invalid or null dates

  const date = createdAt.toDate(); // Assuming it's a Firestore Timestamp
  
  const options = { year: 'numeric', month: 'long', day: 'numeric' }; // Month in full form
  const datePart = new Intl.DateTimeFormat('en-US', options).format(date);
  
  const timePart = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }).format(date);

  return `${datePart} at ${timePart}`;
};


const OrderItem = ({
    order,
    openOrderId,
    setOpenOrderId,
  }) => {
    const [openCart, setOpenCart] = useState(null);
  
    function toggleCart() {
      // Prevent toggling if payment status is failed
      if (order?.paymentInfo?.status === "failed") {
        return;
      }
    
      // If the current order is already open, close it
      if (openCart === order.id) {
        setOpenCart(null); // Close the current order
        setOpenOrderId(null); // Also reset the openOrderId
      } else {
        // Otherwise, open this order and set the order ID
        setOpenCart(order.id);
        setOpenOrderId(order.id);
      }
    }
    


    console.log(order)

    return (
      <div
        onClick={toggleCart}
        className={`bg-white flex flex-col justify-center  dark:bg-gray-800 p-4 rounded-lg shadow-md w-full cursor-pointer ${order?.paymentInfo?.status == "failed" && "bg-red-500"}`}
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Order #:: {order.id}</h3>
         <div className="flex flex-col justify-center items-center gap-2">
         <p className="text-base font-semibold">Amount : ₹{order.totalAmount}</p>
          {
            order?.paymentInfo?.status != "failed" && <DownloadButton orderDetails={order} />
          }
         </div>
          
        </div>
        <p className="text-sm">
        Date: {order.createdAt ? formatDateTime(order.createdAt) : "N/A"}
        </p>
        <div className="">
          {openCart && openOrderId && openCart == openOrderId && (
            <div className="dark:bg-gray-900 bg-gray-200 shadow-md p-4 mt-4 rounded-md">
              {order.cart.map((item) => (
                <CartItems
                  key={item.pId}
                  cartItem={item}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };
  

  export default OrderItem


  const CartItems = ({ cartItem }) => {
    const [trackMode, setTrackMode] = useState(false);
    function handleTrackBtn(e) {
      e.stopPropagation();
      setTrackMode(!trackMode);
    }
    return (
      <div className="flex flex-col justify-center dark:bg-gray-800 bg-gray-50 shadow-sm p-3 px-8 mt-2 rounded ">
        <div className="flex items-center justify-between ">
          <div className="flex gap-8">
            <img
              className="w-20 h-20 object-contain"
              src={cartItem.thumbnail}
              alt={cartItem.name}
            />
            <div className="flex flex-col gap-1 items-start">
              <p className="">{cartItem.name}</p>
              <p>{cartItem.quantity} pcs</p>
              <p> &#8377; {cartItem.price}</p>
            </div>
          </div>
          <button
            onClick={(e) => handleTrackBtn(e)}
            className="bg-secondary px-4 py-2 text-white rounded"
          >
            Track Status
          </button>
        </div>
  
        <div
          className={`flex justify-end dark:bg-gray-900 pt-5 pb-10 rounded-lg mt-3  ${
            !trackMode && "hidden"
          }`}
        >
          <OrderTrack status={cartItem.tracking} />
        </div>
      </div>
    );
  };
  