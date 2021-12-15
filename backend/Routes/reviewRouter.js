const express = require("express");
let reviewRouter = express.Router();
const protectRoute = require('../utilFunctions/protectRoute');
const CheckRole = require('../utilFunctions/roleChecker');
const reviewModel = require('../Models/reviewModel')
const planModel = require('../Models/planModel')
const { getAllElements } = require('../utilFunctions/CRUD');


reviewRouter.use(protectRoute);


let checkId = async (req, res, next) => {
    try {
        let myId = req.id;
        let reviewId = req.params.id;
        let review = await reviewModel.findById(reviewId);
        if (review) {
            if (review.userId == myId) {
                next();
            }
            else {
                res.status(400).json({
                    message: "this is not your review"
                })
            }
        } 
        else {
            res.status(400).json({
                message: "review id not found"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: "err " + err
        })
    }
}

let createReview = async (req, res) => {
    try {
        let plan = await planModel.findById(req.body.planId);
        if (plan) {
            let review = await reviewModel.create(req.body);
            let len = plan.reviews.length;
            plan.reviews.push(review["_id"]);
            plan.rating = ((plan.rating * len) + req.body.rating) / (len + 1);
            let updatedPlan = await plan.save();
            res.status(200).json({
                updatedPlan
            })
        }
        else {
            res.status(404).json({
                message: "plan not found"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: "err " + err
        })
    }
}

let deleteReview = async (req, res) => {
    try {
        let { id } = req.params
        let review = await reviewModel.findByIdAndDelete(id);
        if (review) {
            let plan = await planModel.findById(review.planId);
            let idx = plan.reviews.indexOf(review['_id']);
            let len = plan.reviews.length;
            plan.reviews.splice(idx, 1);
            if (len > 1) {
                plan.rating = ((plan.rating * len) - review.rating) / (len - 1);
            }
            else {
                plan.rating = 0;
            }
            let updatedPlan = await plan.save();
            res.status(200).json({
                updatedPlan
            })
        }
        else {
            res.status(404).json({
                message: "review not found"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: "err " + err
        })
    }
}

let updateReview = async (req, res) => {
    try {
        let { id } = req.params
        let review = await reviewModel.findById(id);
        let oldrating = review.rating;
        delete req.body.userId
        delete req.body.planId
        if (review) {
            for (key in req.body) {
                review[key] = req.body[key]
            }
            let updatedReview = await review.save();
            let plan = await planModel.findById(updatedReview["planId"]);
            let len = plan.reviews.length;
            plan.rating = ((plan.rating * len) + updatedReview.rating - oldrating) / len;
            let updatedPlan = await plan.save();
            res.status(200).json({
                updatedPlan
            })
        }
        else {
            res.status(404).json({
                message: "review not found"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: "err " + err
        })
    }
}

let getReviewById = async (req, res) => {
    try {
        let review = await reviewModel.findById(req.params.id).populate({
            path: "userId",
            select: "name _id"
        });
        res.status(200).json({
            review
        })
    }
    catch (err) {
        res.status(500).json({
            message: "err " + err
        })
    }
}

reviewRouter.route('/')
    .get(CheckRole(["admin", "ce"]), getAllElements(reviewModel))
    .post(createReview)

reviewRouter.route('/:id')
    .get(getReviewById)
    .patch(checkId, updateReview)
    .delete(checkId, deleteReview)


module.exports = reviewRouter;