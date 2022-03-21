import React, { useState, useEffect } from 'react';

import { Hero } from './Hero';
import { TutorPage } from './TutorPage';
import { StudentPage } from './StudentPage';

import '../styles/homepage.css'

export const Homepage = () => {
    const [homepageActive, setHomepageActive] = useState(false);
    const [homepageContent, sethomepageContent] = useState();

    const handleClick = choice => {
        sethomepageContent(choice)
        setHomepageActive(true)
    }

    useEffect(() => {
        if (!homepageContent) setHomepageActive(false);
    }, [homepageContent])

    return (
        <div className="App-homepage" data={ homepageActive ? "visible" : null}>
            <Hero handleClick={e => handleClick(e)} homepageActive={homepageActive}/>
            <div className="homepage-content" data={ homepageActive ? "visible" : null}>
                {homepageContent === 'tutor' && <TutorPage />}
                {homepageContent === 'student' && <StudentPage />}
            </div>
        </div>
    )
}