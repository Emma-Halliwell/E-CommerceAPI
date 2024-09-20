import React from 'react';

export default function Search (props) {
    return (
        <div id="search-bar">
            <p>Quickly search to see if product is available on website.</p>
            <input
                onChange = {e => props.searchItem(e)}
                id = "search"
                type = "text"
                placeholder = "Search"
            />
        </div>
    )
};