const express = require("express");
const router = express.Router();
const userController = require("../controller/controller.js")

router.get("/mongodb",userController.getMongodbUser);
router.post("/post",userController.postAllData);
router.get("/mongodb/:userId",userController.getUserById);
router.put("/user/:id",userController.updatedata);

module.exports = router;
