import React, { useState } from 'react';

export default function ProductList () {
    const [products, setProducts] = useState("");
    const productList = async () => {
        try {
            const res = await fetch('/products', {
                method: "GET",
                headers: {
                    "Content-type" : "application/json",
                },
                body: JSON.stringify(products),
            })
        } catch (error) {}
    }

    return (
        <section>
            <h1>Products</h1>
            <div className="product-card">
                <div className="product-inner">
                    <p>Product will go here</p>
                </div>
                <div className="product-inner">
                    <p>Product will go here</p>
                </div>
                <div className="product-inner">
                    <p>Product will go here</p>
                </div>
                <div className="product-inner">
                    <p>Product will go here</p>
                </div>
                <div className="product-inner">
                    <p>Product will go here</p>
                </div>
            </div>
        </section>
    )
};