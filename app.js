var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const port = 3000;
const bodyParser = require('body-parser');
const db = require('./routes/products');
const session = require('express-session');
// const store = new session.MemoryStore();
const pool = require('./pool');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('view engine', 'ejs');

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
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 172800000, secure: true },
  // store,
}));

app.get('/cart', (req, res, next) => {
  const query = `SELECT * FROM products`;
  pool.query(query, (error, results) => {
    if (!req.session.cart) {
      req.session.cart = [];
    }
    res.render('products', {products : results.rows, cart : req.session.cart });
  });
});

app.post('/add_cart', (req, res, next) => {
  const {id, name, price} = req.body;
  let count = 0;
  for(let i = 0; i < req.session.cart.length; i++) {
    if (req.session.cart[i].id === id) {
      req.session.cart[i].quantity += 1;
      count++;
    }
  }
  if (count === 0) {
    const cart_data = {
      id : id,
      name : name,
      price : parseFloat(price),
      quantity : 1
    }
    req.session.cart.push(cart_data);
  }
  res.redirect('/');
});

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