const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const reviewController = require("../controllers/reviewController.js")
const Listing = require("../models/listing.js");
const { isAuthenticate, isAuthor, validateReview } = require("../middlewares.js");



// Post route for new reviews
router.post(
    "/",
    isAuthenticate,
    validateReview,
    wrapAsync(reviewController.createNewReview),
);

// Delete reviews
router.delete(
    "/:idR",
    isAuthenticate,
    isAuthor,
    wrapAsync(reviewController.destroyReview),
);

module.exports = router;
