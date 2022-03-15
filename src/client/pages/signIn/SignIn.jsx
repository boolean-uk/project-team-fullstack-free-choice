import React from 'react';
import { useState } from 'react';
import '../../styles/signIn.css'

import { LOGIN_URL } from '../../config'
import { useNavigate } from 'react-router';

const SignIn = () => {
    const emptyUser = {
        username: '',
        password: ''
    }

    const navigate = useNavigate()

    const [loginDetails, setLoginDetails] = useState(emptyUser);
    const [invalid, setInvalid] = useState(false)

    const postLogin = async (url, loginDetails) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginDetails)
        })
        const data = await res.json();
        if (data.error) {
            return false;
        }
        console.log(data)
        localStorage.setItem('token', data.token);
        return true;
    }

    const handleChange = e => {
        const { value, name } = e.target;

        setLoginDetails({
            ...loginDetails, [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const hasLoggedIn = await postLogin(LOGIN_URL, loginDetails);
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
                        <h1 className='signin-header'>Sign In</h1>
                        <label htmlFor='username'>Username</label>
                        <input
                            type='text'
                            name='username'
                            id='username'
                            value={loginDetails.username}
                            onChange={e => handleChange(e)}
                            required
                        />
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            name='password'
                            id='password'
                            value={loginDetails.password}
                            onChange={e => handleChange(e)}
                            required
                        />
                        <input type='submit' value='Go!' id='submit' />
                        <p className='new-account'>New to Bookr? Sign up here!</p>

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

export default SignIn