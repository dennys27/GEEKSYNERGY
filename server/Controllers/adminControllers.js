const asyncHandler = require("express-async-handler");
const { Admin } = require("../Models/Admin");
const { User } = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//admin login

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await Admin.findOne({ email });
  console.log(password);
      const token = await jwt.sign(
        { userId: user._id },
        process.env.JWTPRIVATEKEY,
        { expiresIn: "7d" }
      );


  if (user && (await bcrypt.compare(password, user.password))) {
    res.send({
      email: user.email,
      _id: user._id,
      status: true,
      token
    });
  } else {
    res.status(400).json({ message: "invalid credentials", status: false });
    throw new Error("invalid  details");
  }
});

//get all users

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  if (users) {
    res.send(users);
  } else {
    res.status(401).json({ message: "something went wrong", status: false });
  }
});

//delete user
const deleteUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const user = await User.deleteOne({ _id: req.body._id });

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(401).json({ message: "something went wrong", status: false });
  }
});

//user details update

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.body._id });

  let check = await bcrypt.compare(req.body.password, user.password);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  if (user) {
    await User.updateOne(
      { _id: req.body._id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          profession: req.body.profession,
          password: check ? req.body.password : hashedPassword,
        },
      }
    ).then((data) => {
      res.status(200).json(data);
    });
  } else {
    res.status(500).json({ message: "something went wrong", status: false });
  }
});

module.exports = {
  loginAdmin,
  getUsers,
  deleteUser,
  updateUser,
};
