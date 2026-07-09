const Order = require("../models/Order");

const placeOrder = async (req, res) => {
  try {
    const {
      products,
      totalAmount,
      shippingAddress,
      paymentMethod,
    } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({
        message: "No products in order",
      });
    }

    const order = await Order.create({
      userId: req.user._id,
      products,
      totalAmount,
      shippingAddress,
      paymentMethod,
      status: "Placed",
    });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  placeOrder,
  getMyOrders,
};