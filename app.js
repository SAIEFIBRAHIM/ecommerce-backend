//modules
var createError = require("http-errors");
var express = require("express");
var app = express();
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var swaggerJsDoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");
var dbConfig = require("./config/database");
//routers
var usersRouter = require("./routes/users");
var countriesRouter = require("./routes/countries");
var statesRouter = require("./routes/states");
var addressesRouter = require("./routes/addresses");
var imagesRouter = require("./routes/images");
var productsRouter = require("./routes/products");
var categoriesRouter = require("./routes/categories");
var ordersRouter = require("./routes/orders");
var ticketsRouter = require("./routes/tickets");
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
require("dotenv").config();

//firebase setup

const firebaseConfig = {
  apiKey: "AIzaSyDu3lwj8MjfZ_y-Kf1ZN8I8qG6SJUVpUt0",
  authDomain: "retech-outlet-backend.firebaseapp.com",
  projectId: "retech-outlet-backend",
  storageBucket: "retech-outlet-backend.appspot.com",
  messagingSenderId: "658591100613",
  appId: "1:658591100613:web:3a402255a151fab0d64aac",
  measurementId: "G-TQH7LX22MH",
};

// Initialize Firebase
const fireApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(fireApp);

// set the view engine to ejs
app.set("view engine", "ejs");

// CROS access setup
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");

  next();
});
//Mongoose Connect
mongoose.set("strictQuery", true);
mongoose
  .connect(dbConfig.database)
  .then(() => {
    console.log("db cluster connected");
  })
  .catch((err) => console.error(err));
// swagger ui options
const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Ecommerce API",
      version: "1.1.0",
      description: "REST API documentation",
    },
    servers: [
      {
        url: process.env.BASE_URL,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "https",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
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
app.use("/images", express.static(process.cwd() + "/images"));

//routes
// index page
app.get("/", function (req, res) {
  res.render("pages/index");
});
app.use("/api/doc/v1", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api/images", imagesRouter);
app.use("/api/users", usersRouter);
app.use("/api/countries", countriesRouter);
app.use("/api/states", statesRouter);
app.use("/api/addresses", addressesRouter);
app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/tickets", ticketsRouter);

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
