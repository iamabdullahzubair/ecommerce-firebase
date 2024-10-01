import React, { useEffect, useState } from "react";
import { useGlobalState } from "../../reducers/global/GlobalContext";
import OrdersListComponent from "../adminComponent/orders/OrdersListComponent";
import OrderService from "../../firebaseServices/orderService";


const AdminOrdersPage = () => {
  const {
    state: {
      user: { userData },
    },
  } = useGlobalState();

  const OrderFirebaseService = new OrderService(userData.id);

  const [ordersList, setOrdersList] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const { success, data, error } = await OrderFirebaseService.getAllOrders();
      if (success) {
        setOrdersList(data);
      }
      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div>
      <div className="dark:text-slate-300 flex justify-between items-center border-b border-slate-700 pb-3 px-40 mt-12">
        <p className="text-2xl font-bold tracking-wider">All Orders List</p>
      </div>
      <div className="mt-10 px-20">
        <OrdersListComponent orders={ordersList} loading={loading} />
      </div>
    </div>
  );
};

export default AdminOrdersPage;
