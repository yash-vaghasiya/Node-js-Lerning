const express = require("express");
const router = express.Router();
const userController = require("../controller/controller.js")
const loginController = require("../controller/loginController.js");
const { checkuserauth } = require("../Middleware/authMiddleware.js");

router.use("/loged", checkuserauth);

router.get("/loged", loginController.logeduser);
router.get("/mongodb", userController.getMongodbUser);
router.post("/post", userController.validator, userController.postAllData);
router.get("/mongodb/:userId", userController.getUserById);
router.put("/user/:userId", userController.updateUserId);
router.delete("/user/:userId", userController.deleteUserbyId);
router.post("/login", loginController.validator, loginController.loginUser);

module.exports = router;
