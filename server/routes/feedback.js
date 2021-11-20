const express = require("express");
const { Feedback, validateFeedback } = require("../models/feedback_model");
const auth = require("../middleware/auth");

const router = express.Router();

//GET
//POST
router.post("/add", auth, async (req, res) => {
  console.log(req.body);
  const { error } = validateFeedback(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  const feedback = new Feedback({
    user: req.user._id,
    kind: req.body.kind,
    title: req.body.title,
    description: req.body.description,
  });
  const result = await feedback.save();
  res.json("Feedback sent succesfully");
});
//DELETE

module.exports = router;
