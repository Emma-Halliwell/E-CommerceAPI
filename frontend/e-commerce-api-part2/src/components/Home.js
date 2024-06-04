import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home () {
    const searchInputRef = useRef();
    const navigate = useNavigate();

    const onSearchHandler = (e) => {
        e.preventDefault();

        const query = {
            product: searchInputRef.current.value
        }
        const queryString = new URLSearchParams(query).toString();

        navigate('/products', { state: { search: queryString }});
    };

    return (
        <section>
            <h1 id="home-title">Welcome to Sports Galore</h1>
            <p id="statement">The best place to buy sports equipment of the finest quality.</p>
            <form className="search-form" onSubmit={onSearchHandler}>
                <div className="search-bar">
                    <input
                        type="text"
                        id="search"
                        name="search"
                        placeholder="Search"
                        ref={searchInputRef}
                    />
                    <button type="submit" className="search-submit">
                        🔎
                    </button>
                </div>
            </form>
        </section>
    );
};