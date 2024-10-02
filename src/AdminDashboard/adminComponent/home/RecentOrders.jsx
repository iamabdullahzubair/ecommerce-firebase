import React from 'react'

const RecentOrders = () => {
  return (
    <>
         {/* Recent Orders Section */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold dark:text-gray-200 mb-4">Recent Orders</h3>
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
            <tr>
              <td className="border px-4 py-2 truncate dark:border-gray-700">123456789</td>
              <td className="border px-4 py-2 dark:border-gray-700">John Doe</td>
              <td className="border px-4 py-2 dark:border-gray-700">2024-10-02</td>
              <td className="border px-4 py-2 dark:border-gray-700">Pending</td>
              <td className="border px-4 py-2 dark:border-gray-700">$120</td>
            </tr>
            {/* Add more rows as necessary */}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default RecentOrders