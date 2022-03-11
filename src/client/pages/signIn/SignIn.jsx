import React from 'react';
import { useState } from 'react';
import '../../styles/signIn.css'
import Header from '../../components/Header'

const URL = process.env.REACT_APP_API_URL;
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
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem(),
            },
            body: JSON.stringify(loginDetails)
        })
        const data = await res.json();
        console.log('token:', data)
        return data;
    }

    const handleChange = e => {
        const { value, name } = e.target;
        setLoginDetails({
            ...loginDetails, [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = await postLogin(loginURL, loginDetails);
        console.log(token)
        /*if (token) {
            navigate('/home');
        }*/

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
                    </form>
                </div>
                <div className='gap-two'></div>
            </div>
        </>

    )
}

export default SignIn