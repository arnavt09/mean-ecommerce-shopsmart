const express = require('express');
const {
 checkout,
 getUserOrders
} = require('../controllers/orderController');
const router = express.Router();
router.post('/checkout', checkout);
router.get('/user/:userId', getUserOrders);
module.exports = router;