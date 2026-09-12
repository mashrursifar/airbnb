const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js")

const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static("public"));

const sessionOptions = {
    secret: "secratecode",
    resave: false,
    saveUninitialized: true,
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => {
        console.log("DB connected");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    mongoose.connect(MONGO_URL);
}

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.err = req.flash("err");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

app.use("/listing", listingRouter);
app.use("/listing/:id/reviews/", reviewRouter);
app.use("/", userRouter)
// app.get("/demouser", async (req, res) => {
//     let demoUser = new User({
//         email: "masif@gmail.com",
//         username: "masifa",
//     });

//     let newUser = await User.register(demoUser, "abc");
//     res.send(newUser)
// });
app.listen(8080, () => {
    console.log("Server has started at 8080 port");
});

// app.get("/", (req, res) => {
//     res.send("Root is working");
// });

app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;

    // res.status(statusCode).send(message);
    console.log(err);
    res.status(statusCode).render("listing/error.ejs", {
        statusCode,
        message,
    });
});
