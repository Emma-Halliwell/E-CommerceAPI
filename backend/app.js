var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const port = 3001;
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
app.use('/users', cors(), usersRouter);

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

// OAuth Configurtion
const partials = require('express-partials');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

// OAuth variable declarations
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

// Passport Configuration
passport.use(
  new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback",
  }, 
  (accessToken, refreshToken, profile, done) => {
    done(null, profile);
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(partials());

// Routes


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

module.exports = app;

// JWT Authenication
const accessTokenSecret = process.env.JWT_SECRET;

const authenicateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const authToken = authHeader.split(' ')[1];
    jwt.verify(authToken, accessTokenSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    })
  } else {
    res.sendStatus(401);
  }
};

// ensureAuthenticated Callback function
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("login");
  }
};