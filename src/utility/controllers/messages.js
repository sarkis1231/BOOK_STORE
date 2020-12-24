const {MESSAGES} = require("../constants");

function alert(res, status, type, message) {
    res.status(status).json({
        alert: type,
        message: message
    });
}

function somethingWentWrong(res) {
    res.status(500).json({
        message:MESSAGES.SOMETHING_WENT_WRONG
    });
}

function noResult(res) {
     res.status(200).json({empty: true});
 }

module.exports = {alert,somethingWentWrong,noResult};