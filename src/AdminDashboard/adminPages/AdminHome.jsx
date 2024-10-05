import React, { useEffect, useState } from 'react';
import QuickActions from '../adminComponent/home/QuickActions';
import OverviewCard from '../adminComponent/home/OverviewCard';
import RecentOrders from '../adminComponent/home/RecentOrders';
import Charts from '../adminComponent/home/Charts';
import { getAllOrders } from '../../reducers/order/orderApi';

const AdminHome = () => {

  const [ordersList, setOrdersList] = useState(null)
  const [loading, setLoading] = useState(false)


  const fetchOrderList = async () => {
    try {
      setLoading(true)
      const {success, data, message} = await getAllOrders()
      if(success){
        setLoading(false)
        setOrdersList(data)
      }
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrderList()
  }, [])

  return (
    <div className="p-4 dark:bg-gray-900 dark:text-white min-h-screen max-h-screen  overflow-y-scroll scroll-smooth">
      
      <QuickActions />

     <OverviewCard ordersList={ordersList} loading={loading} />
     
     <RecentOrders ordersList={ordersList} loading={loading} />

      <Charts />
      
    </div>
  );
};

export default AdminHome;
