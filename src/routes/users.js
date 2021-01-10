const {Router} = require('express');

const UserValidation = require("../validations/users");
const {paramIdValidation} =  require("../validations/general");

const {login,register,editUser,deleteUser,getUser,getUsers} = require("../controllers/users");

const {isAuth,isAdmin} = require("../middlewares/authentication");


const router = Router();

router.put("/register", UserValidation.register, register);

router.post("/login", UserValidation.login,login);

router.get("/all", isAuth(),isAdmin(),getUsers);

router.get("/:id",isAuth(),isAdmin(),paramIdValidation,getUser);

router.put('/:id',isAuth(),isAdmin(),paramIdValidation,UserValidation.edit,editUser);

router.delete('/:id',isAuth(),isAdmin(),paramIdValidation,deleteUser);

module.exports = router;