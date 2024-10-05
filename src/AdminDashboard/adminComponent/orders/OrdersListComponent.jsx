import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import OrderDetailCard from "./OrderDetails";

const OrdersListComponent = () => {
  const {ordersList, loading,} = useOrders()
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  return (
    <div className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex justify-start items-center bg-gray-300 dark:bg-gray-700 p-4 rounded-md mb-2">
        <p className="flex-1 text-center font-semibold">Order ID</p>
        <p className="flex-1 text-center font-semibold">Customer</p>
        <p className="flex-1 text-center font-semibold">Status</p>
        <p className="flex-1 text-center font-semibold">Total</p>
        <span className="flex-1"></span>
      </div>

      {loading ? (
        <div className="flex justify-center items-center p-4">
          <CircularProgress className="text-gray-500 dark:text-gray-400" />
          <p className="ml-2 text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      ) : ordersList?.length === 0 ? (
        <div className="flex justify-center items-center p-4">
          <p className="text-gray-500 dark:text-gray-400">No orders found.</p>
        </div>
      ) : (
        ordersList &&
        ordersList.map((order, index) => (
          <div
            key={order.id}
            className="flex justify-start items-center p-2 border-b border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-gray-200 hover:dark:bg-gray-700"
            onClick={() => setSelectedOrderId(order.id)}
          >
            {/* Truncated Order ID with full display on hover */}
            <div className="flex-1 text-center relative group">
              <p className="truncate max-w-[120px] inline-block cursor-default">
                {order.id}
              </p>
              <span className="absolute hidden group-hover:block bg-gray-700 text-white text-xs p-2 rounded-md shadow-lg -top-8 left-0 z-50 w-max">
                {order.id}
              </span>
            </div>
            <p className="flex-1 text-center">
              {order?.shippingAddress &&
                order?.shippingAddress?.firstName +
                  " " +
                  order?.shippingAddress?.lastName}
            </p>
            <p
              className={`flex-1 text-center ${
                order.status === "Delivered" && "text-green-500"
              }
              ${order.status == "cancelled" && "text-red-600 capitalize"}
              ${order.status == "Shipped" && "text-blue-400"}
              ${order.status == "Processing" && "text-yellow-600"}
              ${order.status == "Order Placed" && "text-green-300"}
              `}
            >
              {order.status}
            </p>
            <p className="flex-1 text-center">₹{order.totalAmount}</p>
            <button
              onClick={() => setSelectedOrderId(order)}
              className="flex-1 text-blue-500 hover:underline"
            >
              View Details
            </button>
          </div>
        ))
      )}
      {selectedOrderId && (
        <Modal>
          <OrderDetailCard orderId={selectedOrderId} onClose={() => setSelectedOrderId(null)} />
        </Modal>
      )}
    </div>
  );
};

export default OrdersListComponent;


import React from "react";
import { useOrders } from "../../contexts/OrderContext";

const Modal = ({ onClose, children }) => {
     // Function to handle clicks outside the modal
  const handleOverlayClick = (e) => {
    // Check if the click is on the overlay
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      className="fixed inset-0 flex items-center justify-end z-50 bg-black bg-opacity-50 px-5"
    >
      <div className="bg-transparent p-6 w-1/3 h-full">
        {children}
      </div>
    </div>
  );
};

