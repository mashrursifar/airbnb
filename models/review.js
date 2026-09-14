const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");

const reviewSchema = new Schema({
    // name: String,
    rating: Number,
    comment: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

const Review = new mongoose.model("Review", reviewSchema);

module.exports = Review;
