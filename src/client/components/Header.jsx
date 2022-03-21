import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../utils/config';

import '../styles/header.css'

export const Header = () => {
    const navigate = useNavigate();

    const handleClick = page => {
        navigate(ROUTES[page].PATH)
        window.location.reload();
    }

    return (
        <header className="App-header">
            <h1>Larbert Tutors</h1>
            <nav>
                <button onClick={() => handleClick('HOMEPAGE')}>{ROUTES.HOMEPAGE.CLIENT}</button>
                <button onClick={() => handleClick('CONTACT')}>{ROUTES.CONTACT.CLIENT}</button>
            </nav>
        </header>
    )
}