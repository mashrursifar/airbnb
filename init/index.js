const mongoose = require("mongoose");
const data = require("./data");
const Listing = require("../models/listing.js");

main()
    .then(() => {
        console.log("DB connection established");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

// console.log(data.data);

const initDB = async ()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(data.data);
}

initDB();