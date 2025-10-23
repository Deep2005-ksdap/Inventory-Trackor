const express = require("express");
// local module
const homeController = require("../controller/home.controller");
const { authenticateUser } = require("../middleware/authMiddleware");

const homeRouter = express.Router();

homeRouter.get("/dashboard", authenticateUser, homeController.getDashboard);
homeRouter.post("/add-item", authenticateUser, homeController.postStock);
homeRouter.delete(
  "/delete-item/:id",
  authenticateUser,
  homeController.deleteStock
);
homeRouter.patch(
  "/edit-item/:stockId",
  authenticateUser,
  homeController.editStock
);

module.exports = homeRouter;
