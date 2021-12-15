const { JWT_KEY } = require('../Secret')
let jwt = require('jsonwebtoken');

let protectRoute = (req, res, next) => {
    try {
        if (req.cookies.login) {
            let decoded = jwt.verify(req.cookies.login, JWT_KEY);
            if (decoded) {
                req.id = decoded.uid
                next();
            }
            else {
                res.cookie("login", '', { expires: new Date(0) });
                res.status(200).json({
                    AuthorizationNeeded: true
                });
            }
        }
        else {
            res.status(200).json({
                AuthorizationNeeded: true
            });
        }
    }
    catch (err) {
        res.status(500).json({
            message: "err " + err
        })
    }
}

module.exports = protectRoute;