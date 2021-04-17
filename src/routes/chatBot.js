const {Router} = require('express');
const {isAuth, isAdmin} = require("../middlewares/authentication");
const chatBotCtrl = require('../controllers/chatBot');

const router = Router();

// TODO change the permission to the outside scope

router.get('/', isAuth(), isAdmin(), chatBotCtrl.getBotMessages);

router.post('/', isAuth(), isAdmin(), chatBotCtrl.addBotMessages);

router.delete('/:id', isAuth(), isAdmin(), chatBotCtrl.deleteBotMessage);

module.exports = router;