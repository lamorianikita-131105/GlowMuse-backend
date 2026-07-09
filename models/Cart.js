const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true,
  },

  name: String,
  category: String,
  image: String,
  price: Number,

  quantity: {
    type: Number,
    default: 1,
  },
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [cartItemSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cartSchema);