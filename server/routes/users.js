const express = require("express");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const { User, Settings, validateUser } = require("../models/user_model");
const auth = require("../middleware/auth");

const router = express.Router();

//GET
router.get("/me", async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

//POST
//signup
router.post("/sign_up", async (req, res) => {
  console.log(req.body);
  //validate req
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //check if user doesn't exist
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) return res.status(400).send("User already exists");
  //create a new user
  let user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    settings: new Settings({
      darkTheme: false,
    }),
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  //send response
  const token = user.generateAuthToken();
  res.send({
    firstName: user.firstName,
    lastName: user.lastName,
    id: user._id,
    email: user.email,
    settings: user.settings,
    token,
  });
});

//login
router.post("/login", async (req, res) => {
  //validate user input
  const { error } = validateLoginCredentials(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //check if user exists in database
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json("Invalid email or password");
  }
  //compare password input with password on DB
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");
  const token = user.generateAuthToken();
  res.send({
    name: user.name,
    email: user.email,
    _id: user._id,
    settings: user.settings,
    token,
  });
});

//change theme
router.patch("/theme", auth, async (req, res) => {
  //find user
  const user = await User.findById(req.user._id);
  user.settings.darkTheme = !user.settings.darkTheme;
  const result = await user.save();
  res.send(result.settings.darkTheme);
});

const validateLoginCredentials = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(8).max(255).email().required(),
    password: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(data);
};

module.exports = router;
