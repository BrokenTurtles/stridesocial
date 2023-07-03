import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//ENDPOINT  POST api/users
//PURPOSE   Register a new user
//ACCESS    Public
const registerUser = asyncHandler(async (req, res) => {
  console.log("RegUser hit!!!");
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const isValidEmail = email.match(/[\w\d]+@[a-z]+\.[\w]+$/gim);

  if (!isValidEmail) {
    res.status(400);
    throw new Error("Invalid email!");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    console.log("already exists?");
    res.status(400);
    //throw new Error("Invalid user data");
  }
});

//ENDPOINT  POST api/users/login
//PURPOSE   Authenticate User and get token
//ACCESS    Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  console.log(user);

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const addUserInterests = asyncHandler(async (req, res) => {
  // find user by email
  // interests should be an array
  const { email, interests } = req.body;

  const user = await User.findOne({ email: email });

  try {
    // add interests to user interests property
    user.interests.push(...interests);
    // save document
    user.save();
    res.status(200).json(user);
  } catch {
    res.status(401);
    throw new Error("Invalid email");
  }
});

export { registerUser, authUser, addUserInterests };
