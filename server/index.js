// package imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("config");
//my imports
const invoices = require("./routes/invoices");
const users = require("./routes/users");
const login = require("./routes/login");
const auth = require("./middleware/auth");

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

//connect to mongoose
mongoose
  .connect("mongodb://localhost:27017/invoice-app")
  .then(() => {
    console.log("Connected to mongoDB...");
  })
  .catch(() => {
    console.log("Couldn't connect to mongoDB");
  });

const app = express();
//middleware
app.use(cors());
app.use(express.json());
//routes
app.use("/api/invoices", invoices);
// app.use("/api/invoices", auth, invoices);
app.use("/api/users", users);
app.use("/api/login", login);

const port = 5000;
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
