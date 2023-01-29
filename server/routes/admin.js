var express = require("express");
const {
  getUsers,
  updateUser,
  deleteUser,
  loginAdmin,
} = require("../Controllers/adminControllers");
var router = express.Router();




router.post("/login", loginAdmin);

router.get("/users", getUsers);

router.post("/update", updateUser);

router.post("/delete", deleteUser);

module.exports = router;