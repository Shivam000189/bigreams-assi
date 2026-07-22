const express = require('express');
const { createOrder, createReview, getOrder, getReviews } = require('../controllers/guestOrderController');

const router = express.Router();
router.post('/orders', createOrder);
router.get('/orders/lookup', getOrder);
router.post('/reviews', createReview);
router.get('/reviews', getReviews);

module.exports = router;
