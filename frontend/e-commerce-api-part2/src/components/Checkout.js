import React from 'react';
import { PaymentElement } from '@stripe/react-stripe-js';

export default function Checkout () {
    return (
        <section>
            <h1 id="checkout">Checkout</h1>
            <form>
                <PaymentElement />
                <button>hello</button>
            </form>
        </section>
    )
};