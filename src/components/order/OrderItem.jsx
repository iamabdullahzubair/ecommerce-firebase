import { useState } from "react";
import OrderTrack from "./OrderTrack";
import convertDate from "../../utils/convertTime";
import DownloadButton from "./DownloadButton";
import OrderDetailCard from "./OrderDetails";

const formatDateTime = (createdAt) => {
  if (!createdAt) return "N/A"; // Handle invalid or null dates

  const date = createdAt.toDate(); // Assuming it's a Firestore Timestamp

  const options = { year: "numeric", month: "long", day: "numeric" }; // Month in full form
  const datePart = new Intl.DateTimeFormat("en-US", options).format(date);

  const timePart = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date);

  return `${datePart} at ${timePart}`;
};

const OrderItem = ({ order, }) => {
  const [openOrderDetail, setOpenOrderDetail] = useState(false);

  const { totalAmount, createdAt } = order;

 

  return (
    <div
      className="flex flex-col justify-center  gap-3  p-4 rounded-lg shadow-md  cursor-pointer dark:bg-gray-800 bg-gray-50"
    >
      <p className="text-xs border-b border-gray-600 pb-2">{formatDateTime(createdAt)}</p>
      <p className="text-xs font-semibold text-center bg-blue-300 dark:bg-gray-400 dark:text-gray-700 rounded py-1"># {order.id}</p>
      <div className="flex justify-between gap-4">
        <p className="text-sm">total Amount</p>
        <p className="text-sm">₹{totalAmount}</p>
      </div>
      <div className="flex justify-between gap-4">
        <p className="text-sm">Status</p>
        <p className="text-sm">{order.status}</p>
      </div>
      <div className="flex flex-col justify-between gap-4">
        <button onClick={() => setOpenOrderDetail(true)} className="px-4 py-2 rounded bg-secondary text-white">
          View Order Details
        </button>
      </div>
      {openOrderDetail && <Modal><OrderDetailCard currentOrder={order} onClose={() => setOpenOrderDetail(false)} /></Modal>}
    </div>
  );
};

export default OrderItem;

const Modal = ({  children }) => {
 
return (
 <div
   className="fixed inset-0 lg:flex lg:items-center lg:justify-end z-50 bg-black bg-opacity-50 px-5"
 >
   <div className="bg-transparent pt-5 pb-2 md:p-6 w-full lg:w-1/3 h-full">
     {children}
   </div>
 </div>
);
};