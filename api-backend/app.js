//add modules
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const expressValidator = require("express-validator");

const config = require("./config/config");

//routes var
const redirectRoutes = require("./api/routes/redirect");
const urlsRoutes = require("./api/routes/urls");
const staticsRoutes = require("./api/routes/statics");
const usersRoutes = require("./api/routes/users");

//connect to mongoDB with mongoose module
mongoose.connect(config.database);
const db = mongoose.connection;

//check connect to mongoDB
db.on("error", function() {
  console.log("not connected to mongoDB");
});
db.once("connected", function() {
  console.log("Connected To MongoDB");
});

//logger
app.use(morgan("dev"));

//body-parser module

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());

//cors module
app.use(cors());

//use routes
app.use("/", redirectRoutes);
app.use("/api/v0.1/urls", urlsRoutes);
app.use("/api/v0.1/statics", staticsRoutes);
app.use("/api/v0.1/users", usersRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
