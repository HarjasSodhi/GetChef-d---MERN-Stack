const userModel=require("../Models/userModel");

let CheckRole = (roles) => {
    return async (req, res, next) => {
        try {
            let user = await userModel.findById(req.id);
            if (roles.includes(user.role)) {
                next();
            }
            else {
                res.status(400).json({
                    message: "operation not allowed to you"
                })
            }
        } catch (err) {
            res.status(500).json({
                message: "err " + err
            })
        }
    }
}

module.exports = CheckRole;