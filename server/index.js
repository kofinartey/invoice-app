// package imports
const express = require("express");
const mongoose = require("mongoose");

//my imports

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

const app = express();

app.use(express.json());

app.get("/api/invoice", async (req, res) => {
  res.send("Hello world");
});

const port = 5000;
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
