const express = require("express");
const bcrypt = require("bcrypt");

const { User, validateUser } = require("../models/user_model");

const router = express.Router();

//GET
router.get("/", async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

//POST
router.post("/sign_up", async (req, res) => {
  //validate req
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //check if user doesn't exist
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) return res.status(400).send("User already exists");
  //create a new user
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  //send response
  const token = user.generateAuthToken();

  res.header("x-auth-token", token).send({
    name: user.name,
    id: user._id,
    email: user.email,
  });
});

//PUT
//DELETE

module.exports = router;
