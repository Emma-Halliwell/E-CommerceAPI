import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddCart  () {
    const [username, setUsername] = useState("");
    const [product, setProduct] = useState("");
    const [quantity, setQuantity] = useState("");

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
            })
            if (res.ok) {
                navigate('/cart');
            }
            
        } catch (error) {
            console.log(error.message);
        }
    } 

    return (
        // Add to cart function
        <div>
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