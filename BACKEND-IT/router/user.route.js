const express = require("express");
const userRouter = express.Router();

const userModel = require("../model/user.model");

const userController = require("../controller/user.controller");
const { authenticateUser } = require("../middleware/authMiddleware");

userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.get("/logout", userController.logoutUser);
userRouter.get("/check-auth", authenticateUser, async(req, res) => {
  const userName = await userModel.User
  .findById(req.user.userId)
  .select("fullname.firstname");

  res.status(200).json({ success: true, user: req.user , userName: req.user, userName});
});

module.exports = userRouter;
