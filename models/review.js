const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    // name: String,
    rating: Number,
    comment: String,
});

const Review = new mongoose.model("Review", reviewSchema);

module.exports = Review;
