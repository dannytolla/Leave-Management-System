const express = require("express");
const cors = require("cors");
require("dotenv").config({});

const ConnectDB = require("./config/db");
const { errorHandler } = require("./middleware/error");

ConnectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/auth"));
app.use("/api", require("./routes/users"));

const port = 5000;

app.use(errorHandler);

app.listen(port, () => {
  console.log("Server is Running");
});
