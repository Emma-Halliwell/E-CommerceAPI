var express = require('express');
var router = express.Router();
// import * as Stripe from 'stripe';
require('dotenv').config();

var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//     apiVersion: '2024-06-20',
//     typescript: true,
// });

router.post('/paymentIntent', async (req, res) => {
    const payment = await stripe.paymentIntents.create({
        amount: 1000,
        currency: 'GBP',
        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.send({
        clientSecret: payment.client_secret,
    });
})

module.exports = router;