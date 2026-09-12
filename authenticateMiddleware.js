module.exports.isAuthenticate = (req, res, next) => {
    // console.log(req.user);

    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("err", "You need to login first");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
        console.log("Locals: ",res.locals.redirectUrl);
    }
    next()
}