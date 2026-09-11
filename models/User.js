const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const schema = mongoose.Schema;

const userSchema = {
    email: {
        type: String,
        required: true,
    },
};

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
