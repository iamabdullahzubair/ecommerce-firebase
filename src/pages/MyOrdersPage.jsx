import React, { useEffect, useState } from "react";
import OrderTrack from "../components/order/OrderTrack";
import OrderItem from "../components/order/OrderItem";
import { getUserOrders } from "../reducers/order/orderApi";
import { useGlobalState } from "../reducers/global/GlobalContext";
import { ORDER_ACTIONS } from "../reducers/order/orderReducer";
import { toast } from "react-toastify";
import { Circles } from "react-loader-spinner";



const MyOrdersPage = () => {

    const {state:{ordersGlobal:{orders}}, dispatch} = useGlobalState()

  const [loading, setLoading] = useState(false);
  const [openOrderId, setOpenOrderId] = useState(null); // New state to track opened order

  async function fetchOrders() {
    setLoading(true)
    try {
        const {success, data, error, message} = await getUserOrders()
        if(success){
            dispatch({type: ORDER_ACTIONS.GET_ORDER, payload: data})
            return
        }
        console.log(error || message)
        toast.error(error || message)
    } catch (error) {
        console.log(error.message )
        toast.error(error.message)
    }
    finally{
        setLoading(false)
    }
}

useEffect(() => {
    fetchOrders()
}, [])

if(loading){
    return <div className="min-h-screen flex items-center justify-center"><Circles color="bg-black"  /></div>
}


  return (
    <div className="px-20">
      <div className="min-h-screen dark:bg-gray-900 dark:text-white">
        {/* Dark Mode Toggle */}
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold">Your Orders</h1>
        </div>

        <div className="flex justify-between gap-5">
          <div className="mt-2 space-y-6 flex-1">
            {orders && orders.length>0 && orders.map((order) => (
              <OrderItem
                key={order.id}
                order={order}
                openOrderId={openOrderId}
                setOpenOrderId={setOpenOrderId}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrdersPage;
