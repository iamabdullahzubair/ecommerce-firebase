import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../../../firebase";
export const fetchMonthlySalesData = async () => {
  try {
    const ordersCollection = collection(db, "orders"); // Adjust the collection name as necessary
    const ordersSnapshot = await getDocs(ordersCollection);

    const salesData = {};

    ordersSnapshot.forEach((doc) => {
      const order = doc.data();
      console.log(order);
      const orderDate = order.createdAt.toDate();
      const month = orderDate.toLocaleString("default", { month: "long" }); // Get full month name
      const year = orderDate.getFullYear();

      const key = `${month} ${year}`; // e.g., "January 2024"

      if (!salesData[key]) {
        salesData[key] = { cash: 0, online: 0, total: 0 };
      }
      if (order?.paymentOption == "cashondelivery") {
        salesData[key].cash += Number(order.totalAmount);
      }
      if (order?.paymentOption == "netbanking/upi") {
        salesData[key].online += Number(order.totalAmount);
      }
      salesData[key].total += Number(order.totalAmount); // Assuming 'total' is the sales amount
    });

    console.log(salesData);
    // Convert the salesData object into an array
    const chartData = Object.keys(salesData).map((key) => ({
      name: key,
      stats: salesData[key],
    }));

    return { success: true, data: chartData }; // This will be used for the chart
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
};

export const fetchCurrentMonthSalesData = async () => {
  try {
    const salesCollection = collection(db, "orders"); // Adjust the collection name as necessary
    const salesSnapshot = await getDocs(salesCollection);
    const currentDate = new Date();
    const currentMonthKey = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }`;

    let codTotal = 0;
    let onlineTotal = 0;

    salesSnapshot.docs.forEach((doc) => {
      const saleData = doc.data();
      const date =
        saleData.createdAt instanceof Timestamp
          ? saleData.createdAt.toDate()
          : new Date(saleData.createdAt);
      const saleMonthKey = `${date.getFullYear()}-${date.getMonth() + 1}`; // Format: YYYY-MM

      // console.log(saleData)
      console.log(saleMonthKey);
      console.log(currentMonthKey);
      // Check if the sale is from the current month
      if (saleMonthKey === currentMonthKey) {
        if (saleData.paymentOption === "cashondelivery") {
          codTotal += Number(saleData.totalAmount);
        } else if (saleData.paymentOption === "netbanking/upi") {
          onlineTotal += Number(saleData.totalAmount);
        }
      }
    });

    const stats = { cod: codTotal, online: onlineTotal };
    return {success : true, data : stats}
} catch (error) {
    console.log(error)
      return {success : false, message : error.message}
  }
};
