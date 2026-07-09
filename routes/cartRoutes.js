const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
  getCart,
  addToCart,
  removeFromCart,
} = require("../controllers/cartController");

const router = express.Router();

router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.delete("/:id", protect, removeFromCart);

module.exports = router;