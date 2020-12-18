const {Router} = require('express');

const UserValidation = require("../validations/users");
const {paramIdValidation} =  require("../validations/general");

const {login,register,editUser,deleteUser} = require("../controllers/users");

const {isAuth,isAdmin} = require("../middlewares/authentication");


const router = Router();

router.put("/register", UserValidation.register, register);

router.post("/login", UserValidation.login,login);

router.put('/:id',isAuth(),isAdmin(),paramIdValidation,UserValidation.edit,editUser);

router.delete('/:id',isAuth(),isAdmin(),paramIdValidation,deleteUser);

module.exports = router;