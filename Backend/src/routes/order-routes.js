const express = require('express');
const { createOrder, verifyOrder, userOrder, listOrder, updateStatus, cancelOrder } = require('../controllers/ordercontroller');
const checkToken = require('../middlewares/check-token');

const router = express.Router();

router.post('/create', checkToken, createOrder);
router.post('/verify', checkToken, verifyOrder);
router.post('/userorder', checkToken, userOrder);
router.get('/listorder', listOrder);
router.post('/status', updateStatus);
router.post('/cancel', checkToken, cancelOrder);

module.exports = router;