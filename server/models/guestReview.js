const mongoose = require('mongoose');

const guestReviewSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'GuestOrder', required: true, unique: true },
  orderNumber: { type: String, required: true, index: true },
  customerName: { type: String, required: true, trim: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true, trim: true, maxlength: 1000 },
}, { timestamps: true });

module.exports = mongoose.model('GuestReview', guestReviewSchema);
