import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile () {
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
            <h1 id="profile-title">Your Account</h1>
            <div className="box-card">
                <div className="inner-box">
                    <h2 className="box-title">Orders</h2>
                    <p className="box-description">
                        Track, return, cancel an order, or reorder again
                    </p>
                </div>
                <div className="inner-box">
                    <h2 className="box-title">Login & Security</h2>
                    <p className="box-description">
                        Manage email, username, and password
                    </p>
                </div>
                <div className="inner-box">
                    <h2 className="box-title">Payment Info</h2>
                    <p className="box-description">
                        Manage payment information
                    </p>
                </div>
            </div>
            <div className="box-card">
                <div className="inner-box">
                    <h2 className="box-title">Addresses</h2>
                    <p className="box-description">
                        Manage postal information
                    </p>  
                </div>
                <div className="inner-box">
                    <h2 className="box-title">Messages</h2>
                    <p className="box-description">
                        Messages sent and recieved to Sports Galore
                    </p>
                </div>
                <div className="inner-box">
                    <h2 className="box-title">Customer Services</h2>
                    <p className="box-description">
                        Contact customer services
                    </p>
                </div>
            </div>
            <div className="profile-search" onSubmit={onSearchHandler}>
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
        </section>
    )
};