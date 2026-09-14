const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const { reviewValidation } = require("../reviewValidation.js");
const Listing = require("../models/listing.js");
const { isAuthenticate, isAuthor } = require("../middlewares.js");

const validateReview = (req, res, next) => {
    const { error, value } = reviewValidation.validate(req.body);

    if (error) {
        throw new ExpressError(400, error.message);
    } else {
        next();
    }
};

// Post route for new reviews
router.post(
    "/",
    validateReview,
    isAuthenticate,
    wrapAsync(async (req, res) => {
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
    }),
);

// Delete reviews
router.delete(
    "/:idR",
    isAuthenticate,
    isAuthor,
    wrapAsync(async (req, res) => {
        let { id, idR } = req.params;
        
        await Listing.findByIdAndUpdate(id, { $pull: { review: idR } });
        await Review.findByIdAndDelete(idR);
        req.flash("success", "Review deleted successfully!!");
        res.redirect(`/listing/${id}`);
    }),
);

module.exports = router;
