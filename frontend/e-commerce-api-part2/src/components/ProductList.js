import React, { useEffect } from 'react';

export default function ProductList () {
    const displayData = (data) => {
        const dataContainer = document.getElementById('product-card');

        // Clear existing Data
        dataContainer.innerHTML = '';

        //Create HTML elements to display
        data.forEach(item => {
            const dataItem = document.createElement('div');
            dataItem.classList.add('data-item');
            dataItem.textContent = `Name: ${item.name} \r\n`;
            dataItem.textContent += `Description: ${item.description} \r\n`;
            dataItem.textContent += `Price: ${item.amount}`;
            // need to add a link so you can click on the product to get to product description.
            dataContainer.appendChild(dataItem);
        });
    }

    useEffect(() => {
        fetch("http://localhost:3001/products")
            .then((res) => res.json())
            .then (data => {displayData(data)})
            .catch((err) => console.log(err))
    }, []);

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