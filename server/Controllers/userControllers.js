const asyncHandler = require("express-async-handler");
const { User } = require("../Models/User");
const bcrypt = require("bcryptjs");


//user signup

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, profession, phone } = req.body;

  if (!name || !email || !password || !profession || !phone) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: "user already exists", status: false });
    console.log("error checked");
    // throw new Error("User already exists");
  } else {
    // Hash password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create User

    const user = await User.create({
      name,
      email,
      profession,
      phone,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        name: user.name,
        email: user.email,
        _id: user._id,
        status: true,
        message: "account created successfully",
      });
    } else {
      res.status(400);
      throw new Error("invalid user details");
    }
  }
});





//user login

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(password)

  if (user && (await bcrypt.compare(password, user.password))) {
    res.send({
      name: user.name,
      email: user.email,
      _id: user._id,
      status: true,
    });
  } else {
    res.status(400).json({ message: "invalid credentials", status: false });
    throw new Error("invalid  details");
  }
});




//get all users

const getUsers = asyncHandler(async (req, res) => {
  
  const users = await User.findOne();

  if (users) {
    res.send([users]);
  } else {
    res.status(500).json({ message: "something went wrong", status: false });
    throw new Error("invalid  details");
  }
});



//delete user
const deleteUser = asyncHandler(async (req, res) => {
  console.log(req.body)
  const users = await User.deleteOne({_id:req.body._id});
  
  if (users) {
    res.json(users);
  } else {
    res.status(500).json({ message: "something went wrong", status: false });
    throw new Error("invalid  details");
  }
});



//user details update

const updateUser = asyncHandler(async (req, res) => {
  
  const user = await User.findOne({ _id: req.body._id });
  
  let check = await bcrypt.compare(req.body.password, user.password)

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
      console.log(data)
    })

  } else {
    res.status(500).json({ message: "something went wrong", status: false });
    throw new Error("invalid  details");
  }
});




module.exports = {
  registerUser,
  loginUser,
  getUsers,
  deleteUser ,
  updateUser,
};
