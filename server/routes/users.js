var express = require('express');
const {
  registerUser,
  loginUser,
} = require("../Controllers/userControllers");
const { verifyToken } = require('../Middlewares/jwtVerification');
var router = express.Router();


/* GET users listing. */
router.post("/login",loginUser); 

router.post("/signup", registerUser);



module.exports = router;
