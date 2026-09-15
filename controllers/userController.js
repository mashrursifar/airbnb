const User = require("../models/user")


module.exports.renderSignupForm = (req, res) => {
    res.render("listing/signup.ejs");
};

module.exports.createNewUser = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        let data = new User({ username, email });

        let newUser = await User.register(data, password);
        console.log("New User: ", newUser);
                
        req.login(newUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to wanderLust");
            return res.redirect("/listing");
        });
    } catch (e) {
        req.flash("err", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("listing/login.ejs");
};

module.exports.login = async (req, res) => {
    req.flash(
        "success",
        "Welcome to wanderLust, Your are successfully Loggedin",
    );
    let redirectPath = res.locals.redirectUrl || "/listing";

    // console.log(path);
    res.redirect(redirectPath);
};

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged you out successfully");
        res.redirect("/listing");
    });
};
