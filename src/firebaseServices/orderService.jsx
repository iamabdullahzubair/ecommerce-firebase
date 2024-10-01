import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDoc,
  getDocs,
  query,
  where,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";

class OrderService {
  constructor(userId) {
    this.userId = userId;
    this.ordersCollection = collection(db, "orders");
  }

  async placeOrder(orderData) {
    try {
      // Initialize tracking
      const tracking = [
        {
          status: "Order Placed",
          desc: "Order confirmed! We're processing your order and will update you shortly. Thank you for shopping with us! (Team Exclusive)",
          timestamp: Timestamp.now(), // Using Firestore Timestamp
        },
      ];
  
      let { cart } = orderData;
  
      // Check if cart is empty
      if (cart.length === 0) {
        console.warn("Cart is empty, tracking data won't be added");
      } else {
        cart = cart.map(item => ({ ...item, tracking }));
      }
  
      const orderPayload = {
        ...orderData,
        cart,
        userId: this.userId,
        status: "Order Placed", // Initial order status
        createdAt: Timestamp.now(), // Using Firestore Timestamp
        tracking,
      };
  
      // Log the final order payload for debugging
      console.log("Order Payload:", orderPayload);
  
      // Use addDoc to automatically generate an ID
      const docRef = await addDoc(this.ordersCollection, orderPayload);
      return { success: true, orderId: docRef.id }; // Firebase-generated orderId
    } catch (error) {
      console.error("Error placing order:", error);
      return { success: false, error: error.message || "Unknown error occurred" }; // Improved error message
    }
  }
  

  // Cancel an order
  async cancelOrder(orderId) {
    try {
      const orderDoc = doc(this.ordersCollection, orderId);
      const orderSnapshot = await getDoc(orderDoc);

      if (!orderSnapshot.exists()) {
        throw new Error("Order not found");
      }

      const orderData = orderSnapshot.data();

      if (orderData.status === "completed") {
        throw new Error("Cannot cancel a completed order");
      }

      await updateDoc(orderDoc, { status: "canceled" });
      return { success: true };
    } catch (error) {
      console.error("Error canceling order:", error);
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
      console.error("Error updating order:", error);
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
      console.error("Error updating order:", error);
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
      console.error("Error fetching order details:", error);
      return { success: false, error };
    }
  }

  // Get all orders for the current user
  async getUserOrders() {
    try {
      const userOrdersQuery = query(
        this.ordersCollection,
        where("userId", "==", this.userId)
      );
      const querySnapshot = await getDocs(userOrdersQuery);
      const orders = [];

      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });

      return { success: true, data: orders };
    } catch (error) {
      console.error("Error fetching user orders:", error);
      return { success: false, error };
    }
  }

  // for admin get all orders
  async getAllOrders() {
    try {
      const ordersSnapshot = await getDocs(this.ordersCollection); // Fetch all documents from the products collection
      const ordersList = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return {
        success: true,
        data: ordersList, // Return the list of products
      };
    } catch (error) {
      return {
        success: false,
        message: error.message, // Handle any errors
      };
    }
  }
}

export default OrderService;
