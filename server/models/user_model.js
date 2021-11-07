const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const settingsSchema = new mongoose.Schema({
  darkTheme: { type: Boolean, default: false },
  currency: { type: String, default: "Dollar" },
});

const Settings = mongoose.model("Settings", settingsSchema);

//create user schema
const userSchema = new mongoose.Schema({
  name: {
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
  settings: settingsSchema,
});
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
  return token;
};

const User = mongoose.model("User", userSchema);

//validate user input
const validateUser = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
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
