const {Router} = require('express');
const {isAdmin} = require("../middlewares/authentication");
const chatBotCtrl = require('../controllers/chatBot');
const chatBotValidation = require("../validations/chatBot");
const {paramIdValidation} = require("../validations/general");

const router = Router();

// TODO change the permission to the outside scope

router.get('/', isAdmin(), chatBotCtrl.getBotMessages);

router.post('/', chatBotValidation.add, chatBotCtrl.addBotMessages);

router.delete('/:id', isAdmin(), paramIdValidation, chatBotCtrl.deleteBotMessage);

module.exports = router;