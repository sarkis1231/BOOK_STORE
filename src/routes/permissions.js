const {Router} = require('express');

const PermissionCtrl = require("../controllers/permission");

const {isAuth, isAdmin} = require("../middlewares/authentication");


const router = Router();

router.get("/", isAdmin(), PermissionCtrl.getPermissions);

router.get("/:id", isAdmin(), PermissionCtrl.getPermission);

module.exports = router;