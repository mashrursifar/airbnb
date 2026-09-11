const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const User = require("../models/user.js");

router.get("/signup", (req, res) => {
    res.render("listing/signup.ejs");
});

router.post("/signup", async (req, res) => {
    let { username, email, password } = req.body;
    console.log(username, email, password);
    let data = new User(username, email);
    let newUser = await User.register(data, password);

    console.log("New User: ",newUser);

    res.redirect("/login");
});

router.get("/login", (req, res) => {
    res.render("listing/login.ejs");
});
module.exports = router;
