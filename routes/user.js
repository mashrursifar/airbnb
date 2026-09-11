const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const User = require("../models/user.js");
const passport = require("passport");

router.get("/signup", (req, res) => {
    res.render("listing/signup.ejs");
});

router.post("/signup", async (req, res) => {
    try {
        let { username, email, password } = req.body;
        console.log(username, email, password);
        let data = new User({ username, email });
        let newUser = await User.register(data, password);
        console.log("New User: ", newUser);
        res.redirect("/login");
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
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    async (req, res) => {
        
        req.flash("success","Welcome to wanderLust, Your are LoggedIn");
        res.redirect("/listing")
    },
);
module.exports = router;
