const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const reviewController = require("../controllers/reviewController.js");
const {
    isAuthenticate,
    isAuthor,
    validateReview,
} = require("../middlewares.js");

// Post route for new reviews
router
    .route("/")
    .post(
        isAuthenticate,
        validateReview,
        wrapAsync(reviewController.createNewReview),
    );

// Delete reviews
router
    .route("/:idR")
    .delete(
        isAuthenticate,
        isAuthor,
        wrapAsync(reviewController.destroyReview),
    );

module.exports = router;
