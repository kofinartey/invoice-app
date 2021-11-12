const express = require("express");
const { Invoice, validateInvoice } = require("../models/invoice_model");
const { User } = require("../models/user_model");

const router = express.Router();

//GET
router.get("/", async (req, res) => {
  const invoices = await Invoice.find({ user: req.user._id });
  //intentionally delay response to client
  setTimeout(() => {
    res.send(invoices);
  }, 2000);
});

//POST
//post a complete form
router.post("/", async (req, res) => {
  const { error } = validateInvoice(req.body);
  if (error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }
  const invoice = await new Invoice({ ...req.body, user: req.user._id });
  const results = await invoice.save();
  res.send(results);
});
//post a draft
router.post("/draft", async (req, res) => {
  //skip Joi validation for drafts since not all inputs may be provided
  const draft = await new Invoice({ ...req.body, user: req.user._id });
  const results = await draft.save();
  res.send(results);
});

//PUT
//edit an invoice
router.put("/edit/:id", async (req, res) => {
  const { error } = validateInvoice(req.body);
  if (error) res.status(400).send(error.details[0].message);
  let invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(invoice);
});

//PATCH
//change the status of a draft invoice
router.patch("/:id/status", async (req, res) => {
  const invoice = await Invoice.findById(req.params.id);
  if (!invoice) return res.status(400).send("Requested invoice not found");
  invoice.status = "paid";
  const result = await invoice.save();
  res.send(result._id);
});

//DELETE
//delete a specific invoice
router.delete("/:id", async (req, res) => {
  const toDelete = await Invoice.findByIdAndRemove({ _id: req.params.id });
  if (!toDelete) return res.status(404).send("The requested invoice not found");
  res.send(toDelete);
});

//delete all invoices for a user
router.delete("/deleteAll/:userId", async (req, res) => {
  //determine if user exists
  const user = await User.findById(req.params.userId);
  if (!user) return res.status(400).send("User not found");
  //delete all invoices for that user
  const invoices = await Invoice.deleteMany({ user: req.params.userId });
  res.send(invoices);
});

module.exports = router;
