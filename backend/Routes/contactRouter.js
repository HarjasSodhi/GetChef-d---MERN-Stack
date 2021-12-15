const express = require('express');
const contactRouter = express.Router();
let { transporter, mailOptions } = require('../utilFunctions/Mailer');
const { Mail_Pass, Mail_id, myEmail } = require('../Secret')

let sendMail = async (req, res) => {
    try {
        if (!req.body.name || !req.body.email || !req.body.message) res.status(404).json({
            message: "send all deets"
        })
        mailOptions = {
            ...mailOptions,
            to: myEmail,
            subject: 'Query',
            text: `
                        name - ${req.body.name}
                        email - ${req.body.email}
                        message - ${req.body.message}
                    `
        }
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                res.status(500).json({
                    message: "err " + err
                })
            } else {
                res.status(200).json({
                    message: "Mail Sent"
                })
            }
        });
    }
    catch (err) {
        res.status(500).json({
            message: "err " + err
        })
    }
}

contactRouter.route('/').post(sendMail);

module.exports = contactRouter;