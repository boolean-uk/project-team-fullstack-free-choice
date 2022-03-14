import React from 'react';
import { useState } from 'react';
import '../../styles/signIn.css'

import Header from '../../components/Header'
import URL from '../../config'

const loginEndpoint = '/user/login';
const loginURL = URL + loginEndpoint;

const emptyUser = {
    username: '',
    password: ''
}

const SignIn = () => {
    const [loginDetails, setLoginDetails] = useState(emptyUser);

    const postLogin = async (url, loginDetails) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginDetails)
        })
        const data = await res.json();
        console.log('token:', data)
        if (data.error) {
            return false
        } else {
            localStorage.setItem('auth', data.token)
            return true
        }
    }

    const handleChange = e => {
        const { value, name } = e.target;
        setLoginDetails({
            ...loginDetails, [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const hasLoggedIn = await postLogin(loginURL, loginDetails);
        if (hasLoggedIn) {
            //navigate('/home');
        } else {
            const loginFail = document.getElementById('login-fail')
            loginFail.innerText = 'Invalid Credentials'
        }
    }

    return (
        <>
            <Header />
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
                        <p id='login-fail'></p>
                    </form>
                </div>
                <div className='gap-two'></div>
            </div>
        </>

    )
}

export default SignIn