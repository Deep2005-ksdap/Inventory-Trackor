const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/user.controller");

userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.get("/logout", userController.logoutUser);

module.exports = userRouter;
