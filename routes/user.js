const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl, isAuthenticate } = require("../authenticateMiddleware.js");


router.get("/signup", (req, res) => {
    res.render("listing/signup.ejs");
});

router.post("/signup", async (req, res) => {
    try {
        let { username, email, password } = req.body;
        let data = new User({ username, email });

        let newUser = await User.register(data, password);
        console.log("New User: ", newUser);
        // Automatic login after signup
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
});

router.get("/login", (req, res) => {
    res.render("listing/login.ejs");
});

// receive the login info
router.post(
    "/login",
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    async (req, res) => {
        req.flash(
            "success",
            "Welcome to wanderLust, Your are successfully Loggedin",
        );
        let path = res.locals.redirectUrl || "/listing";

        res.redirect(path);
    },
);

// logout
router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged you out successfully");
        res.redirect("/listing");
    });
});
module.exports = router;
