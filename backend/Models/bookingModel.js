const mongoose = require('mongoose');

let bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "userModel",
        required: true
    },
    planId: {
        type: mongoose.Schema.ObjectId,
        ref: "planModel",
        required: true,

    },
    buyingPrice: {
        required: true,
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["failed", "success", "pending"],
        required: true,
        default: "pending"
    },
    OTP: {
        type: String
    }
})

let bookingModel = mongoose.model("bookingModel", bookingSchema);
module.exports = bookingModel;