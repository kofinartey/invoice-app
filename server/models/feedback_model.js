const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");

//create feedback schema
const feedbackSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  kind: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: { type: String, required: true },
  attendedTo: {
    type: Boolean,
    default: false,
  },
});

// create feedback model
const Feedback = mongoose.model("Feedback", feedbackSchema);

//validate feedback
const validateFeedback = (data) => {
  const schema = Joi.object({
    kind: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports = {
  Feedback,
  validateFeedback,
};
