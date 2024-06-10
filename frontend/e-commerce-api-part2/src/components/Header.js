import React from 'react';
import companyLogo from './SportsGaloreLogo.jpeg';
//import { useDispatch, useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';

export default function Header () {
    return (
        <div className='header'>
            <img src={companyLogo} alt="Sports Galore Logo" width="100px" height="100px"/>
            <NavLink to="/">Home</NavLink>
            <NavLink to="register">Register</NavLink>
            <NavLink to='login'>Sign In</NavLink>
        </div>
    )
}