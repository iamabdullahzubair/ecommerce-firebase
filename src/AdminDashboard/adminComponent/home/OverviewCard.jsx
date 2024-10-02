import React from 'react'

const OverviewCard = () => {
  return (
    <>
         {/* Top Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Total Orders */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold dark:text-gray-200">Total Orders</h3>
          <p className="text-3xl font-bold dark:text-white">150</p>
        </div>

        {/* Total Revenue */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold dark:text-gray-200">Total Revenue</h3>
          <p className="text-3xl font-bold dark:text-white">$10,000</p>
        </div>

        {/* Pending Orders */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold dark:text-gray-200">Pending Orders</h3>
          <p className="text-3xl font-bold dark:text-white">5</p>
        </div>

        {/* Low Stock Products */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold dark:text-gray-200">Low Stock Products</h3>
          <p className="text-3xl font-bold dark:text-white">3</p>
        </div>
      </div>

    </>
  )
}

export default OverviewCard