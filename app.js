var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { engine } = require ('express-handlebars');

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");


var blankRouter = require("./routes/blank");
// Comment out the line below to disable routes if you don't need them
var indexRouter = require("./routes/index");
var handsonTableRouter = require("./routes/handsontable");
var getStateRouter = require("./routes/getStates");

var app = express();

// view engine setup
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set("views", path.resolve(__dirname, "./views"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Swagger Docs
const specs = swaggerJSDoc(swaggerDocument);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));

// Static Files
app.use(
  "/bootstrap",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/blank", blankRouter);
app.use("/handsontable", handsonTableRouter);
app.use("/api/getstates", getStateRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// // error handler
// app.use(function(err,req,res,next){
//   res.render('layouts', {layout : 'error', title: "Express Boilerplate", error: err});
// });

module.exports = app;
