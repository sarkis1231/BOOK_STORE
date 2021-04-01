const {Router} = require('express');

const PermissionCtrl = require("../controllers/permission");

const {isAuth, isAdmin} = require("../middlewares/authentication");


const router = Router();

router.get("/", isAuth(), isAdmin(), PermissionCtrl.getPermissions);

router.get("/:id", isAuth(), isAdmin(), PermissionCtrl.getPermission);

module.exports = router;