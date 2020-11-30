import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Home from '../pages/Home'
import StockContainer from '../pages/StockContainer'

const NavBar = (props) => {
    return ( 
        <nav className="d-flex justify-content-around">
            <Link to = '/'>Home</Link>
            <Link to = '/stocks'>Dashboard</Link>
            <a href="/"> Log In</a>
        </nav>
     );
}
 
export default NavBar;