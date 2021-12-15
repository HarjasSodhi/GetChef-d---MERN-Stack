const express = require("express");
let bookingRouter = express.Router();
const { getAllElements, updateElement, getElementById } = require('../utilFunctions/CRUD');
const protectRoute = require('../utilFunctions/protectRoute');
const userModel = require('../Models/userModel')
const planModel = require('../Models/planModel')
const bookingModel = require('../Models/bookingModel')
const CheckRole = require('../utilFunctions/roleChecker');
const Razorpay = require("razorpay");
const { razorSecret, razorId } = require('../Secret')
const instance = new Razorpay({ key_id: razorId, key_secret: razorSecret });
const otpGenerator = require('otp-generator')

bookingRouter.use(protectRoute);

let checkId = async (req, res, next) => {
    try {
        let myId = req.id;
        let bookingId = req.params.id;
        let booking = await bookingModel.findById(bookingId);
        if (booking) {
            if (booking.userId == myId) {
                next();
            }
            else {
                res.status(400).json({
                    message: "this is not your booking"
                })
            }
        }
        else {
            res.status(400).json({
                message: "booking id not found"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: "err " + err
        })
    }
}

let initiateBooking = async (req, res) => {
    try {
        let user = await userModel.findById(req.body.userId);
        let plan = await planModel.findById(req.body.planId);
        if (user && plan && user['_id'] == req.body.userId) {
            let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
            req.body.OTP = otp;
            let booking = await bookingModel.create(req.body);
            user.bookings.push(booking['_id']);
            let updatedUser = await user.save();


            var instanceOptions = {
                amount: req.body.buyingPrice * 100,  // amount in the smallest currency unit
                currency: "INR",
                receipt: otp
            };

            instance.orders.create(instanceOptions, function (err, order) {
                let orderOptions = {
                    "key": razorId, // Enter the Key ID generated from the Dashboard
                    "amount": req.body.buyingPrice * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                    "currency": "INR",
                    "name": "FoodApp By Harjas Sodhi",
                    "description": "Plan Payment",
                    "image": "https://i.ibb.co/TH1mZz0/food-App-Logo.png",
                    "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the previous step
                    "handler": function (response) {
                        alert(response.razorpay_payment_id);
                        alert(response.razorpay_order_id);
                        alert(response.razorpay_signature)
                    },
                    "theme": {
                        "color": "#3399cc"
                    }
                }
                res.status(200).json({
                    message: "booking started",
                    updatedUser,
                    booking,
                    orderOptions,
                    order
                })
            });
        }
        else {
            res.status(400).json({
                message: "either plan/user not found or this is not your id"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: "err " + err
        })
    }
}

let deleteBooking = async (req, res) => {
    try {
        let { id } = req.params;
        let booking = await bookingModel.findByIdAndDelete(id);
        if (booking) {
            let user = await userModel.findById(booking["userId"]);
            let idx = user.bookings.indexOf(id);
            user.bookings.splice(idx, 1);
            let updatedUser = await user.save();
            res.status(200).json({
                message: "booking deleted",
                updatedUser
            })
        }
        else {
            res.status(404).json({
                message: "booking not found"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: "err " + err
        })
    }
}

let getBookingByID = async (req, res) => {
    try {
        let { id } = req.params
        let booking = await bookingModel.findById(id).populate({
            path: 'planId',
            select: 'image name'
        })
        res.status(200).json({
            booking
        })
    }
    catch (err) {
        res.status(500).json({
            message: "err " + err
        })
    }
}

bookingRouter.route('/')
    .get(CheckRole(['admin', 'ce']), getAllElements(bookingModel))
    .post(initiateBooking)

bookingRouter.route('/:id')
    .get(checkId, getBookingByID)
    .patch(CheckRole(['admin', 'ce']), updateElement(bookingModel))
    .delete(deleteBooking);


module.exports = bookingRouter