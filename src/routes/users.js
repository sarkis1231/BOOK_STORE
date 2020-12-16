const {Router} = require('express');

const {login,register,editUser,deleteUser} = require("../controllers/users");
const {paramIdValidation} =  require("../validations/general");

const {isAuth,isAdmin} = require("../middlewares/authentication");

const {registerValidation,loginValidation,editUserValidation} = require("../validations/users");


const router = Router();

router.put("/register", registerValidation, register);

router.post("/login", loginValidation,login);

router.put('/:id',isAuth(),isAdmin(),paramIdValidation,editUserValidation,editUser);

router.delete('/:id',isAuth(),isAdmin(),paramIdValidation,deleteUser);

module.exports = router;