const {Router} = require('express');
const {isAuth, isAdmin} = require("../middlewares/authentication");
const chatBotCtrl = require('../controllers/chatBot');
const chatBotValidation = require("../controllers/chatBot");
const {paramIdValidation} = require("../validations/general");

const router = Router();

// TODO change the permission to the outside scope

router.get('/', isAuth(), isAdmin(), chatBotCtrl.getBotMessages);

router.post('/', isAuth(), isAdmin(), chatBotValidation.addBotMessages, chatBotCtrl.addBotMessages);

router.delete('/:id', isAuth(), isAdmin(), paramIdValidation, chatBotCtrl.deleteBotMessage);

module.exports = router;