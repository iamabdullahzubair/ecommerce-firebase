import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getOrderDetails,
  getPaymentDetail,
} from "../../reducers/order/orderApi";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import Placeholder from "../templates/Placeholder";
import { toast } from "react-toastify";
import convertDate from "../../utils/convertTime";


const PaymentSuccess = () => {
  const [paymentDetail, setPaymentDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const fetchPaymentDetail = async () => {
    setLoading(true);
    try {
      const { success, data } = await getOrderDetails(id);

      if (success) {
        const { paymentOption, paymentInfo, totalAmount, createdAt } = data;

        if (paymentOption === "cashondelivery") {
          setPaymentDetail({
            title: "Order Successful",
            amount: totalAmount,
            method: "Cash On Delivery",
            date: convertDate(createdAt?.seconds), // Using optional chaining for `createdAt`
          });
        } else if (paymentInfo?.status === "paid") {
          const paymentResponse = await getPaymentDetail(
            paymentInfo?.razorpay_payment_id
          );

          if (paymentResponse?.success) {
            const { amount, card, method, vpa, created_at } = paymentResponse?.data || {};
            
            let paymentMethod = "Unknown Method";
            if (method === 'card') {
              paymentMethod = `${card?.network} ending with ${card?.last4}`;
            } else if (method === 'upi') {
              paymentMethod = `UPI with id ${vpa}`;
            }
          
            setPaymentDetail({
              title: "Payment Successful",
              amount,
              method: paymentMethod,
              date: convertDate(created_at),
            });
          }
          
        }
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
    finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchPaymentDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="border border-gray-100 shadow rounded-lg w-1/3">
          <Placeholder />
        </div>
      </div>
    );
  }

  if (!paymentDetail) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="flex -mt-52 items-center justify-center flex-col border border-gray-300 shadow-md rounded-lg px-14 py-8">
          <span className="border-4 p-1 rounded-full border-red-800 text-red-800 flex items-center font-bold mb-3">
            <CloseIcon fontSize="large" />
          </span>
          <p className="text-2xl font-bold tracking-wider mb-2">
            Order Not Found
          </p>
          <p className="border-b border-gray-300 pb-2 text-gray-600">
            We couldn't find any order with that ID. Please check and try again.
            You can contact our customer support
          </p>
          <Link
            to={"/my-orders"}
            className="bg-black text-white px-7 py-2 rounded mt-8"
          >
            View Order History
          </Link>
        </div>
      </div>
    );
  }

  if (paymentDetail) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="flex flex-col items-center justify-center -mt-52 border border-gray-300 shadow-md rounded-lg px-14 py-8">
          <span className="border-4 p-1 rounded-full border-green-500 text-green-500 flex items-center font-bold mb-3">
            <DoneIcon fontSize="large" />
          </span>
          <p className="text-2xl font-bold tracking-wider mb-2">
            {paymentDetail?.title}
          </p>
          <p className="border-b border-gray-300 pb-2 text-gray-600">
            Thank you for your order. Your order is being processed.
          </p>
          <div className="flex flex-col gap-2 mt-3 w-full px-4">
            <DetailRow
              label="Amount Paid"
              value={`$${paymentDetail?.amount}`}
            />
            <DetailRow label="Payment Method" value={paymentDetail?.method} />
            <DetailRow label="Date and Time" value={paymentDetail?.date} />
          </div>
          <Link
            to="/my-orders"
            className="bg-black text-white px-7 py-2 rounded mt-8"
          >
            View Order History
          </Link>
        </div>
      </div>
    );
  }

  return null;
};

export default PaymentSuccess;

// Subcomponent for displaying details
const DetailRow = ({ label, value }) => (
  <span className="flex justify-between items-center">
    <p className="text-gray-600">{label}:</p>
    <p>{value}</p>
  </span>
);
