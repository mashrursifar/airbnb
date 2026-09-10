const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const session= require("express-session")

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static("public"));

const sessionOptions = {
    secret: "secratecode",
    resave: false,
    saveUninitialized: true
}

app.use(session(sessionOptions))

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

app.use("/listing", listings);
app.use("/listing/:id/reviews/", reviews);

app.listen(8080, () => {
    console.log("Server has started at 8080 port");
});

app.get("/", (req, res) => {
    res.send("Root is working");
});

app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;

    // res.status(statusCode).send(message);
    console.log(err);
    res.status(statusCode).render("listing/error.ejs", {
        statusCode,
        message,
    });
});
