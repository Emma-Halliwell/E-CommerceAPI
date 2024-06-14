var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// OAuth imports
// const partials = require('express-partials');
// const session = require('express-session');
// const passport = require('passport');
// const GitHubStrategy = require('passport-github2').Strategy;

// // OAuth variable declarations
// const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
// const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

const port = 3000;
const bodyParser = require('body-parser');
const db = require('./routes/products');
const cart = require('./routes/cart');
const pool = require('./pool');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Product CRUD requests
app.get('/products', db.getProducts);
app.get('/products/category', db.getProductsCategory);
app.get('/products/:id', db.getProductsById);

// Cart 
app.post('/cart', cart.postCart);
app.get('/cart/:cart_id', cart.getCart);

// Checkout
app.post('/cart/:cart_id/checkout', cart.checkout);

// Order
app.post('/order/:checkout_id', cart.postOrder);
app.get('/order', cart.getOrder);

// Passport Configuration
// passport.use(
//   new GitHubStrategy({
//     clientID: process.env.GITHUB_CLIENT_ID,
//     clientSecret: process.env.GITHUB_CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/auth/github/callback",
//   },
//   (accessToken, refreshToken, profile, done) => {
//     done(null, profile);
//   })
// );

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// // Express Projects Setup
// app.use(partials());

// app.use(
//   session({
//     secret: 'sportsGalore',
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

// // OAuth Routes
// app.get('/auth/github', 
//   passport.authenticate('github')
// );

// app.get('auth/github/callback', 
//   passport.authenticate('github', {
//     failureRedirect: '/login',
//     successRedirect: '/',
//   })
// );

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log(`App running on port: ${port}.`);
});

// Ensure Authentication Callback Function
// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   } else {
//     res.redirect('/login');
//   }
// }

module.exports = app;