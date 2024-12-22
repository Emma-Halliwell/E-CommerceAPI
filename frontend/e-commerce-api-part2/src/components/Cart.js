import React, { useEffect, useState } from 'react';

export default function Cart () {
    const [cartId, setCartId] = useState('');
    const [items, setItems] = useState(() => {
        return [];
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const cart_id = cartId;
            const url = `http://localhost:3001/cart/${cart_id}`;
            const res = await fetch(url);
            const data = await res.json();
            setItems(data);
            // console.log(items);
            if (res.ok) {
                const displayData = () => {
                    const dataContainer = document.getElementById('cart-card');
                    dataContainer.innerHTML = '';
                    items.forEach(item => {
                        const dataItem = document.createElement('p');
                        dataItem.classList.add('cart-item');
                        dataItem.textContent = `Name: ${item.name} \r\n`;
                        dataItem.textContent += `Description: ${item.description} \r\n`;
                        dataItem.textContent += `Category: ${item.category} \r\n`;
                        dataItem.textContent += `Product Quantity: ${item.product_quantity} \r\n`;
                        dataItem.textContent += `Amount : ${item.amount} \r\n`;
                        dataItem.textContent += `Quantity: ${item.quantity}`;
                        dataContainer.appendChild(dataItem);
                    });
                }
                displayData();
            }
        } catch (error) {
            console.log('Please Revisit this as there is a problem.');
        }
    };

    return (
        <section>
            <p>Please enter your cart Id below.</p>
            <form onSubmit={handleSubmit}>
                <label for="cart_id">Cart Id:</label>
                <input
                    type="text"
                    id="cart_id"
                    name="cart_id"
                    onChange={(e) => setCartId(e.target.value)}
                />
            </form>
            <div
                id="cart-card"
                className="cart-card"
            ></div>
        </section>   
    )
};