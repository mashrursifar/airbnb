const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const { saveRedirectUrl, userValidate } = require("../middlewares.js");
const userController = require("../controllers/userController.js");

router
    .route("/signup")
    .get(userController.renderSignupForm)

    .post( userValidate, userController.createNewUser);

router
    .route("/login")
    .get(userController.renderLoginForm) // login form
    .post(
        // receive the login info and check validation
        saveRedirectUrl,
        passport.authenticate("local", {
            failureRedirect: "/login",
            failureFlash: true,
        }),
        userController.login,
    );

// logout
router.route("/logout").get(userController.logout);

module.exports = router;
