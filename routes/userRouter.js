const express = require("express");
const router = express.Router();
const userController = require("../controller/controller.js")

router.get("/mysql",userController.getMysqlUser);
router.get("/mongodb",userController.getMongodbUser);
router.post("/post",userController.postMongodbUser);
router.post("/postmysql",userController.postmysqlUser);
router.put("/mongodb/:id",userController.edituser);

module.exports = router;
