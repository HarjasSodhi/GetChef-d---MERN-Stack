const express = require('express');
const planRouter = express.Router();
const protectRoute = require('../utilFunctions/protectRoute');
const CheckRole = require('../utilFunctions/roleChecker');
const planModel = require('../Models/planModel')
const { updateElement, deleteElement, createElement } = require('../utilFunctions/CRUD');

let getTop3Plans = async (req, res) => {
    try {
        let plans = planModel.find();
        plans = plans.sort('-rating');
        plans = plans.limit(3);
        plans = await plans;
        res.status(200).json({
            plans
        })
    }
    catch (err) {
        res.status(500).json({
            message: "err " + err
        })
    }

}

let getLength = async (req, res) => {
    try {
        let allPlans = await planModel.find();
        res.status(200).json({
            length: allPlans.length
        })
    }
    catch (err) {
        res.status(500).json({
            message: "err " + err
        })
    }
}

planRouter.route('/getBestsellers').get(getTop3Plans);
planRouter.route('/getLength').get(getLength);

planRouter.use(protectRoute);

let getAllPlans = async (req, res) => {
    try {
        let plans = planModel.find();

        if (req.query.sort) {
            plans = plans.sort(req.query.sort)
        }

        if (req.query.select) {
            let str = req.query.select.split("%").join(" ");
            plans = plans.select(str);
        }

        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 3;
        let toSkip = (page - 1) * limit;
        plans = plans.skip(toSkip).limit(limit);
        plans = await plans;
        res.status(200).json({
            plans
        })
    }
    catch (err) {
        res.status(500).json({
            message: "err " + err
        })
    }
}

let getPlanById = async (req, res) => {
    try {
        let plan = await planModel.findById(req.params.id)
        res.status(200).json({
            plan
        })
    }
    catch (err) {
        res.status(500).json({
            message: "err " + err
        })
    }
}

planRouter.route('/')
    .get(getAllPlans)
    .post(CheckRole(["admin"]), createElement(planModel))

planRouter.route('/:id')
    .get(getPlanById)
    .patch(CheckRole(["admin", "ce"]), updateElement(planModel))
    .delete(CheckRole(["admin"]), deleteElement(planModel))


module.exports = planRouter;