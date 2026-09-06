const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    gmail: String,
    name: String,
});

const User = mongoose.model("User", userSchema);

let sample = new User({
    username: "mashrursifar",
    gmail: "mashrursifar@gmail.com",
    name: "Mashrur Sifar"
});

await sample.save()