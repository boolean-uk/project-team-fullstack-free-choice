import React from 'react';
import { Link } from "react-router-dom";
import '../styles/header.css'

const Header = () => {
    return (
        <div className='header-container'>
            <h1 className='header-header'>Bookr</h1>
            <div className='links-container'>
                <p><Link to='/' className='link'>Home</Link></p>
                <p><Link to='/recommendation' className='link'>Recommended</Link></p>
                <p><Link to='/match' className='link'>Match</Link></p>
                <p>Logout</p>
            </div>
        </div>
    )
}

export default Header