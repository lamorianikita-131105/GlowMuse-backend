const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  products: [
    {
      productId: Number,
      name: String,
      image: String,
      price: Number,
      quantity: Number,
    },
  ],

  shippingAddress: {
    fullName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
  },

  paymentMethod: {
    type: String,
    required: true,
    default: "Cash on Delivery",
  },

  totalAmount: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    default: "Pending",
  },
},
{
  timestamps: true,
}
);

module.exports = mongoose.model("Order", orderSchema);