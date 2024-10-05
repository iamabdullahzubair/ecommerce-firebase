// src/ThemeContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useGlobalState } from '../../reducers/global/GlobalContext';
import OrderService from '../../firebaseServices/orderService';

const OrderContext = createContext();

export function OrdersProvider({ children }) {
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
    
  
      const updateOrdersList = async (orderId, updatedData) => {
        const {success, } = await OrderFirebaseService.updateOrder(orderId,updatedData)
        if(success){
            const newOrdersList = ordersList.map(order => order.id == orderId ? updatedData  : order)
            setOrdersList(newOrdersList)
            return {success : true}
        }
        return {success : false}
      }

  return (
    <OrderContext.Provider value={{ ordersList, loading, updateOrdersList }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrderContext);
}
