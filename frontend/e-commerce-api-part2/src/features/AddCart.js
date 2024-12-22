import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddCart  () {
    const [username, setUsername] = useState("");
    const [product, setProduct] = useState("");
    const [quantity, setQuantity] = useState("");
    const [cart_id, setCart_id] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3001/cart', {
                method: 'POST',
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    product_id: product,
                    quantity: quantity,
                })
            });
            const data = await res.json();
            // console.log(data);
            const cart = JSON.stringify(data);
            // console.log(cart);
            const cartId = cart.slice(1);
            // console.log(cartId);
            setCart_id(cartId);
            if (res.ok) {
                const displayData = () => {
                    const dataContainer = document.getElementById('add_to_cart');
                    dataContainer.innerHTML = '';
                    const para = document.createElement('p');
                    para.textContent = `Your cart Id number is ${cartId}`;
                    para.textContent += 'Please remember your cart Id number. It will be needed to access your cart.';
                    para.textContent += 'When ready please click below.';
                    const button = document.createElement('button');
                    button.setAttribute("id", "click_for_cart");
                    button.innerText = 'Go to Cart';
                    button.onclick = () => {
                        navigate('/cart');
                    };
                    dataContainer.appendChild(para);
                    dataContainer.appendChild(button);
                }
                displayData();
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    // console.log(cart_id);

    return (
        // Add to cart function
        <div id="add_to_cart">
            <form onSubmit={handleSubmit}>
                <label for='username'>Username:</label>
                <input type='text' id='username' onChange={(e) => setUsername(e.target.value)}/>
                <br />
                <label for='productId'> Product Id:</label>
                <input type='text' id='product_Id' onChange={(e) => setProduct(e.target.value)}/>
                <br />
                <label for='quantity'>Quantity:</label>
                <select name="quantity" id="quantity" onChange={(e) => setQuantity(e.target.value)}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <br />
                <button id="add" type="submit" onSubmit={handleSubmit}>Add</button>
            </form>
        </div>
    )
}