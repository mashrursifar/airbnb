const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {
    isAuthenticate,
    isOwner,
    validateListing,
} = require("../middlewares.js");
const listingController = require("../controllers/listingController.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
    .route("/")
    .get(wrapAsync(listingController.index)) // Show all the Listings
    .post(
        // New Listing: form->data->add listing
        isAuthenticate,
        upload.single("image.url"),
        validateListing,
        wrapAsync(listingController.createNewListing),
    );

// createe new page: ->form
router
    .route("/new")
    .get(isAuthenticate, listingController.renderNewListingForm);

// Create new route: details view of a listing
router.route("/:id").get(wrapAsync(listingController.showListing));

// Edit form
router
    .route("/:id/edit")
    .get(isAuthenticate, isOwner, wrapAsync(listingController.renderEditForm));

router
    .route("/:id")
    .put(
        // Edit in DB
        isAuthenticate,
        isOwner,
        validateListing,
        wrapAsync(listingController.updateListing),
    )
    .delete(
        // Destroy/delete from DB
        isAuthenticate,
        isOwner,
        wrapAsync(listingController.destroyListing),
    );

module.exports = router;
