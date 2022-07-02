const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({});

const ConnectDB = require("./config/db");
const { errorHandler } = require("./middleware/error");

ConnectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/auth"));
app.use("/api", require("./routes/users"));

const port = process.env.PORT || 5000;

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../", "client", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.use(errorHandler);

app.listen(port, () => {
  console.log("Server is Running");
});
