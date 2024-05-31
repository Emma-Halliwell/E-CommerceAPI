import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';

export default function Header () {
    return (
        <div className='header'>
            <NavLink to="/">Home</NavLink>
        </div>
    )
}