import React, { useEffect, useState } from "react";
import OrderItem from "../components/order/OrderItem";
import { getUserOrders } from "../reducers/order/orderApi";
import { useGlobalState } from "../reducers/global/GlobalContext";
import { ORDER_ACTIONS } from "../reducers/order/orderReducer";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";


const MyOrdersPage = () => {
  const {
    state: {
      ordersGlobal: { orders },
    },
    dispatch,
  } = useGlobalState();

  const [loading, setLoading] = useState(false);

  async function fetchOrders() {
    setLoading(true);
    try {
      const { success, data, error, message } = await getUserOrders();
      if (success) {
        dispatch({ type: ORDER_ACTIONS.GET_ORDER, payload: data });
        return;
      }
      console.log(error || message);
      toast.error(error || message);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4 min-h-screen">
        <CircularProgress className="text-gray-500 dark:text-gray-400" />
        <p className="ml-2 text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="md:px-20 px-4">
      <div className="min-h-screen dark:bg-gray-900 dark:text-white">
        <div className="flex justify-between items-center py-4">
          <h1 className="md:text-2xl text-lg font-bold">Your Orders</h1>
        </div>

        <div className="flex  gap-6 flex-col lg:flex-row lg:flex-wrap">
            {orders &&
              orders.length > 0 &&
              orders.map((order) => (
                <OrderItem
                  key={order.id}
                  order={order}
                />
              ))}
          
        </div>
      </div>
    </div>
  );
};

export default MyOrdersPage;
