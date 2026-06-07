const Order = require('../models/Order');
const Cart = require('../models/Cart');

const checkout = async (req, res) => {
  try {
    const { userId } = req.body;

    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    const totalAmount = cart.items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);

    const orderItems = cart.items.map((item) => {
        return {
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.price
        };
    });

    const checkout = async (req, res) => {
  try {
    const { userId } = req.body;

    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    const orderItems = cart.items.map((item) => {
      return {
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price
      };
    });

    const totalAmount = orderItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    const order = await Order.create({
      user: userId,
      items: orderItems,
      totalAmount: totalAmount
    });

    cart.items = [];
    await cart.save();

    const populatedOrder = await Order.findById(order._id).populate('items.product');

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: populatedOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Checkout failed',
      error: error.message
    });
  }
};

const order = await Order.create({
  user: userId,
  items: orderItems,
  totalAmount
});

    cart.items = [];
    await cart.save();

    const populatedOrder = await Order.findById(order._id).populate('items.product');

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: populatedOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Checkout failed',
      error: error.message
    });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;

    const orders = await Order.find({ user: userId })
      .populate('items.product')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
};

module.exports = {
  checkout,
  getUserOrders
};