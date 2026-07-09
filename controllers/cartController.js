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

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
};