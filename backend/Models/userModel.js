const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: String
    },
    OTP: {
        type: String
    },
    role: {
        type: String,
        enum: ["admin", "ce", "user"],
        default: "user"
    },
    bookings: {
        type: [mongoose.Schema.ObjectId],
        ref: "bookingModel"
    },
    address: {
        type: String,
        required: true
    }
});

let userModel = mongoose.model('userModel', userSchema);
module.exports = userModel;