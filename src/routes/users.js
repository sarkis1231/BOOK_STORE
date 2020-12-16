const {paramIdValidation} =  require("../validations/general");

const {login,register,editUser,deleteUser} = require("../controllers/users");
const {Router} = require('express');

const {isAuth,isAuthorized} = require("../middlewares/authentication");

const {registerValidation,loginValidation,editUserValidation} = require("../validations/users");


const router = Router();

router.put("/register", registerValidation, register);

router.post("/login", loginValidation,login);

router.put('/:id',paramIdValidation,editUserValidation,editUser);

router.delete('/:id',paramIdValidation,deleteUser);

module.exports = router;