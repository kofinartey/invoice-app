// package imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
//my imports
const invoices = require("./routes/invoices");
const users = require("./routes/users");
const feedback = require("./routes/feedback");
const auth = require("./middleware/auth");

if (!process.env.JWT_PRIVATE_KEY) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

//connect to mongoose
mongoose
  .connect("mongodb://localhost:27017/invoice-app")
  // .connect(process.env.MONGODB_CONNECTION_URL, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // })
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
app.use("/api/invoices", auth, invoices);
app.use("/api/users", users);
app.use("/api/feedback", feedback);

app.get("/", (req, res) => {
  res.send("Hello world");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
