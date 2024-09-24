import React, { useEffect, useState } from "react";
import OrderTrack from "../components/order/OrderTrack";
import OrderItem from "../components/order/OrderItem";
import { getUserOrders } from "../reducers/order/orderApi";
import { useGlobalState } from "../reducers/global/GlobalContext";
import { ORDER_ACTIONS } from "../reducers/order/orderReducer";
import { toast } from "react-toastify";
import { Circles } from "react-loader-spinner";

const cart = [
  {
    status: "Shipped",
    stock: "25",
    discount: "15",
    name: "IPS LCD Gaming Monitor",
    category: "Computers",
    quantity: 1,
    sizes: ["L", "XL"],
    pId: "1fmZzTUhfGRHBAQiZPEZ",
    rating: 3,
    price: "370",
    userId: "XUgzggDBMqQaN6uugRuhFBci1Pz1",
    desc: "Lorem ipsum odor amet, consectetuer adipiscing elit. Morbi facilisi class tempor ligula sed amet. Et ante lectus porta eros curae hendrerit vivamus. Scelerisque ac quam mauris condimentum lobortis scelerisque. Non sit tortor sagittis; pulvinar porttitor pharetra.",
    thumbnail:
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-firebase-1d466.appspot.com/o/images%2Fg27cq4-500x500%201.png?alt=media&token=9b6ae4e8-a897-43aa-9af3-5147192e3ba2",
    featured: "best-selling",
    reviews: [],
    flashSale: {
      discount: 0,
      active: false,
      endDate: null,
    },
    images: [
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-firebase-1d466.appspot.com/o/images%2Fg27cq4-500x500%201.png?alt=media&token=9b6ae4e8-a897-43aa-9af3-5147192e3ba2",
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-firebase-1d466.appspot.com/o/images%2Fcomputer-2170392_1280.jpg?alt=media&token=5fe4ce67-c76d-424a-87db-8c09f7f17b32",
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-firebase-1d466.appspot.com/o/images%2Fman-1839500_1280.jpg?alt=media&token=fd4b165c-cf57-4211-a455-a94bb773fc35",
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-firebase-1d466.appspot.com/o/images%2Fcatch-464737_1280.jpg?alt=media&token=27267d7d-2150-4738-bd4f-64e06f90f098",
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-firebase-1d466.appspot.com/o/images%2Fimac-2493287_1280.png?alt=media&token=ccf74be8-d258-48f8-92df-ac72788c04fa",
    ],
  },
  {
    status: "Delivered",
    userId: "XUgzggDBMqQaN6uugRuhFBci1Pz1",
    pId: "AlPx14svFPpA2EBl6oHr",
    images: [
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-firebase-1d466.appspot.com/o/images%2Fstill-life-rendering-jackets-display%20(3).jpg?alt=media&token=767fb774-b3e5-40c9-b5ca-e7ce95c61791",
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-firebase-1d466.appspot.com/o/images%2Fstill-life-rendering-jackets-display%20(2).jpg?alt=media&token=aa0036bf-7abc-4dfe-a98b-5f2aef122175",
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-firebase-1d466.appspot.com/o/images%2Fstill-life-rendering-jackets-display%20(1).jpg?alt=media&token=1ec18065-ad50-4abc-85f0-20cbc32be83e",
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-firebase-1d466.appspot.com/o/images%2Fstill-life-rendering-jackets-display.jpg?alt=media&token=d2e19ebe-e6e9-4021-a99c-313e986158a0",
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-firebase-1d466.appspot.com/o/images%2F672462_ZAH9D_5626_002_100_0000_Light-The-North-Face-x-Gucci-coat%201.png?alt=media&token=87251447-00d6-4e03-85fd-00d8ee66b92a",
    ],
    thumbnail:
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-firebase-1d466.appspot.com/o/images%2Fstill-life-rendering-jackets-display%20(3).jpg?alt=media&token=767fb774-b3e5-40c9-b5ca-e7ce95c61791",
    stock: "11",
    category: "Fashion",
    price: "260",
    desc: "Lorem ipsum odor amet, consectetuer adipiscing elit. Augue semper viverra amet et tincidunt libero fringilla quam. Platea sed mi eu erat vitae felis rhoncus mus ex. Vel leo nostra dictum ante nisl arcu dictum class. Vestibulum condimentum primis in phasellus habitasse mus porttitor sociosqu.",
    quantity: 1,
    reviews: [],
    name: "The north coat",
    rating: 3,
    featured: "new",
    sizes: ["S", "M", "L"],
    flashSale: {
      active: false,
      endDate: null,
      discount: 0,
    },
    discount: "30",
  },
  {
    status: "Processing",
    flashSale: {
      active: false,
      endDate: null,
      discount: 0,
    },
    thumbnail:
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-firebase-1d466.appspot.com/o/images%2Fg92-2-500x500%201.png?alt=media&token=a57a8d5c-d91e-45a9-b64a-0b76ee9dfb46",
    featured: "best-selling",
    category: "Gaming",
    stock: "15",
    price: "120",
    pId: "xWETECbVpUZlTNB9JhlD",
    discount: "15",
    sizes: ["S", "L"],
    desc: "Lorem ipsum odor amet, consectetuer adipiscing elit. Inceptos mi bibendum sollicitudin; sagittis arcu ultrices. Class praesent molestie; aptent odio nostra amet.",
    rating: 3,
    quantity: 1,
    userId: "XUgzggDBMqQaN6uugRuhFBci1Pz1",
    name: "HAVIT HV-G92 Gamepad",
    reviews: [],
    images: [
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-firebase-1d466.appspot.com/o/images%2Fg92-2-500x500%201.png?alt=media&token=a57a8d5c-d91e-45a9-b64a-0b76ee9dfb46",
    ],
  },
];

// Mock Data for Orders
const mockOrders = [
  {
    id: "orderId123",
    totalAmount: 999,
    orderDate: "2024-09-23",
    status: "Processing",
    cart,
  },
  {
    id: "orderId456",
    totalAmount: 1500,
    orderDate: "2024-09-20",
    status: "Shipped",
    cart,
  },
  // Add more mock orders if needed
];

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
