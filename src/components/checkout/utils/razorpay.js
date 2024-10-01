import { toast } from "react-toastify";

const logo = "https://firebasestorage.googleapis.com/v0/b/ecommerce-firebase-1d466.appspot.com/o/company%2Flogo%2Fexclusive-white%20(1).png?alt=media&token=6597c848-0601-4828-b3bd-4bb5edd989ac";

const razorpay_api = import.meta.env.VITE_RAZORPAY_API;
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

export const configureRazorpay = (amount, orderId, userData, handlePayment) => {
    return {
        key: RAZORPAY_KEY_ID,
        amount: amount * 100, // Convert to paise
        currency: 'INR',
        name: 'Exclusive',
        description: 'Purchase of Exclusive Items from Our E-commerce Store',
        image: logo,
        order_id: orderId,
        prefill: {
            name: `${userData.firstName} ${userData.lastName}`,
            email: userData.email,
            contact: userData.phoneNumber,
        },
        handler: handlePayment, // Directly assign the handler here
        theme: {
            color: '#db4444',
        },
    };
};

export const handleRazorPayPayment = (amount, userData) => {
    return new Promise(async (resolve) => {
        const orderData = {
            amount,
            currency: "INR",
        };

        const response = await fetch(`${razorpay_api}/api/payment/create-order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        const order = await response.json();

        const handlePayment = async (response) => {
            const { razorpay_payment_id, razorpay_order_id } = response;

            try {
                const paymentVerificationResponse = await fetch(`${razorpay_api}/api/payment/verify-order`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-razorpay-signature': response.razorpay_signature,
                    },
                    body: JSON.stringify({
                        paymentId: razorpay_payment_id,
                        orderId: razorpay_order_id,
                    }),
                });

                const verificationResult = await paymentVerificationResponse.json();
                if (verificationResult.success) {
                    const paymentInfo = {
                        method : "Razorpay",
                        razorpay_order_id,
                        razorpay_payment_id,
                        status: "paid",
                    }
                    resolve({ success: true, paymentInfo });
                } else {
                    toast.error('Payment verification failed. Please try again.');
                    resolve({ success: false });
                }
            } catch (error) {
                console.error('Error verifying payment:', error);
                toast.error('An error occurred while verifying the payment. Please try again.');
                resolve({ success: false });
            }
        };

        const options = configureRazorpay(amount, order.id, userData, handlePayment);
        const rzp1 = new window.Razorpay(options);

        rzp1.on('payment.failed', function (response) {
            console.error('Payment failed:', response);
            toast.error('Payment failed. Please try again.');

            // Close the Razorpay popup
            rzp1.close();
            resolve({ success: false });
        });

        rzp1.open();
    });
};


const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  
 export const displayRazorpay = async () => {
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      alert("Failed to load Razorpay SDK. Please check your internet connection.");
      return;
    }
}