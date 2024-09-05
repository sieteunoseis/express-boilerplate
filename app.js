var createError = require("http-errors");
var express = require("express");
var methodOverride = require("method-override");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { engine } = require("express-handlebars");

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

var app = express();

// view engine setup
app.engine(".hbs", engine({ 
  extname: ".hbs", 
  defaultLayout: "main", 
  layoutsDir: __dirname + "/views/layouts/", 
  partialsDir: __dirname + "/views/partials/" 
}));
app.set("view engine", "hbs");

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride("_method"));

// Routes
var blankRouter = require("./routes/blankRouter");
// Comment out the line below to disable routes if you don't need them
var indexRouter = require("./routes/indexRouter");
var htRouter = require("./routes/htRouter");
var getStateRouter = require("./routes/getStatesRouter");
var credRouter = require("./routes/credRouter");

// Swagger Docs
const specs = swaggerJSDoc(swaggerDocument);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));

// Static Files
app.use("/bootstrap", express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
// Comment out the line below to disable routes if you don't need them
app.use("/blank", blankRouter);
app.use("/handsontable", htRouter);
app.use("/credentials", credRouter);
app.use("/api/getstates", getStateRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  var year = new Date().getFullYear();
  res.render("error", { title: "Error Page", year: year, error: err });
});

module.exports = app;
