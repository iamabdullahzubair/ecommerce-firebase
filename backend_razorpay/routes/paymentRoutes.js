// backend/routes/paymentRoutes.js
const express = require('express');
const { createOrder, verifyOrder, fetchDetails } = require('../controllers/paymentController');

const router = express.Router();

router.post('/create-order', createOrder);
router.post('/verify-order', verifyOrder);
router.get('/fetch-payment-details/:paymentId', fetchDetails);


module.exports = router;
