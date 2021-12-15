const express = require('express');
const userModel = require('../Models/userModel');
const userRouter = express.Router();
const protectRoute = require('../utilFunctions/protectRoute');
const CheckRole = require('../utilFunctions/roleChecker');
const { getElementById, getAllElements, updateElement, deleteElement, createElement } = require('../utilFunctions/CRUD');
const bcrypt = require('bcrypt');
const saltRounds = 10;

userRouter.use(protectRoute);

let addDetails = (req, res, next) => {
    req.body = {
        ...req.body,
        createdAt: new Date().toISOString(),
        OTP: 0
    }
    next();
}

let passwordCheck = (req, res, next) => {
    if (req.body.password) {
        res.status(400).json({
            message: "cannot update password. Use reset password option"
        });
    }
    else {
        next();
    }
}

let checkId = (req, res, next) => {
    try {
        let myId = req.id;
        let userId = req.params.id;
        if (userId == myId) {
            next();
        }
        else {
            res.status(400).json({
                message: "this is not your account you are trying to update"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: "err " + err
        })
    }
}

let checkRoleUpdate = (req, res, next) => {
    if (req.body.role) {
        res.status(400).json({
            message: "you cannot change your role"
        })
    }
    else {
        next();
    }
}

let hashPassword = (req, res, next) => {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        req.body.password = hash;
        next();
    });
}

userRouter.route('/')
    .get(CheckRole(["admin"]), getAllElements(userModel))
    .post(CheckRole(["admin", "ce"]), addDetails, hashPassword, createElement(userModel))

userRouter.route('/:id')
    .get(checkId, getElementById(userModel))
    .patch(checkId, passwordCheck, checkRoleUpdate, updateElement(userModel))
    .delete(checkId, deleteElement(userModel))


module.exports = userRouter