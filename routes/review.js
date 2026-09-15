const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const reviewController = require("../controllers/reviewController.js")
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
