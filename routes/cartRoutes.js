const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
  getCart,
  addToCart,
  removeFromCart,
  updateCartQuantity,
} = require("../controllers/cartController");

const router = express.Router();

router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.delete("/:id", protect, removeFromCart);
router.put("/:id", protect, updateCartQuantity);

module.exports = router;