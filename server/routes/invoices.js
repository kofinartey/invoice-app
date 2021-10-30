const express = require("express");

const router = express.Router();
const { Invoice, validateInvoice } = require("../models/invoice_model");

//GET
router.get("/", async (req, res) => {
  const invoices = await Invoice.find({});
  res.send(invoices);
});
//POST
router.post("/", async (req, res) => {
  console.log(req.body);
  //validate request
  const { error } = validateInvoice(req.body);
  if (error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }
  //create new Invoce
  const invoice = await new Invoice(req.body);
  //save and send invoice
  const results = await invoice.save();
  res.send(results);
});
//PUT
//DELETE
router.delete("/:id", async (req, res) => {
  console.log(req.params.id);
  const toDelete = await Invoice.findByIdAndRemove({ _id: req.params.id });
  if (!toDelete) return res.status(404).send("The requested invoice not found");
  res.send(toDelete);
});

module.exports = router;
