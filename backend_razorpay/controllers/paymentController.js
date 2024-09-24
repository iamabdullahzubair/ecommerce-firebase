// backend/controllers/paymentController.js

const razorpayInstance = require("../utils/razorPay");
const crypto = require("crypto");

const createOrder = async (req, res) => {
  const { amount, currency } = req.body;

  const options = {
    amount: amount * 100, // Razorpay expects amount in paisa (INR)
    currency,
    receipt: `receipt_${Date.now()}`,
  };

  try {
    const order = await razorpayInstance.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

const verifyOrder = async (req, res) => {
  const { paymentId, orderId } = req.body;

  // Construct the payment verification payload
  const signature = req.headers["x-razorpay-signature"];

  // Verify the signature
  const generatedSignature = crypto
    .createHmac("sha256", razorpayInstance.key_secret)
    .update(orderId + "|" + paymentId)
    .digest("hex");



  if (signature === generatedSignature) {
    // Payment verified successfully
    // You can save order details in your database here

    res.json({ success: true });
  } else {
    // Verification failed
    res
      .status(400)
      .json({ success: false, message: "Payment verification failed" });
  }
};





// Express API endpoint to get payment details
const fetchDetails = async (req, res) => {
  const { paymentId } = req.params;
  try {
    const paymentDetails = await fetchPaymentDetails(paymentId);
    res.json(paymentDetails);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payment details' });
  }
};


module.exports = { createOrder, verifyOrder, fetchDetails };


// Function to fetch payment details
const fetchPaymentDetails = async (paymentId) => {
  try {
    const paymentDetails = await razorpayInstance.payments.fetch(paymentId);
    return paymentDetails;
  } catch (error) {
    console.error("Error fetching payment details", error);
    throw error;
  }
};