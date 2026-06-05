const mongoose = require('moongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },

  quantity: {
    type: Number,
    required: true,
    min: 1
  },

  price: {
    type: Number,
    required: true,
    min: 0
  }
});

const orderSchema = new mongoose.Schema(
    {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true
        },

        items: [orderItemSchema],

        totalAmount: {
            type: Number,
            required: true,
            min: 0
        },

        status: {
            type: String,
            enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
            default: 'Pending'
        }
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;