const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity: Number,
      totalPrice: Number,
      total_Wholesale_price: Number
    }
  ],
});
cartSchema.index({ request: 'text' });
module.exports = mongoose.model('Cart', cartSchema);