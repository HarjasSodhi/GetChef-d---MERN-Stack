const mongoose = require('mongoose');

let reviewSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, "please provide text"]
    },
    rating: {
        type: Number,
        required: [true, "please provide rating"],
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        required: [true, "please provide a user id"],
        ref: "userModel"
    },
    planId: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'please provide a plan id'],
        ref: "planModel"
    }
});

let reviewModel = mongoose.model("reviewModel", reviewSchema);
module.exports = reviewModel;