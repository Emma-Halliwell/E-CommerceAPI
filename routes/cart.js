const pool = require('../pool');
// const Models = require('./../models');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
// const User = Models.User;
dotenv.config();

const postCart = (req, res) => {
    const {username, product_id} = req.body;
    pool.query('INSERT INTO session_cart (username, product_id) VALUES ($1, $2)', 
    [username, product_id], (error, results) => {
      if (error) {
        res.status(400).json({ "msg" : "Could not update table session_cart"});
      } else {
        res.status(200).json(results.rows);
      }
    });
};

const getCart = (req, res) => {
    const cart_id = parseInt(req.params.cart_id);
    pool.query('SELECT * FROM session_cart WHERE cart_id = $1', [cart_id], (error, results) => {
        if (error) {
            res.status(400).json({ "msg" : "Server cannot complete request"});
        } else {
            res.status(200).json(results.rows);
        }
    });
};

module.exports = {
    postCart,
    getCart,
};