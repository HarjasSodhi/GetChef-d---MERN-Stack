const express = require("express");
let authRouter = express.Router();
const userModel = require('../Models/userModel');
let jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../Secret');
const otpGenerator = require('otp-generator')
let { transporter, mailOptions } = require('../utilFunctions/Mailer');
let protectRoute = require('../utilFunctions/protectRoute');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { db_Link } = require('../Secret');


let login = async (req, res) => {
    try {
        if (req.body.email) {
            let user = await userModel.findOne({ email: req.body.email });
            if (user) {
                let result = await bcrypt.compare(req.body.password, user.password);
                if (result) {
                    let payload = user._id.valueOf()
                    let token = jwt.sign({ uid: payload }, JWT_KEY);
                    res.cookie("login", token, { expiresIn: '24h', httpOnly: true });
                    res.status(200).json({
                        message: "login succesfull",
                        user
                    })
                }
                else {
                    res.status(200).json({
                        message: "incorrect login details"
                    })
                }
            }
            else {
                res.status(200).json({
                    message: "incorrect login details"
                })
            }
        }
        else {
            res.status(400).json({
                message: "incorrect login details"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: "err " + err
        })
    }
}

let logout = (req, res) => {
    res.cookie("login", '', { expires: new Date(0) });
    res.status(200).json({
        message: "logged out"
    })
}

let signup = async (req, res) => {
    try {
        let temp = await userModel.find({ email: req.body.email });
        if (temp.length != 0) {
            return res.status(200).json({
                message: "id already exists"
            })
        }
        bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
            req.body.password = hash;
            let user = req.body;
            user = {
                ...user,
                createdAt: new Date().toISOString(),
                OTP: 0
            }
            user = await userModel.create(user);
            let payload = user._id.valueOf()
            let token = jwt.sign({ uid: payload }, JWT_KEY);
            res.cookie("login", token, { expiresIn: '24h', httpOnly: true });

            mailOptions = {
                ...mailOptions,
                to: req.body.email,
                subject: "Welcome to GetChef'd By Harjas Sodhi",
                text: 'Thanks for Signing Up'
            }
            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    res.status(500).json({
                        message: "err " + err
                    })
                } else {
                    res.status(200).json({
                        message: "user signed up",
                        user
                    })
                }
            });
        });
    }
    catch (err) {
        res.status(500).json({
            message: "err" + err
        })
    }
}

let forgotPassword = async (req, res) => {
    try {
        let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
        if (req.body.email) {
            let user = await userModel.findOne({ email: req.body.email });
            if (user) {
                user.OTP = otp;
                await user.save();
                mailOptions = {
                    ...mailOptions,
                    to: req.body.email,
                    subject: 'Reset Password For FoodApp By Harjas Sodhi',
                    text: 'The OTP for resetting your password is ' + otp
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
            else {
                res.status(200).json({
                    message: "incorrect email"
                })
            }
        }
        else {
            res.status(400).json({
                message: "email not found"
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "err " + err
        })
    }
}

let checkOTP = async (req, res, next) => {
    try {
        if (req.body.email) {
            let user = await userModel.findOne({ email: req.body.email });
            if (user) {
                if (req.params.otp == user.OTP && user.OTP != 0) {
                    next();
                }
                else {
                    res.status(200).json({
                        message: "incorrect OTP"
                    })
                }
            }
            else {
                res.status(200).json({
                    message: "incorrect email"
                })
            }
        }
        else {
            res.status(400).json({
                message: "email not found"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: "err " + err
        })
    }
}

let ChangePassword = async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.body.email });
        bcrypt.hash(req.body.newPassword, saltRounds, async function (err, hash) {
            req.body.newPassword = hash;
            user.password = req.body.newPassword;
            user.OTP = 0;
            let newUser = await user.save();
            res.status(200).json({
                message: "password Updated",
                newUser
            })
        });
    } catch (err) {
        res.status(500).json({
            message: "err " + err
        })
    }
}

let updatePassword = async (req, res) => {
    try {
        if (req.body.email) {
            let user = await userModel.findOne({ email: req.body.email });
            if (user) {
                const match = await bcrypt.compare(req.body.password, user.password);
                if (match) {
                    bcrypt.hash(req.body.newPassword, saltRounds, async function (err, hash) {
                        req.body.newPassword = hash
                        user.password = req.body.newPassword;
                        let newUser = await user.save();
                        res.status(200).json({
                            message: "password updated",
                            newUser
                        })
                    });
                }
                else {
                    res.status(200).json({
                        message: "old password is wrong"
                    })
                }
            }
            else {
                res.status(200).json({
                    message: "email does not exist"
                })
            }
        }
        else {
            res.status(400).json({
                message: "email not found"
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "err " + err
        })
    }
}

authRouter.route('/login').post(login);
authRouter.route('/logout').get(protectRoute, logout);
authRouter.route('/signup').post(signup);
authRouter.route('/forgotPass').post(forgotPassword);
authRouter.route('/forgotPass/:otp').post(checkOTP, ChangePassword);
authRouter.route('/updatePassword').post(protectRoute, updatePassword);


module.exports = authRouter;