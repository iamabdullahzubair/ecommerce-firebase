import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress"; // MUI Spinner
import { useGlobalState } from "../../../reducers/global/GlobalContext";

const OverviewCard = ({ ordersList, loading }) => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [lowStock, setLowStock] = useState(0);

  const {
    state: {
      productsGlobal: { products },
    },
  } = useGlobalState();

  useEffect(() => {
    if (ordersList) {
      const totalOrdersCount = ordersList.length;
      let revenue = 0;
      let pendingCount = 0;

      // Iterate once over the list for both revenue and pending orders
      ordersList.forEach((order) => {
        if (order.status === "Delivered") {
          revenue += Number(order.totalAmount);
        }
        if (order.status != "Delivered" && order.status != "cancelled") {
          pendingCount++;
        }
      });

      // Update states only if values have changed
      if (totalOrdersCount !== totalOrders) setTotalOrders(totalOrdersCount);
      if (revenue !== totalRevenue) setTotalRevenue(revenue);
      if (pendingCount !== pendingOrders) setPendingOrders(pendingCount);

      // count low stock
      const low_stock = products.reduce((count, product) => {
        return product.stock < 2 ? count + 1 : count;
      }, 0);
      if (low_stock !== lowStock) setLowStock(low_stock);
    }
  }, [ordersList, totalOrders, totalRevenue, pendingOrders, lowStock]);

  return (
    <>
      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Total Orders */}
        <Card title={"Total Orders"} value={totalOrders} loading={loading} />

        {/* Total Revenue */}
        <Card
          title={"Total Revenue"}
          value={`₹${totalRevenue}`}
          loading={loading}
        />

        {/* Pending Orders */}
        <Card
          title={"Pending Orders"}
          value={pendingOrders}
          loading={loading}
        />

        {/* Low Stock Products */}
        <Card title={"Low Stock Products"} value={lowStock} loading={loading} />
      </div>
    </>
  );
};

export default OverviewCard;

function Card({ title, value, loading }) {
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 flex items-center flex-col gap-1">
        <CircularProgress className="text-gray-500 dark:text-gray-400" />
        <p className="ml-2 text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    );
  }
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h3 className="text-lg font-semibold dark:text-gray-200">{title}</h3>
      <p className="text-3xl font-bold dark:text-white">{value}</p>
    </div>
  );
}
