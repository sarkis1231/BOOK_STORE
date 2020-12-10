const passport =  require("passport");

export function isAuth() {
    return passport.authenticate("jwt", {
        session: false
    },function (){});
}

export function isAuthorized(whiteList) {
    return function (req, res,next)  {
        if(whiteList.includes(req.user["role"])) {
            return next();
        }
        res.status(401).json({
            status:401,
            message:"UnAuthorised"
        });
    }
}

export function NotAuthorized(blackList) {
    return function (req, res, next)  {
        if(blackList.includes(req.user["role"])) {
            return res.status(401).json({
                status:401,
                message:"UnAuthorised"
            });
        }
        next();
    }
}