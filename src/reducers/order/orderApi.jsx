import { auth } from "../../firebase";
import OrderService from "../../firebaseServices/orderService";

export async function placeOrder(orderPayload) {
  const user = auth.currentUser; // Directly get the current user

  // Check if user is authenticated
  if (!user) {
    console.log("User is not authenticated, redirect to login");
    return { success: false, message: "User not authenticated" };
  }

  try {
    // Instantiate the service with the user's ID
    const newOrderService = new OrderService(user.uid);
    
    // Place the order and get response 
   
    const response = await newOrderService.placeOrder(orderPayload);
    
    // If the order was placed successfully, return the orderId
    if (response.success) {
      return { success: true, orderId: response.orderId };
    } else {
      return { success: false, message: "Failed to place order" };
    }
  } catch (error) {
    console.error("Error on placing order :: ", error.message);
    return { success: false, error: error.message };
  }
}

export async function updateOrderSpecificData(orderId,payload) {
  const user = auth.currentUser; // Directly get the current user

  // Check if user is authenticated
  if (!user) {
    console.log("User is not authenticated, redirect to login");
    return { success: false, message: "User not authenticated" };
  }

  try {
    // Instantiate the service with the user's ID
    const newOrderService = new OrderService(user.uid);
    
    // Place the order and get response
    const response = await newOrderService.updateOrderSpecificData(orderId,payload);
    
    console.log(payload)

    // If the order was placed successfully, return the orderId
    if (response.success) {
      return { success: true, };
    } else {
      return { success: false, message: "Failed to update order" };
    }
  } catch (error) {
    console.error("Error on update specific data order :: ", error.message);
    return { success: false, error: error.message };
  }
}

export async function updateOrder(orderId,updatedData) {
  const user = auth.currentUser; // Directly get the current user

  // Check if user is authenticated
  if (!user) {
    console.log("User is not authenticated, redirect to login");
    return { success: false, message: "User not authenticated" };
  }

  try {
    // Instantiate the service with the user's ID
    const newOrderService = new OrderService(user.uid);
    
    // Place the order and get response
    const response = await newOrderService.updateOrder(orderId,updatedData);

    // If the order was placed successfully, return the orderId
    if (response.success) {
      return { success: true, };
    } else {
      return { success: false, message: "Failed to update order" };
    }
  } catch (error) {
    console.error("Error on update specific data order :: ", error.message);
    return { success: false, error: error.message };
  }
}

export async function getOrderDetails(orderId) {
  const user = auth.currentUser; // Directly get the current user

  // Check if user is authenticated
  if (!user) {
    console.log("User is not authenticated, redirect to login");
    return { success: false, message: "User not authenticated" };
  }

  try {
    // Instantiate the service with the user's ID
    const newOrderService = new OrderService(user.uid);
    
    // Place the order and get response
    const {success, data} = await newOrderService.getOrderDetails(orderId);

    // If the order was placed successfully, return the orderId
    if (success) {
      return { success: true, data };
    } else {
      return { success: false, message: "Failed to get order" };
    }
  } catch (error) {
    console.error("Error on getting order :: ", error.message);
    return { success: false, error: error.message };
  }
}
export async function getUserOrders() {
  const user = auth.currentUser; // Directly get the current user

  // Check if user is authenticated
  if (!user) {
    console.log("User is not authenticated, redirect to login");
    return { success: false, message: "User not authenticated" };
  }

  try {
    // Instantiate the service with the user's ID
    const newOrderService = new OrderService(user.uid);
    
    // Place the order and get response
    const {success, data} = await newOrderService.getUserOrders();

    // If the order was placed successfully, return the orderId
    if (success) {

      return { success: true, data };
    } else {
      return { success: false, message: "Failed to get orders" };
    }
  } catch (error) {
    console.error("Error on getting all order :: ", error.message);
    return { success: false, error: error.message };
  }
}



export async function getPaymentDetail(paymentId) {
  try {
    const response = await fetch(`http://localhost:5000/api/payment/fetch-payment-details/${paymentId}`)
    const data = await response.json();
    if(response.ok){
      return {success : true, data}
    }
    return {success: false, message : "response is not Ok"}
  } catch (error) {
    console.log(error.message)
    return {success: false, message : error.message}
  }
}