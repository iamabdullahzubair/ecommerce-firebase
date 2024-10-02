import React from 'react'
import { useNavigate } from 'react-router-dom'

const QuickActions = () => {
    const navigate = useNavigate()
  return (
    <>
         {/* Quick Actions */}
       <div className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Quick Actions</h3>
        <div className="flex space-x-4">
          <button onClick={() => navigate("products/add-product/")} className="bg-blue-500 text-white px-4 py-2 rounded-md">Add Product</button>
          <button onClick={() => navigate("users")} className="bg-green-500 text-white px-4 py-2 rounded-md">View Users</button>
          <button onClick={() => navigate("orders")} className="bg-purple-500 text-white px-4 py-2 rounded-md">Manage Orders</button>
        </div>
      </div>
    </>
  )
}

export default QuickActions