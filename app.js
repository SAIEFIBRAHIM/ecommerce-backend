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
var cors = require("cors");

//routers
var usersRouter = require("./routes/users");
var userVerificationRouter = require("./routes/userVerification");
var passResetRouter = require("./routes/passReset");
var countriesRouter = require("./routes/countries");
var statesRouter = require("./routes/states");
var addressesRouter = require("./routes/addresses");
var imagesRouter = require("./routes/images");
var productsRouter = require("./routes/products");
var categoriesRouter = require("./routes/categories");
var ordersRouter = require("./routes/orders");
var ticketsRouter = require("./routes/tickets");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

require("dotenv").config();
app.use(helmet());
const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 200, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
// Apply the rate limiting middleware to all requests
app.use("/api", apiLimiter);

// set the view engine to ejs
app.set("view engine", "ejs");

// CROS access setup
app.use(
  cors({
    origin: "https://seebrand.vercel.app",
  })
);
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
app.use("/api/verification", userVerificationRouter);
app.use("/api/passreset", passResetRouter);
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
