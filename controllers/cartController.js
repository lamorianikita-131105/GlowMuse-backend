const Cart = require("../models/Cart");

const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  res.json(cart || { items: [] });
};

const addToCart = async (req, res) => {
  const product = req.body;

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      items: [{ ...product, productId: product.id, quantity: 1 }],
    });

    return res.status(201).json(cart);
  }

  const existingItem = cart.items.find(
    (item) => item.productId === product.id
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({
      ...product,
      productId: product.id,
      quantity: 1,
    });
  }

  await cart.save();

  res.json(cart);
};

const removeFromCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  cart.items = cart.items.filter(
    (item) => item.productId !== Number(req.params.id)
  );

  await cart.save();

  res.json(cart);
};

const updateCartQuantity = async (req, res) => {
  try {
    const productId = Number(req.params.id);
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1",
      });
    }

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (item) => item.productId === productId
    );

    if (!item) {
      return res.status(404).json({
        message: "Product not found in cart",
      });
    }

    item.quantity = quantity;

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  updateCartQuantity,
};