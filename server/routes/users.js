//package imports
const fs = require("fs");
const express = require("express");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const multer = require("multer");
//my imports
const { User, Settings, validateUser } = require("../models/user_model");
const auth = require("../middleware/auth");
const { Invoice } = require("../models/invoice_model");

//initialize packages
const router = express.Router();

//configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // if(fs.exists("./uploads"))
    cb(null, `./uploads`);
    // cb(null, `./uploads/${req.user._id}`);
  },
  filename: function (req, file, cb) {
    // cb(null, new Date().toISOString() + file.originalname);
    // cb(null, new Date().toDateString() + file.originalname);
    cb(null, file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

//GET
router.get("/me", async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

//POST
//signup
router.post("/sign_up", async (req, res) => {
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
  if (!validPassword) return res.status(400).json("Invalid email or password");
  const token = user.generateAuthToken();
  res.json({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    _id: user._id,
    settings: user.settings,
    token,
  });
});

//add avatar
router.post("/add_avatar", auth, upload.single("file"), async (req, res) => {
  console.log(req.file);
  console.log(req.body);
});

//edit userInfo
router.put("/edit_user_info", auth, async (req, res) => {
  //find user
  const user = await User.findById(req.user._id);
  if (!user) return res.status(400).send("Bad request. User does not exist");
  //implement changes
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  const result = await user.save();
  res.send(result);
});

//change password
router.patch("/change_password", auth, async (req, res) => {
  console.log(req.body);
  const { error } = validatePasswordCredentials(req.body);
  if (error) return res.status(400).send("Bad request");
  if (req.body.newPassword !== req.body.confirmPassword)
    return res.status(400).send("Passwords do not match");
  //get the user from db
  //get password and compare with hashed password in db
  //if passwords match hash new password and save in db
  let user = await User.findById(req.user._id);
  const validPassword = await bcrypt.compare(
    req.body.currentPassword,
    user.password
  );
  console.log("validPassword => ", validPassword);
  if (!validPassword) return res.status(400).json("Invalid password");
  const salt = await bcrypt.genSalt(10);
  console.log(salt);
  user.password = await bcrypt.hash(req.body.newPassword, salt);
  await user.save();
  res.json("Password changed");
});

//change theme
router.patch("/theme", auth, async (req, res) => {
  //find user
  const user = await User.findById(req.user._id);
  user.settings.darkTheme = !user.settings.darkTheme;
  const result = await user.save();
  res.send(result.settings.darkTheme);
});

//change currency
router.patch("/change_currency", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  user.settings.currency = req.body.currency;
  const result = await user.save();
  res.json(result.settings.currency);
});

//DELETE
//delete user account
router.delete("/delete_user", auth, async (req, res) => {
  const user = await User.findByIdAndDelete(req.user._id);
  const invoices = await Invoice.deleteMany({ user: req.user._id });
  res.send(user);
});

const validateLoginCredentials = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(8).max(255).email().required(),
    password: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(data);
};

const validatePasswordCredentials = (data) => {
  const schema = Joi.object({
    currentPassword: Joi.string().min(8).max(255).required(),
    newPassword: Joi.string().min(8).max(255).required(),
    confirmPassword: Joi.string().min(8).max(255).required(),
    // confirmPassword: Joi.any().equal(Joi.ref("password")),
  });
  return schema.validate(data);
};

module.exports = router;
