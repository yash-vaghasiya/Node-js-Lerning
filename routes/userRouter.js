const express = require("express");
const router = express.Router();
const userController = require("../controller/controller.js")
const loginController = require("../controller/loginController.js");

router.get("/mongodb",userController.getMongodbUser);
router.post("/post",userController.validator,userController.postAllData);
router.get("/mongodb/:userId",userController.getUserById);
router.put("/user/:userId",userController.updateUserId);
router.delete("/user/:userId",userController.deleteUserbyId);
router.post("/login",loginController.loginUser);

module.exports = router;
