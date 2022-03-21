import React from 'react';

import '../styles/hero.css'

export const Hero = ({handleClick, homepageActive}) => {

    return (
        <div className="hero">
            <div className="hero-background"></div>
            <div className="hero-content reveal" data={ homepageActive ? "hidden" : null}>
                <h2>I am looking for a...</h2>
                <div className="button-container">
                    <button className="hero-button-tutor" onClick={() => handleClick('tutor')}>Tutor</button>
                    <button className="hero-button-student" onClick={() => handleClick('student')}>Student</button>
                </div>
                
            </div>
        </div>
    )
}