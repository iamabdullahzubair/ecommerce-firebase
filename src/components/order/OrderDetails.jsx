import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import Timeline from "./TimeLine";
import EditIcon from "@mui/icons-material/Edit";

import { toast } from "react-toastify";
import DownloadButton from "./DownloadButton";

function formatDate(timestamp) {
  const date = timestamp.toDate();
  return date.toLocaleString("en-US", {
    month: "short", // Aug
    day: "numeric", // 20
    year: "numeric", // 2024
    hour: "numeric", // 4
    minute: "numeric", // 00 (optional)
    hour12: true, // 12-hour format with am/pm
  });
}

const OrderDetailCard = ({ currentOrder, onClose }) => {
  

  async function handleCancelOrder(){
    if(status == "cancelled"){
      toast.warn("Already Cancelled")
      return
    }
    const confirmed = window.confirm("Confirm to cancel order")
    if(!confirmed){
      return
    }

  }


  const {
    id,
    shippingAddress,
    status,
    createdAt,
    paymentInfo,
    cart: products,
  } = currentOrder;

  return (
    <div className="bg-slate-50 dark:bg-gray-800 h-full rounded-lg text-gray-800 dark:text-gray-300 border pb-2 dark:border-gray-600 border-gray-400 overflow-y-auto scrollbar">
      <div className="bg-slate-200 dark:bg-gray-900 px-4 py-3 rounded-t-lg">
        <span className="flex justify-between items-center">
          <p className="text-sm">#{id}</p>
          <button
            className="dark:bg-gray-500 bg-slate-300 text-gray-900 rounded text-xs"
            onClick={onClose}
          >
            <CloseIcon fontSize="small" />
          </button>
        </span>
        <p className="text-xs mt-1 ">Order Details</p>
      </div>

      <div className="px-2">
        <div className="border-b dark:border-gray-500 border-gray-300 pt-2 pb-2 mt-2 mx-2 flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <p className="text-xs">Created at</p>
            <p className="text-xs font-semibold">
              {formatDate(createdAt).replaceAll(",", " ")}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs">Payment</p>
            <p
              className={`text-xs px-1 py-0.5 ${
                paymentInfo?.status === "paid"
                  ? "bg-green-500 text-center rounded"
                  : "border border-red-500 rounded"
              }
               ${status == "cancelled" && "bg-red-500 rounded"}
              `}
            >
              {status != "cancelled" ? paymentInfo?.status || "N/A" : "cancelled"}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs">Status</p>    
            <p
              className={`text-xs px-1 py-0.5 ${
                //["Order Placed", "Processing", "Shipped", "Delivered"]
                status === "Delivered"
                  && "bg-green-500"
              }
               ${ status === "Order Placed"
                  && "border border-green-500 rounded text-green-400"
              }
               ${ status === "Processing"
                  && "border border-yellow-400 rounded text-yellow-400"
              }
               ${ status === "Shipped"
                  && "border border-blue-400 rounded text-yellow-400"
              }
              ${status == "cancelled" && "bg-red-500 rounded"}`}
            >
              {status}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-xs">Bill</p>
            <DownloadButton orderDetails={currentOrder} />
          </div>
        </div>

        <div className="border-b dark:border-gray-500 pt-2 pb-4 mt-2 mx-2">
          <p className="text-xs mb-3">Customer</p>
          <UserDetails details={shippingAddress} />
        </div>

        <div className="border-b dark:border-gray-500 border-gray-300 pt-2 pb-4 mt-2 mx-2">
          <div className="flex justify-between items-center">
            <p className="text-xs mb-3">Timeline</p>
          </div>
          <div className="relative pt-4">
            <Timeline events={currentOrder?.tracking} />
          </div>
          
        </div>

        <div className="border-b dark:border-gray-500 border-gray-300 pt-2 pb-4 mt-2 mx-2">
          <p className="text-xs mb-3">Items</p>
          <Products products={products} />
        </div>

        <div className="border-b dark:border-gray-500 border-gray-300 pt-2 pb-4 mt-2 mx-2">
          <p className="text-xs mb-3">Payment</p>
          <PaymentDetails order={currentOrder} />
        </div>
      </div>
      {status != "Delivered" && <div className="flex justify-center my-5">
        <button onClick={handleCancelOrder} className="bg-red-800 text-base text-white font-semibold px-4 py-2 rounded">Cancel Order</button>
      </div>}
    </div>
  );
};

export default OrderDetailCard;

function UserDetails({ details }) {
  if (!details) return null;

  const {
    firstName,
    lastName,
    apartmentDetails,
    streetAddress,
    phoneNumber,
    pincode,
    town,
    email,
  } = details;

  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-semibold">
        {firstName} {lastName}
      </p>
      <p className="text-sm text-blue-500 ">{email}</p>
      <p className="text-sm ">{phoneNumber}</p>
      <p className="text-sm ">
        {apartmentDetails} {streetAddress} {town} {pincode}
      </p>
    </div>
  );
}

function Products({ products }) {
  if (!products || products.length === 0) return <p>No products found.</p>;

  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.pId} product={product} />
      ))}
    </>
  );
}

function ProductCard({ product }) {
  return (
    <Link to={``} className="flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <span className="w-12 h-12 dark:bg-gray-400 rounded px-2 flex items-center justify-center">
          <img
            className="w-full h-full object-contain"
            src={product.thumbnail}
            alt={product.name}
            loading="lazy"
          />
        </span>
        <span>
          <p className="flex-1 text-center">{product.name}</p>
          <p className="flex-1 text-center">{product.size}</p>
          <p className="flex-1 text-center">{product.color}</p>
        </span>
      </div>
      <div className="flex gap-8">
        <p className="flex-1 text-center">{product.quantity}</p>
        <p className="flex-1 text-center">
          ₹{Number(product.price).toFixed(2)}
        </p>
      </div>
    </Link>
  );
}

function PaymentDetails({ order }) {
  const { totalAmount, paymentOption, paymentInfo } = order;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <p className="text-sm">Amount</p>
        <p className="text-sm">₹{totalAmount}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm">Discount</p>
        <p className="text-sm">₹{0}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm">Method</p>
        <p className="text-sm">{paymentOption}</p>
      </div>
    </div>
  );
}
