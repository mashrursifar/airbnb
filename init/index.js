const mongoose = require("mongoose");
const data = require("./data");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

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
    const user = await User.findOne({username: "mashrur_sifar"})
    // console.log(user);
    const updatedData = data.data.map((listing)=>({...listing,owner: user._id}))
    console.log("Data = ",updatedData);
    await Listing.insertMany(updatedData);
}

initDB();