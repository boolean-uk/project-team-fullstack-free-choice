import React from 'react';
import { Link } from "react-router-dom";
import '../styles/header.css'

import PropTypes from 'prop-types';

function Header(props)  {
    const { loggedIn, setLoggedIn } = props;

    const removeToken = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
    }

    return (
        <div className='header-container'>
            <h1 className='header-header'>Bookr</h1>
            <div className='links-container'>
                <p><Link to='/' className='link'>Home</Link></p>
                <p><Link to='/recommendation' className='link'>Recommended</Link></p>
                <p><Link to='/match' className='link'>Match</Link></p>
                {loggedIn && <p><Link to='/signin' className='link' onClick={() => removeToken()}>Logout</Link></p>}
            </div>
        </div>
    )
}

Header.propTypes = {
    setLoggedIn: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired
}

export default Header