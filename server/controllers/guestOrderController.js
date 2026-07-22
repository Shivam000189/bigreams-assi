const GuestOrder = require('../models/guestOrder');
const GuestReview = require('../models/guestReview');

const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

exports.createOrder = async (req, res) => {
  try {
    const { customer, items, notes = '' } = req.body;
    if (!customer?.name || !customer?.email || !customer?.phone || !customer?.address || !isValidEmail(customer.email)) {
      return res.status(400).json({ message: 'Please provide valid name, email, phone, and address details.' });
    }
    if (!Array.isArray(items) || items.length === 0 || items.some((item) => !item?.id || !item?.title || !Number.isFinite(Number(item.price)) || !Number.isInteger(item.quantity) || item.quantity < 1)) {
      return res.status(400).json({ message: 'Your cart contains invalid items.' });
    }

    const orderItems = items.map((item) => ({
      productId: String(item.id), title: item.title, image: item.image || '', price: Number(item.price), quantity: item.quantity,
    }));
    const totalPrice = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const orderNumber = `BGR-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    const order = await GuestOrder.create({ orderNumber, customer, items: orderItems, totalPrice, notes });

    res.status(201).json({ message: 'Order placed successfully.', order: { id: order._id, orderNumber: order.orderNumber, totalPrice: order.totalPrice, orderStatus: order.orderStatus } });
  } catch (error) {
    res.status(500).json({ message: 'Unable to place the order. Please try again.' });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const { orderNumber, email } = req.query;
    if (!orderNumber || !email) return res.status(400).json({ message: 'Order number and email are required.' });
    const order = await GuestOrder.findOne({ orderNumber, 'customer.email': email.toLowerCase() }).lean();
    if (!order) return res.status(404).json({ message: 'Order not found.' });
    res.json({ order });
  } catch {
    res.status(500).json({ message: 'Unable to retrieve the order.' });
  }
};

exports.createReview = async (req, res) => {
  try {
    const { orderNumber, email, rating, comment } = req.body;
    if (!orderNumber || !email || !Number.isInteger(rating) || rating < 1 || rating > 5 || !comment?.trim()) {
      return res.status(400).json({ message: 'Please provide a rating and review comment.' });
    }
    const order = await GuestOrder.findOne({ orderNumber, 'customer.email': email.toLowerCase() });
    if (!order) return res.status(404).json({ message: 'Order not found.' });
    const review = await GuestReview.create({ order: order._id, orderNumber, customerName: order.customer.name, rating, comment: comment.trim() });
    res.status(201).json({ message: 'Thank you for your review.', review });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: 'A review has already been submitted for this order.' });
    res.status(500).json({ message: 'Unable to save your review.' });
  }
};

exports.getReviews = async (req, res) => {
  const reviews = await GuestReview.find().sort({ createdAt: -1 }).limit(30).select('customerName rating comment createdAt').lean();
  res.json({ reviews });
};
