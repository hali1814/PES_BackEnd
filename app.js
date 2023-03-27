var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
///////////////////////////////////////////////////////////////////
var apiRouter = require("./src/api/routes/index");
var connectDB = require("./src/utils/helper/connectDB");
///////////////
const session = require("express-session");
// const Redis = require('ioredis')

// const RedisStore = require('connect-redis').default
// const clientRedis = new Redis({
//   port: 1805
// })
require("dotenv").config();

//testttt
// var multer = require("multer");
// var upload = multer();

////////////////////////////////////////////////////////////

const hbs = require('hbs');

var app = express();
hbs.registerHelper('upperCase', function(str) {
  return str.toUpperCase();
});

hbs.registerHelper('totalBill', function(price, quantity, sale) {
  const total = price * (1 - sale / 100) * quantity
  return total.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });;
});

hbs.registerHelper('renderStatusBill', function(status) {
  let html = ''
  switch(status) {
    case 0: html = '<label class="statusBar badge-secondary">To Pay</label>'; break;
    case 1: html = '<label class="statusBar badge-info">To Ship</label>'; break;
    case 2: html = '<label class="statusBar badge-primary">To receive</label>'; break;
    case 3: html = '<label class="statusBar badge-success">Completed</label>'; break;
    case 4: html = '<label class="statusBar badge-danger">Cancelled</label>'; break;
  }
  return html;
});

hbs.registerHelper('renderStatusProduct', function(status) {
  let html = ''
  switch(status) {
    case 0: html = '<span class="badge badge-dot"><i class="bg-success"></i>Active</span>'; break;
    case 1: html = '<span class="badge badge-dot"><i class="bg-warning"></i>Pending</span>'; break;
  }
  return html;
});

hbs.registerHelper('renderStatusUser', function(status) {
  let html = ''
  switch(status) {
    case 0: html = '<span class="badge badge-dot"><i class="bg-success"></i>Active</span>'; break;
    case 1: html = '<span class="badge badge-dot"><i class="bg-warning"></i>Active</span>'; break;
    case 2: html = '<span class="badge badge-dot"><i class="bg-warning"></i>Inactive</span>'; break;
    case 3: html = '<span class="badge badge-dot"><i class="bg-danger"></i>Banned</span>'; break;
  }
  return html;
});

hbs.registerHelper('length', function(arr) {
  return arr.length;
});

hbs.registerHelper('priceSale', function(price, sale) {
  const total = price * (1 - sale / 100);
  return total.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
});





// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use(upload.array());
// app.use(express.static("public"));

// connect db
connectDB();

///setup session redis
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    // store: new RedisStore({client: clientRedis}),
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 30 * 60 * 1000,
    },
  })
);

// router ///////////////////////////////

app.use("/api", apiRouter);
app.use("/", require("./src/admin/routes/index"));
// apiRouter(app)

//////////////////////////////////////////

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log("not found");

  res.render("404", { layout: false });
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
