const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");

const app = express();

app.get("/", (req, res) => {
  res.send("gg");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
