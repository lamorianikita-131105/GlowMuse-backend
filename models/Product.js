const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    oldPrice: {
      type: Number,
    },
    
    id: {
        type: Number,
        required: true,
        unique: true,
    },

    rating: {
      type: Number,
      default: 4.5,
    },

    reviews: {
      type: Number,
      default: 0,
    },

    badge: {
      type: String,
    },

    image: {
      type: String,
      required: true,
    },

    images: [String],

    description: String,

    benefits: [String],

    ingredients: [String],

    stock: {
      type: Number,
      default: 10,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);