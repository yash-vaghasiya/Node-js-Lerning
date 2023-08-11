const express = require("express");
const router = express.Router();
const userController = require("../controller/controller.js")

router.get("/mysql",userController.getMysqlUser);
router.get("/mongodb",userController.getMongodbUser);

module.exports = router;
