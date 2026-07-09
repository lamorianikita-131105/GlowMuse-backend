const Wishlist = require("../models/Wishlist");

const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const product = req.body;

    const exists = await Wishlist.findOne({
      userId: req.user._id,
      productId: product.id,
    });

    if (exists) {
      return res.status(400).json({
        message: "Product already in wishlist",
      });
    }

    const wishlistItem = await Wishlist.create({
      userId: req.user._id,
      productId: product.id,
      name: product.name,
      image: product.image,
      category: product.category,
      price: product.price,
    });

    res.status(201).json(wishlistItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    await Wishlist.findOneAndDelete({
      userId: req.user._id,
      productId: Number(req.params.id),
    });

    res.status(200).json({
      message: "Removed from wishlist",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};
