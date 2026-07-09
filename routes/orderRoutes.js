const express = require("express");

const router = express.Router();

const {
  placeOrder,
  getMyOrders,
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");

router.post("/place", protect, placeOrder);

router.get("/myorders", protect, getMyOrders);

module.exports = router;