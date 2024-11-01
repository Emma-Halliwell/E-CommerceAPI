import React from 'react';
import { useLocation } from 'react-router-dom';

import AddCart from '../features/AddCart';

export default function ProductDetails () {
    let location = useLocation({id: {}, name: {}, description: {}, price: {}});

    return (
        <section>
            <h1>Product Details</h1>
            <div className="detail-card">
                <div id="product-details">
                    <h2 id="productName">{location.state.name}</h2>
                    <p id="productId">Product Id: {location.state.id}</p>
                    <p id="description">{location.state.description}</p>
                </div>
                <div id="checkout">
                    <h2 id="checkout-title">Add to Cart</h2>
                    <p id="price">{location.state.price}</p>
                    <AddCart />
                </div>
            </div>
        </section>
    )
}