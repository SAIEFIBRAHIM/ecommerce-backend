var createError = require("http-errors");
var express = require("express");
var app = express();
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var dbConfig = require("./config/database");
var usersRouter = require("./routes/users");
var addressRouter = require("./routes/address");
var companiesRouter = require("./routes/companies");
var swaggerJsDoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");

require("dotenv").config();
//Mongoose Connect
mongoose
  .connect(dbConfig.database)
  .then(() => {
    console.log("db cluster connected");
  })
  .catch((err) => console.error(err));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce API",
      version: "1.0.0",
      description: "REST API documentation",
    },
    servers: [
      {
        url: "localhost:1337",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const specs = swaggerJsDoc(options);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//routes
app.use("/api/doc/v1", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api/users", usersRouter);
app.use("/api/address", addressRouter);
app.use("/api/companies", companiesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
module.exports = app;
