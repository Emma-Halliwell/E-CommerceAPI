import React, { useState, useEffect } from 'react';
import Search from '../features/Search';
import ItemContainer from '../features/ItemContainer';

export default function Home () {
    const [items, setItems] = useState(() => {
        return [];
    });
    const [searchTerm, setSearchTerm] = useState(() => {
        return "";
    });
    const [foundItems, setFoundItems] = useState(() => {
        return [];
    });

    useEffect(() => {
        fetch('http://localhost:3001/products')
            .then(res => res.json())
            .then(json => setItems(json));
    }, []);

    const searchItem = (e) => {
        setSearchTerm(prevState => e.target.value);

        // setSearchTerm(prevState => console.log(e.target.value))
    };

    useEffect(() => {
        setFoundItems(
            items.filter( item => {
                return item.name.toLowerCase().includes(searchTerm.toLowerCase())
            })
        );
    }, [searchTerm, items]);

    return (
        <section>
            <h1 id="home-title">Welcome to Sports Galore</h1>
            <p id="statement">The best place to buy sports equipment of the finest quality.</p>
            <div>
                <Search searchItem={searchItem}/>
                <br />
                {foundItems.length !== 0 ?
                <ItemContainer items={foundItems} />
                : foundItems.length === 0 ?
                <h2>No Result</h2>
                :
                <ItemContainer items={items} />}
            </div>
        </section>
    );
};