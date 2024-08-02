import React from 'react';
import { useLocation } from 'react-router-dom';

export default function ProductDetails () {
    let location = useLocation({name: {}, description: {}, price: {}});

    return (
        <section>
            <h1>Product Details</h1>
            <div className="detail-card">
                <div id="product-details">
                    <h2 id="productName">{location.state.name}</h2>
                    <p id="description">{location.state.description}</p>
                    
                </div>
                <div id="checkout">
                    <h2 id="checkout-title">Checkout</h2>
                    <p id="price">{location.state.price}</p>
                </div>
            </div>
        </section>
    )
}