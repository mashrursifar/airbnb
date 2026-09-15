const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});

    res.render("listing/listing.ejs", { allListings });
};

module.exports.renderNewListingForm = (req, res) => {
    res.render("listing/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findById(id)
        .populate({ path: "review", populate: { path: "author" } })
        .populate("owner");
    // console.log(listing);

    if (!listing) {
        req.flash("err", "Listing you have requested, does not exists!!");

        return res.redirect("/listing");
        // throw new ExpressError(404, "Listing Not Found");
    }

    res.render("listing/show.ejs", {
        listing,
        username: listing.owner.username,
    });
};

module.exports.createNewListing = async (req, res) => {
    const newListing = { ...req.body, owner: req.user._id };
    const list = new Listing(newListing);

    await list.save();
    req.flash("success", "New listing created!!");
    res.redirect("/listing");
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;

    let listing = await Listing.findById(id);

    res.render("listing/edit.ejs", { listing });
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = req.body;
    console.log(id);
    console.log(listing);

    const newListing = await Listing.findByIdAndUpdate(id, listing);
    req.flash("success", "Listing edited successfully!!");
    res.redirect(`/listing/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;

    let delData = await Listing.findByIdAndDelete(id);

    if (!delData) {
        throw new ExpressError(404, "Listing Not Found");
    }
    req.flash("success", "Listing Deleted!!");
    console.log(delData);
    res.redirect("/listing");
};
