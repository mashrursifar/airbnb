const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { schema } = require("../schemaValidation.js");
const Listing = require("../models/listing.js");

const validateListing = (req, res, next) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
        throw new ExpressError(400, error.message);
    } else {
        next();
    }
};

// All the Listings
router.get(
    "/",
    wrapAsync(async (req, res) => {
        const allListings = await Listing.find({});

        res.render("listing/listing.ejs", { allListings });
    }),
);

// createe new page: ->form
router.get("/new", (req, res) => {
    res.render("listing/new.ejs");
});

// Create new route: details view of a listing
router.get(
    "/:id",
    wrapAsync(async (req, res) => {
        let { id } = req.params;

        const listing = await Listing.findById(id).populate("review");

        // console.log(listing);

        if (!listing) {
            throw new ExpressError(404, "Listing Not Found");
        }
        res.render("listing/show.ejs", { listing });
    }),
);

// New Listing: form->data
router.post(
    "/",
    validateListing,
    wrapAsync(async (req, res) => {
        const list = new Listing(req.body);
        list.save();

        res.redirect("/listing");
    }),
);

// Edit form
router.get(
    "/:id/edit",
    wrapAsync(async (req, res) => {
        let { id } = req.params;

        let listing = await Listing.findById(id);

        res.render("listing/edit.ejs", { listing });
    }),
);

// Edit in DB
router.put(
    "/:id",
    validateListing,
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        let listing = req.body;
        console.log(id);
        console.log(listing);

        const newListing = await Listing.findByIdAndUpdate(id, listing);
        res.redirect(`/listing/${id}`);
    }),
);

// Destroy/delete from DB
router.delete(
    "/:id",
    wrapAsync(async (req, res) => {
        let { id } = req.params;

        let delData = await Listing.findByIdAndDelete(id);

        if (!delData) {
            throw new ExpressError(404, "Listing Not Found");
        }
        console.log(delData);
        res.redirect("/listing");
    }),
);

module.exports = router;
