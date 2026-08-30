const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

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

app.get("/listing", async (req, res) => {
    const allListings = await Listing.find({});

    res.render("listing/listing.ejs", { allListings });
});

app.get("/listing/new", (req, res) => {
    res.render("listing/new.ejs");
});

// Create route
app.get("/listing/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    // console.log(listing);
    res.render("listing/show.ejs", { listing });
});

// New Listing 
app.post("/listing", async (req, res) => {
    // let listing = req.body;
    const list = new Listing(req.body);
    list.save();

    res.redirect("listing");
});

// Edit form
app.get("/listing/:id/edit", async (req, res) => {
    let { id } = req.params;

    let listing = await Listing.findById(id);

    res.render("listing/edit.ejs", { listing });
});

// Edit in DB
app.put("/listing/:id", async (req, res) => {
    let { id } = req.params;
    let listing = req.body;
    console.log(id);
    console.log(listing);

    const newListing = await Listing.findByIdAndUpdate(id, listing);
    res.redirect("/listing");
});

// Destroy & delete from DB
app.delete("/listing/:id", async (req, res) => {
    let { id } = req.params;

    let delData = await Listing.findByIdAndDelete(id);
    console.log(delData);
    res.redirect("/listing");
});
