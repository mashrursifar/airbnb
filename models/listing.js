const { ref } = require("joi");
const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        filename: String,
        url: {
            type: String,
            default:
                "https://images.unsplash.com/photo-1550345283-f456c85af8d1?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            set: (v) =>
                v === ""
                    ? "https://images.unsplash.com/photo-1550345283-f456c85af8d1?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    : v,
        },
    },
    price: {
        type: Number,
        default: 0,
        set: (v) => (v === "" ? 0 : v),
    },
    location: String,
    country: String,
    review: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ]
});
listingSchema.post("findOneAndDelete", async (listing)=>{
    
    if(listing){
        await Review.deleteMany({_id: {$in: listing.review}})
    }
})
const Listing = mongoose.model("Listing", listingSchema);


module.exports = Listing;
