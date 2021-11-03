const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const { User } = require("../models/user_model");

const router = express.Router();

//POST
router.post("/", async (req, res) => {
  //validate user input
  const { error } = validateLoginCredentials(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //check if user exists in database
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");
  //compare password input with password on DB
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");
  const token = user.generateAuthToken();
  res.send(token);
});

const validateLoginCredentials = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(8).max(255).email().required(),
    password: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(data);
};

module.exports = router;
