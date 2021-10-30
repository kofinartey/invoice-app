// package imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//my imports
const invoices = require("./routes/invoices");

const app = express();
app.use(cors());
app.use(express.json());

//connect to mongoose
mongoose
  .connect("mongodb://localhost:27017/invoice-app")
  .then(() => {
    console.log("Connected to mongoDB...");
  })
  .catch(() => {
    console.log("Couldn't connect to mongoDB");
  });

//routes
app.use("/api/invoices", invoices);

const port = 5000;
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
