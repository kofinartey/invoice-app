const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const settingsSchema = new mongoose.Schema({
  darkTheme: { type: Boolean, default: false },
  currency: { type: String, default: "$" },
});

const Settings = mongoose.model("Settings", settingsSchema);

//create user schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    max: 70,
  },
  lastName: {
    type: String,
    required: true,
    max: 70,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    max: 1000,
  },
  avatar: {
    type: String,
  },
  settings: settingsSchema,
  role: {
    type: String,
    default: "user",
  },
});
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: this.role },
    process.env.JWT_PRIVATE_KEY
  );
  return token;
};

const User = mongoose.model("User", userSchema);

//validate user input
const validateUser = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(255).required(),
  });

  return schema.validate(data);
};

module.exports = {
  User,
  Settings,
  validateUser,
};
