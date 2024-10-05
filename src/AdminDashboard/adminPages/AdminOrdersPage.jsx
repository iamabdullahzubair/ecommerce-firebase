import React, { useEffect, useState } from "react";
import { useGlobalState } from "../../reducers/global/GlobalContext";
import OrderService from "../../firebaseServices/orderService";
import OrdersListComponent from "../adminComponent/orders/OrdersListComponent";
import { OrdersProvider } from "../contexts/OrderContext";


const AdminOrdersPage = () => {
  
  return (
    <div>
      <div className="dark:text-slate-300 flex justify-between items-center border-b border-slate-700 pb-3 px-40 mt-12">
        <p className="text-2xl font-bold tracking-wider">All Orders List</p>
      </div>
      <div className="mt-10 px-20">
        <OrdersProvider>
          <OrdersListComponent />
        </OrdersProvider>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
