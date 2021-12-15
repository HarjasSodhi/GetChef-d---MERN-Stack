const express = require("express");
let verificationRouter = express.Router();
const bookingModel = require('../Models/bookingModel')
let { transporter, mailOptions } = require('../utilFunctions/Mailer');

let verifyPayment = async (req, res) => {
    try {
        let booking = await bookingModel.findById(req.body.id);
        if (booking) {
            booking.status = 'success'
            let newBooking = await booking.save();
            mailOptions = {
                ...mailOptions,
                to: req.body.email,
                subject: "Order Confirmation at GetChef'd By Harjas Sodhi",
                text: 'Thank You for Placing an Order. Your Order id is ' + req.body.id
            }
            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    res.status(500).json({
                        message: "err " + err
                    })
                } else {
                    res.status(200).json({
                        message: "booking confirmed",
                        newBooking
                    })
                }
            });
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

verificationRouter.route('/').post(verifyPayment);


module.exports = verificationRouter;