var express = require("express");
const {
  getUsers,
  updateUser,
  deleteUser,
  loginAdmin,
} = require("../Controllers/adminControllers");
const { verifyToken } = require("../Middlewares/jwtVerification");
var router = express.Router();




router.post("/login", loginAdmin);

router.get("/users",verifyToken, getUsers);

router.post("/update",verifyToken, updateUser);

router.post("/delete",verifyToken, deleteUser);

module.exports = router;