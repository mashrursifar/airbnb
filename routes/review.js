const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const { reviewValidation } = require("../reviewValidation.js");
const Listing = require("../models/listing.js");

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
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        console.log(id);
        console.log(req.body);

        let listing = await Listing.findById(id);

        let newReview = new Review(req.body);

        listing.review.push(newReview);

        await listing.save();
        await newReview.save();

        res.redirect(`/listing/${id}`);
    }),
);

// Delete reviews
router.delete(
    "/:idR",
    wrapAsync(async (req, res) => {

        let {id,idR} = req.params;

        await Listing.findByIdAndUpdate(id, { $pull: { review: idR } });
        await Review.findByIdAndDelete(idR);
        res.redirect(`/listing/${id}`);
    }),
);

module.exports = router;