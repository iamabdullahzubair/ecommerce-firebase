import { collection, doc, addDoc, updateDoc, getDoc, getDocs, query, where, setDoc } from 'firebase/firestore';
import {  db } from '../firebase';

class OrderService {
  constructor(userId) {
    this.userId = userId;
    this.ordersCollection = collection(db, 'orders');
  }

  // Place a new order with Firebase-generated ID
  async placeOrder(orderData) {
    try {
       // add 
    let tracking =[
      {
        status : "Order Placed",
        timestamp : new Date()
      },
    ]
      const orderPayload = {
        ...orderData,
        userId: this.userId,
        status: 'Order Placed', // Initial order  status ->> "Order Placed",  "Processing" , "Shipped", "Delivered"
        createdAt: new Date(),
        tracking
      };

      // Use addDoc to automatically generate an ID
      const docRef = await addDoc(this.ordersCollection, orderPayload);
      return { success: true, orderId: docRef.id }; // docRef.id contains the Firebase-generated orderId
    } catch (error) {
      console.error('Error placing order:', error);
      return { success: false, error };
    }
  }

  // Cancel an order
  async cancelOrder(orderId) {
    try {
      const orderDoc = doc(this.ordersCollection, orderId);
      const orderSnapshot = await getDoc(orderDoc);

      if (!orderSnapshot.exists()) {
        throw new Error('Order not found');
      }

      const orderData = orderSnapshot.data();

      if (orderData.status === 'completed') {
        throw new Error('Cannot cancel a completed order');
      }

      await updateDoc(orderDoc, { status: 'canceled' });
      return { success: true };
    } catch (error) {
      console.error('Error canceling order:', error);
      return { success: false, error };
    }
  }

  // Update order details (e.g., shipping address)
  async updateOrder(orderId, updatedData) {
    try {
      const orderDoc = doc(this.ordersCollection, orderId);
      await updateDoc(orderDoc, updatedData);
      return { success: true };
    } catch (error) {
      console.error('Error updating order:', error);
      return { success: false, error };
    }
  }

  // Update order details (e.g., shipping address)
  async updateOrderSpecificData(orderId, payload) {
    try {

      const orderDoc = doc(this.ordersCollection, orderId);
      await setDoc(orderDoc, payload, { merge: true });
      return { success: true };
    } catch (error) {
      console.error('Error updating order:', error);
      return { success: false, error };
    }
  }

  // Get order details
  async getOrderDetails(orderId) {
    try {
      const orderDoc = doc(this.ordersCollection, orderId);
      const orderSnapshot = await getDoc(orderDoc);

      if (!orderSnapshot.exists()) {
        return { success: false, error: "Order not found" }; // Return an error message
      }

      return { success: true, data: orderSnapshot.data() };
    } catch (error) {
      console.error('Error fetching order details:', error);
      return { success: false, error };
    }
  }

  // Get all orders for the current user
  async getUserOrders() {
    try {
      const userOrdersQuery = query(this.ordersCollection, where('userId', '==', this.userId));
      const querySnapshot = await getDocs(userOrdersQuery);
      const orders = [];

      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      
      return { success: true, data : orders };
    } catch (error) {
      console.error('Error fetching user orders:', error);
      return { success: false, error };
    }
  }
}

export default OrderService;
