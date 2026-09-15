const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createNewReview = async (req, res) => {
    let { id } = req.params;
    console.log("Listing ID: ", id);
    console.log("New review: ", req.body);
    let author = req.user;
    let listing = await Listing.findById(id);
    const review = { ...req.body, author };

    let newReview = new Review(review);

    listing.review.push(newReview);

    await listing.save();
    await newReview.save();

    req.flash("success", "New review created!!");
    res.redirect(`/listing/${id}`);
};

module.exports.destroyReview = async (req, res) => {
    let { id, idR } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { review: idR } });
    await Review.findByIdAndDelete(idR);
    req.flash("success", "Review deleted successfully!!");
    res.redirect(`/listing/${id}`);
};
