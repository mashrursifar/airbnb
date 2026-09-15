const Listing = require("./models/listing");
const Review = require("./models/review");
const { schema } = require("./schemaValidation");


module.exports.isAuthenticate = (req, res, next) => {
    
    if (!req.isAuthenticated()) {
        // console.log(req.method);
        req.session.redirectUrl = req.method == "GET"? req.originalUrl:req.headers.referer;
        req.flash("err", "You need to login first");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
        delete req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner.equals(req.user._id)) {
        req.flash(
            "err",
            "It looks like you don't have access to this listing.",
        );
        return res.redirect(`/listing/${id}`);
    }
    next();
};

module.exports.isAuthor = async (req, res, next) => {
    let { id, idR } = req.params;

    const review = await Review.findById(idR);

    if (!review.author.equals(req.user._id)) {
        req.flash(
            "err",
            "It looks like you don't have access to delete this review.",
        );
        return res.redirect(`/listing/${id}`);
    }
    next();
};

module.exports.validateListing = (req, res, next) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
        throw new ExpressError(400, error.message);
    } else {
        next();
    }
};