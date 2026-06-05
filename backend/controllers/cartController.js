const Cart = require("../models/Cart");
const Product = require("../models/Product");
const User = require("../models/User");

// GET /api/cart/:userId
const getCart = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [],
      });
    }

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
      error: error.message,
    });
  }
};

// POST /api/cart/add
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "User ID, Product ID, and quantity are required",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId,
    );

    if (existingItem) {
      existingItem.quantity = existingItem.quantity + Number(quantity);
    } else {
      cart.items.push({
        product: productId,
        quantity: Number(quantity),
      });
    }

    await cart.save();

    const updatedCart = await Cart.findOne({ user: userId }).populate(
      "items.product",
    );

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      data: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add product to cart",
      error: error.message,
    });
  }
};

// PUT /api/cart/update
const updateCartItem = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "User ID, Product ID, and quantity are required",
      });
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (cartItem) => cartItem.product.toString() === productId,
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    item.quantity = Number(quantity);

    await cart.save();

    const updatedCart = await Cart.findOne({ user: userId }).populate(
      "items.product",
    );

    res.status(200).json({
      success: true,
      message: "Cart item updated",
      data: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update cart item",
      error: error.message,
    });
  }
};

// DELETE /api/cart/remove
const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Product ID are required",
      });
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId,
    );

    await cart.save();

    const updatedCart = await Cart.findOne({ user: userId }).populate(
      "items.product",
    );

    res.status(200).json({
      success: true,
      message: "Product removed from cart",
      data: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to remove product from cart",
      error: error.message,
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
};
