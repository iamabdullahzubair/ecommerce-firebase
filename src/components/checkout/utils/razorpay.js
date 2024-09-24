import { toast } from "react-toastify";

const logo = "https://firebasestorage.googleapis.com/v0/b/ecommerce-firebase-1d466.appspot.com/o/company%2Flogo%2Fexclusive-white.png?alt=media&token=47c2197c-3c0e-494a-bbd6-1f8b131162af";

const RAZORPAY_KEY_ID = "rzp_test_ckuJDqO5Igd8Sr";
const RAZORPAY_KEY_SECRET = "Bnq1S5GuV5MV0nzt4asazc3n";

export const configureRazorpay = (amount, orderId, userData, handlePayment) => {
    return {
        key: RAZORPAY_KEY_ID,
        amount: amount * 100, // Convert to paise
        currency: 'INR',
        name: 'Exclusive',
        description: 'Test Transaction',
        image: logo,
        order_id: orderId,
        prefill: {
            name: `${userData.firstName} ${userData.lastName}`,
            email: userData.email,
            contact: userData.phoneNumber,
        },
        handler: handlePayment, // Directly assign the handler here
        theme: {
            color: '#F37254',
        },
    };
};

export const handleRazorPayPayment = (amount, userData) => {
    return new Promise(async (resolve) => {
        const orderData = {
            amount,
            currency: "INR",
        };

        const response = await fetch('http://localhost:5000/api/payment/create-order', {
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
                const paymentVerificationResponse = await fetch('http://localhost:5000/api/payment/verify-order', {
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
                        razorpay_order_id,
                        razorpay_payment_id,
                        status : "paid",
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
            resolve({ success: false });
        });

        rzp1.open();
    });
};
