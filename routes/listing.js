const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { schema } = require("../schemaValidation.js");
const {
    isAuthenticate,
    isOwner,
    validateListing,
} = require("../middlewares.js");
const listingController = require("../controllers/listingController.js");

// All the Listings
router.get("/", wrapAsync(listingController.index));

// createe new page: ->form
router.get("/new", isAuthenticate, listingController.renderNewListingForm);

// Create new route: details view of a listing
router.get("/:id", wrapAsync(listingController.showListing));

// New Listing: form->data
router.post(
    "/",
    isAuthenticate,
    validateListing,
    wrapAsync(listingController.createNewListing),
);

// Edit form
router.get(
    "/:id/edit",
    isAuthenticate,
    isOwner,
    wrapAsync(listingController.renderEditForm),
);

// Edit in DB
router.put(
    "/:id",
    isAuthenticate,
    isOwner,
    validateListing,
    wrapAsync(listingController.updateListing),
);

// Destroy/delete from DB
router.delete(
    "/:id",
    isAuthenticate,
    isOwner,
    wrapAsync(listingController.destroyListing),
);

module.exports = router;
