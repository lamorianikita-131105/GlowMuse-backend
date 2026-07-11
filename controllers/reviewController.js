const Review = require("../models/Review");

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      productId: req.params.productId,
    });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addReview = async (req, res) => {
  try {
    const review = await Review.create({
      user: req.user._id,
      productId: Number(req.params.productId),
      name: req.user.name,
      rating: req.body.rating,
      comment: req.body.comment,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getReviews,
  addReview,
};