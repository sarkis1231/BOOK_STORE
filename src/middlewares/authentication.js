const passport =  require("passport");
const {USER_ROLES} = require("../roles");
const {MESSAGES} = require("../utility/constants");

function isAuth() {
    return passport.authenticate("jwt", {
        session: false
    });
}

function isAuthorized(whiteList) {
    return function (req, res,next)  {
        let authorized;
        if(Array.isArray(whiteList)) {
            authorized = whiteList.includes(req.user["role"]);
        } else {
            authorized = whiteList === req.user["role"];
        }

        if(authorized) {
            return next();
        }

        res.status(401).json({
            status:401,
            message:MESSAGES.UNAUTHORISED
        });
    }
}

function NotAuthorized(blackList) {
    return function (req, res, next)  {
        let notAuthorized;
        if(Array.isArray(blackList)) {
            notAuthorized = blackList.includes(req.user["role"]);
        } else {
            notAuthorized = blackList === req.user["role"];
        }

        if(notAuthorized) {
            return res.status(401).json({
                status:401,
                message:MESSAGES.UNAUTHORISED
            });
        }

        next();
    }
}

function isAdmin(){
    return isAuthorized(USER_ROLES.Admin);
}

module.exports = {NotAuthorized,isAuth,isAuthorized,isAdmin}