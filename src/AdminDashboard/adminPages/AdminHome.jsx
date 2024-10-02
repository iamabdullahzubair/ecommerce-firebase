import React from 'react';
import QuickActions from '../adminComponent/home/QuickActions';
import OverviewCard from '../adminComponent/home/OverviewCard';
import RecentOrders from '../adminComponent/home/RecentOrders';
import Charts from '../adminComponent/home/Charts';

const AdminHome = () => {
  return (
    <div className="p-4 dark:bg-gray-900 dark:text-white min-h-screen max-h-screen  overflow-y-scroll scroll-smooth">
      
      <QuickActions />

     <OverviewCard />
     
     <RecentOrders />

      <Charts />
      
    </div>
  );
};

export default AdminHome;
