module.exports.isAuthenticate = (req, res, next) => {
    // console.log(req.user);

    if (!req.isAuthenticated()) {
        req.flash("err", "You need to login first");
        return res.redirect("/login");
    }
    next();
};
