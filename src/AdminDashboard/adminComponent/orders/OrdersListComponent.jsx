import CircularProgress from "@mui/material/CircularProgress";

const OrdersListComponent = ({ orders, loading }) => {

  return (
    <div className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex justify-start items-center bg-gray-300 dark:bg-gray-700 p-4 rounded-md">
        <p className="flex-1 text-center font-semibold">Order ID</p>
        <p className="flex-1 text-center font-semibold">Customer</p>
        <p className="flex-1 text-center font-semibold">Status</p>
        <p className="flex-1 text-center font-semibold">Total</p>
        <span className="flex-1"></span>
      </div>

      {loading ? (
        <div className="flex justify-center items-center p-4">
          <CircularProgress className="text-gray-500 dark:text-gray-400" />
          <p className="ml-2 text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      ) : orders?.length === 0 ? (
        <div className="flex justify-center items-center p-4">
          <p className="text-gray-500 dark:text-gray-400">No orders found.</p>
        </div>
      ) : (
        orders &&
        orders.map((order, index) => (
          <div
            key={order.id}
            className="flex justify-start items-center p-2 border-b border-gray-300 dark:border-gray-600"
          >
           {/* Truncated Order ID with full display on hover */}
           <div className="flex-1 text-center relative group">
              <p className="truncate max-w-[120px] inline-block cursor-default">
                {order.id}
              </p>
              <span className="absolute hidden group-hover:block bg-gray-700 text-white text-xs p-2 rounded-md shadow-lg -top-8 left-0 z-50 w-max">
                {order.id}
              </span>
            </div>
            <p className="flex-1 text-center">{order?.shippingAddress && order?.shippingAddress?.firstName + " " + order?.shippingAddress?.lastName}</p>
            <p
              className={`flex-1 text-center ${
                order.status === "Delivered"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {order.status}
            </p>
            <p className="flex-1 text-center">${order.totalAmount}</p>
            <button className="flex-1 text-blue-500 hover:underline">
              View Details
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersListComponent;
