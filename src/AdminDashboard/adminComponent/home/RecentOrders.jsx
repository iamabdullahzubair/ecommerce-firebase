import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress"; // MUI Spinner


function formatDate(timestamp) {
  const date = timestamp.toDate();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}


const RecentOrders = ({ ordersList, loading }) => {
  const [recentOrders, setRecentOrders] = useState(null);

 
  useEffect(() => {
    if(ordersList){
      const recent = ordersList.filter((order) => order.status == "Order Placed");
      setRecentOrders(recent);
    }
  }, [ordersList]);


  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 flex items-center flex-col gap-1">
        <CircularProgress className="text-gray-500 dark:text-gray-400" />
        <p className="ml-2 text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    );
  }


  return (
    <>
      {/* Recent Orders Section */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold dark:text-gray-200 mb-4">
          Recent Orders
        </h3>
        <table className="w-full text-left table-auto">
          <thead className="dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders &&
              recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="border px-4 py-2 truncate dark:border-gray-700">
                    {order.id}
                  </td>
                  <td className="border px-4 py-2 dark:border-gray-700">
                    {order?.shippingAddress &&
                      order?.shippingAddress?.firstName +
                        " " +
                        order?.shippingAddress?.lastName}
                  </td>
                  <td className="border px-4 py-2 dark:border-gray-700">
                    {formatDate(order?.createdAt)}
                  </td>
                  <td className="border px-4 py-2 dark:border-gray-700">
                    {order?.status}
                  </td>
                  <td className="border px-4 py-2 dark:border-gray-700">
                  ₹{order?.totalAmount}
                  </td>
                </tr>
              ))}
            {/* Add more rows as necessary */}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RecentOrders;
