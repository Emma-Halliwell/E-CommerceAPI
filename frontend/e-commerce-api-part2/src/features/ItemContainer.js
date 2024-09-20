import React from 'react';
import ItemCard from './ItemCard';

export default function ItemContainer (props) {

    return (
        <div id="items">
            {props.items.map (item => <ItemCard key={item.id} item={item} />)}
        </div>
    )
};