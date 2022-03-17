import React from 'react';
import { useState } from 'react';
import { REGISTER_URL } from '../../config'
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types'

import '../../styles/signUp.css'

const SignUp = (props) => {
    const { setUserId, setLoggedIn } = props;

    const emptyUser = {
        email: '',
        username: '',
        password: ''
    }

    const navigate = useNavigate()

    const [userDetails, setUserDetails] = useState(emptyUser);
    const [invalid, setInvalid] = useState(false)

    const postRegister = async (url, userDetails) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDetails)
        });
        const registeredUser = await res.json();

        if (registeredUser.error) {
            return false;
        }

        localStorage.setItem('token', registeredUser.token);
        localStorage.setItem('userId', registeredUser.data.id);

        setUserId(localStorage.getItem('userId'));

        setLoggedIn(true);

        return true;
    }

    const handleChange = (e) => {
        const { value, name } = e.target;
        setUserDetails({
            ...userDetails, [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const hasLoggedIn = await postRegister(REGISTER_URL, userDetails);
        if (hasLoggedIn) {
            navigate('/match');
        } else {
            setInvalid(true)
        }
    }

    return (
        <>
            <div className='signup-page'>
                <div className='gap-one'></div>
                <div className='signup-container'>
                    <form className='signup-form' onSubmit={e => handleSubmit(e)}>
                        <h1 className='signup-header'>Sign Up</h1>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            name='email'
                            id='email'
                            value={userDetails.email}
                            onChange={e => handleChange(e)}
                            required
                        />
                        <label htmlFor='username'>Username</label>
                        <input
                            type='text'
                            name='username'
                            id='username'
                            value={userDetails.username}
                            onChange={e => handleChange(e)}
                            required
                        />
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            name='password'
                            id='password'
                            value={userDetails.password}
                            onChange={e => handleChange(e)}
                            required
                        />
                        <input type='submit' value='Go!' id='submit' />

                        {invalid &&
                            <p id='login-fail'>Invalid Credentials</p>
                        }

                    </form>
                </div>
                <div className='gap-two'></div>
            </div>
        </>

    )
}

SignUp.propTypes = {
    setUserId: PropTypes.func.isRequired,
    setLoggedIn: PropTypes.func.isRequired
}

export default SignUp