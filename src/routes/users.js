const {Router} = require('express');

const UserValidation = require("../validations/users");
const {paramIdValidation} = require("../validations/general");

const UserCtrl = require("../controllers/users");

const {isAuth, isAdmin} = require("../middlewares/authentication");


const router = Router();

router.put("/register", UserValidation.register, UserCtrl.register);

router.post("/login", UserValidation.login, UserCtrl.login);

router.get("/all", isAuth(), isAdmin(), UserCtrl.getUsers);

router.get("/:id", isAuth(), isAdmin(), paramIdValidation, UserCtrl.getUser);

router.put('/:id', isAuth(), isAdmin(), UserValidation.edit, UserCtrl.editUser);

router.put('/:id', isAuth(), isAdmin(), UserValidation.editUserPermission, UserCtrl.editUserPermission);

router.delete('/:id', isAuth(), isAdmin(), paramIdValidation, UserCtrl.deleteUser);

module.exports = router;