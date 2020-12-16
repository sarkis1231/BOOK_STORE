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

module.exports = {alert,somethingWentWrong};