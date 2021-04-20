const {Router} = require('express');
const {isAuth, isAdmin} = require("../middlewares/authentication");
const chatBotCtrl = require('../controllers/chatBot');
const chatBotValidation = require("../validations/chatBot");
const {paramIdValidation} = require("../validations/general");

const router = Router();

// TODO change the permission to the outside scope

router.get('/', isAuth(), isAdmin(), chatBotCtrl.getBotMessages);

router.post('/', isAuth(), chatBotValidation.add, chatBotCtrl.addBotMessages);

router.delete('/:id', isAuth(), isAdmin(), paramIdValidation, chatBotCtrl.deleteBotMessage);

module.exports = router;