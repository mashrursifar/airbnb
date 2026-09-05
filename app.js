const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { schema } = require("./schemaValidation.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static("public"));

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

app.listen(8080, () => {
    console.log("Server has started at 8080 port");
});

app.get("/", (req, res) => {
    res.send("Root is working");
});

// app.get("/listingTest", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "my new villa",
//         description: "Nice beach villa",
//         price: 2000,
//         location: "COX bazar",
//         country: "Bangladesh"
//     })
//     await sampleListing.save();
//     console.log("Sample was saved");
//     res.send("Succesfull testing")
// });

// All the Listings
app.get(
    "/listing",
    wrapAsync(async (req, res) => {
        const allListings = await Listing.find({});

        res.render("listing/listing.ejs", { allListings });
    }),
);

// createe new page
app.get("/listing/new", (req, res) => {
    res.render("listing/new.ejs");
});

// Create new route
app.get(
    "/listing/:id",
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        
        const listing = await Listing.findById(id);
        // console.log(listing);

        if (!listing) {
            throw new ExpressError(404, "Listing Not Found");
        }
        res.render("listing/show.ejs", { listing });
    }),
);

// New Listing
app.post(
    "/listing",
    wrapAsync(async (req, res) => {

        const { error, value } = schema.validate(req.body);
        
        if (error) {
            throw new ExpressError(400, error.message);
        }
        const list = new Listing(req.body);
        list.save();

        res.redirect("/listing");
    }),
);

// Edit form
app.get(
    "/listing/:id/edit",
    wrapAsync(async (req, res) => {
        let { id } = req.params;

        let listing = await Listing.findById(id);

        res.render("listing/edit.ejs", { listing });
    }),
);

// Edit in DB
app.put(
    "/listing/:id",
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        let listing = req.body;
        console.log(id);
        console.log(listing);

        const newListing = await Listing.findByIdAndUpdate(id, listing);
        res.redirect(`/listing/${id}`);
    }),
);

// Destroy & delete from DB
app.delete(
    "/listing/:id",
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        
        let delData = await Listing.findByIdAndDelete(id);

        if (!delData) {
            throw new ExpressError(404, "Listing Not Found");
        }
        console.log(delData);
        res.redirect("/listing");
    }),
);

app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;

    // res.status(statusCode).send(message);
    console.log(err);
    res.status(statusCode).render("listing/error.ejs", {
        statusCode,
        message,
    });
});
