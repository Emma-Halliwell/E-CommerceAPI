const pool = require('../pool');

const postCart = (req, res) => {
    const {username, product_id, quantity} = req.body;
    pool.query('INSERT INTO session_cart (username, product_id, quantity) VALUES ($1, $2, $3)', 
    [username, product_id, quantity], (error, results) => {
      if (error) {
        res.status(400).json({ "msg" : "Could not update table session_cart"});
      } else {
        res.status(200).send(`Cart created using ${username}, item added ${product_id}, the quantity being ${quantity}`);
      }
    });
};

const getCart = (req, res) => {
    const cart_id = parseInt(req.params.cart_id);
    pool.query(
      'SELECT * FROM session_cart JOIN products ON session_cart.product_id = products.id JOIN price ON products.price = price.id WHERE cart_id = $1', 
      [cart_id], (error, results) => {
        if (error) {
            res.status(500).json({ "msg" : "Server cannot complete request"});
        } else {
            res.status(200).json(results.rows);
        }
    });
};

// Checkout logic begins
const checkout = async (req, res, next) => {
  const validateCred = arr => {
    let sum = 0;
    let checkDigits = 0;
    let newArray = [];

    for (let i = arr.length - 1; i >= 0; i--) {
      checkDigits++;
      if (checkDigits % 2 === 0) {
        if((arr[i] * 2) > 9) {
          newArray.push((arr[i] * 2) - 9);
        } else {
          newArray.push(arr[i] * 2);
        }
      } else {
        newArray.push(arr[i]);
      };
    };

    for (let j = 0; j < newArray.length; j++) {
      sum += newArray[j];
      if (sum % 10 === 0) {
        return true;
      } else {
        return false;
      };
    };
  };

  const findInvalidCards = nestedArr => {
    let invalidCards = [];
    for (let k = 0; k < nestedArr.length; k++) {
      validateCred(nestedArr[k]);
      if (validateCred(nestedArr[k]) === false) {
        invalidCards.push(nestedArr[k]);
      }
    }
    return invalidCards;
  };

  const idInvalidCardCompanies = nestedArrayInvalidNum => {
    const cardCompany = [];
    for (let l = 0; l < nestedArrayInvalidNum.length; l++) {
      if (nestedArrayInvalidNum[l][0] === 4) {
        if (cardCompany.indexOf('visa') === -1) {
          cardCompany.push('visa');
        } else {
          continue;
        }
      } else if (nestedArrayInvalidNum[l][0] === 5) {
        if (cardCompany.indexOf('mastercard') === -1) {
          cardCompany.push('mastercard');
        } else {
          continue;
        }
      } else if (nestedArrayInvalidNum[l][0] === 6 && nestedArrayInvalidNum[l][1] === 7) {
        if (cardCompany.indexOf('maestro') === -1) {
          cardCompany.push('maestro');
        } else {
          continue;
        }
      } else {
        if (cardCompany.indexOf('Company not found') === -1) {
          cardCompany.push('Company not found');
        } else {
          continue;
        }
      }
    } return cardCompany;
  };

  const cart_id = parseInt(req.params.cart_id);
  const { username, provider } = req.body;
  pool.query('INSERT INTO checkout (username, cart_id, provider) VALUES ($1, $2, $3)',
  [username, cart_id, provider], (error, results) => {
    if (provider === 'visa' || 'mastercard' || 'maestro') {
      res.status(200).json({ "msg" : "Payment method ok"});
    }
    res.status(400).json({ "msg" : "Payment needs to be Visa, payPal, Mastercard or maestro"});
    
    if (error) {
      res.status(500).json({ "msg" : "Server cannot complete request"});
    }
    res.status(200).json(results.rows);
  });
};

const postOrder = (req, res) => {
  const checkout_id = parseInt(req.params.checkout_id);
  const username = req.body;
  pool.query('INSERT INTO orders (username, checkout_id) VALUES ($1, $2)', [username, checkout_id], (error, results) => {
    if (error) {
      res.status(400).json({ "msg" : "Cannot upload data to orders tables"});
    }
    res.status(200).json({ "msg" : `Order add to orders with username : ${username}`});
  });
};

const getOrder = (req, res) => {
  pool.query(
    'SELECT * FROM orders JOIN user_details ON orders.username = user_details.username JOIN checkout ON orders.checkout_id = checkout.id', (error, results) => {
    if (error) {
      res.status(400).json({ "msg" : "Connot get orders"});
    }
    res.status(200).send(results.rows);
  });
};

module.exports = {
    postCart,
    getCart,
    checkout,
    postOrder,
    getOrder
};