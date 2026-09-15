const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const { saveRedirectUrl, userValidate } = require("../middlewares.js");
const userController = require("../controllers/userController.js")

router.get("/signup", userController.renderSignupForm);

router.post("/signup",userValidate, userController.createNewUser);

router.get("/login",userController.renderLoginForm);

// receive the login info and check validation
router.post(
    "/login",
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    userController.login,
);

// logout
router.get("/logout", userController.logout);
module.exports = router;
