import React from 'react';
import companyLogo from './SportsGaloreLogo.jpeg';
import { NavLink } from 'react-router-dom';

export default function Header () {
    return (
        <div className='header'>
            <img src={companyLogo} alt="Sports Galore Logo" width="100px" height="100px"/>
            <NavLink to="/" className="link">Home</NavLink>
            <NavLink to="products" className="link">Products</NavLink>
            <NavLink to="register" className="link">Register</NavLink>
            <NavLink to='login' className="link">Sign In</NavLink>
            <NavLink to="profile" className="link">Profile</NavLink>
            <NavLink to="logout" className="link">LogOut</NavLink>
        </div>
    )
}