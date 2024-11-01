var express = require('express');
var router = express.Router();
var cors = require('cors');

const Models = require('./../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = Models.User;
dotenv.config();
const pool = require('../pool');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Creates a new user
router.post('/register', async(req, res, next) => {
  //res.status(201).json(req.body);
  //add new user and return 201
  const salt = await bcrypt.genSalt(10);
  var usr = {
    email: req.body.email,
    username: req.body.username,
    password: await bcrypt.hash(req.body.password, salt)
  };
  created_user = await User.create(usr);
  res.status(201).json(created_user);
});

// logins in an existing user
router.post('/login', async(req, res, next) => {
  const user = await User.findOne({ where : {username : req.body.username }});
  if (user) {
    const valid_password = await bcrypt.compare(req.body.password, user.password);
    if (valid_password) {
      token = jwt.sign({ "id" : user.id, "email" : user.email, "username" : user.username}, process.env.JWT_SECRET);
      res.status(200).json({ token : token });
    } else {
      res.status(400).json({ error : "Password Incorrect" });
    }
  } else {
    res.status(404).json({ error : "User does not exist" });
  }
});

// Get a single user profile
router.get('/profile', async (req, res, next) => {
  try {
    let token = req.headers['authorization'].split(" ")[1];
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ "msg" : "Could not Authenticate" });
  }
}, async (req, res, next) => {
  let user = await User.findOne({ where : {id : req.user.id}, attributes : {exclude:["password"]}});
  if (user === null) {
    res.status(404).json({ "msg" : "User not found" });
  }
  res.status(200).json(user);
});

// Updates username in Users table
router.put('/profile/:id', async (req, res, next) => {
  await User.update(
    { username: req.body.username },
    { where : { id : req.params.id }}
  )
  .then(function(rowsUpdated) {
    res.json(rowsUpdated)
  }).catch(next)
});

router.post('/userDetails', async (req, res, next) => {
  const {
    username, first_name, middle_name, last_name, email, phone_number,
    address_line_1, address_line_2, address_city, address_county, address_postcode, address_country,
  } = req.body;
  pool.query(
    'INSERT INTO user_details (username, first_name, middle_name, last_name, email, phone_number, address_line_1, address_line_2, address_city, address_county, address_postcode, address_country) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)', 
    [username, first_name, middle_name, last_name, email, phone_number,
      address_line_1, address_line_2, address_city, address_county, address_postcode, address_country
    ], (error, results) => {
      if (error) {
        res.status(400).json({ "msg" : "Could not post to user_details"});
      } else {
        res.status(200).json({ "msg" : "Successfully updated user details table."});
      }
    });
});

module.exports = router;