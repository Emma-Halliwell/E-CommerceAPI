import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductList () {
    const navigate = useNavigate();

    const displayData = (data) => {
        const dataContainer = document.getElementById('product-card');

        // Clear existing Data
        dataContainer.innerHTML = '';

        //Create HTML elements to display
        data.forEach(item => {
            const handleClick = async (e) => {
                e.preventDefault();
                try {
                    const url = 'http://localhost:3001/products/:name';
                    const res = await fetch(url);
                    const params = new URLSearchParams(url.search);
                    params.set('name', item.name);
                    if (res.ok) {
                        navigate('/product-details', {state:{id: item.id, name: item.name, description: item.description, price: item.amount}});

                    } else {
                        console.log('Something went wrong');
                    }
                } catch (error) {
                    console.log(error.message);
                }
            };
            const dataItem = document.createElement('div');
            dataItem.classList.add('data-item');
            dataItem.textContent = `Name: ${item.name} \r\n`;
            dataItem.textContent += `Description: ${item.description} \r\n`;
            dataItem.textContent += `Price: ${item.amount}`;
            dataItem.addEventListener('click', handleClick);
            dataContainer.appendChild(dataItem);
        });
    }

    useEffect(() => {
        fetch("http://localhost:3001/products")
            .then((res) => res.json())
            .then (data => {displayData(data)})
            .catch((err) => console.log(err))
    });

    return (
        <section>
            <h1>Products</h1>
            <div 
                id="product-card"
                className="product-card"
            ></div>
        </section>
    )
};