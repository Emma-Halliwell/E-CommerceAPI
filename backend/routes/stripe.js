var express = require('express');
var router = express.Router();
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items) => {
    let total = 0;
    items.forEach((item) => {
        total += item.amount;
    });
    return total;
};

router.post('/paymentIntent', async (req, res) => {
    const { items } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "gpb",
        automatic_payment_methods: {
            enabled: true,
        }
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
        dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_method/review?transaction_id=${paymentIntent.id}`,
    });
});

module.exports = router;