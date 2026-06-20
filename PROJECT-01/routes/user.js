const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

// GET ALL USERS & CREATE USER
router.route("/")
    .get(userController.getAllUsers)
    .post(userController.createUser);

// GET, UPDATE, DELETE USER BY ID
router.route("/:id")
    .get(userController.getUserById)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;