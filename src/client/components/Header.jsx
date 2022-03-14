import React from 'react';

import '../styles/header.css'

const Header = () => {
    return (
        <div className='header-container'>
            <h1 className='header-header'>Bookr</h1>
            <div className='links-container'>
                <p>Home</p>
                <p>Recommended</p>
                <p>Match</p>
                <p>Logout</p>
            </div>
        </div>
    )
}

export default Header