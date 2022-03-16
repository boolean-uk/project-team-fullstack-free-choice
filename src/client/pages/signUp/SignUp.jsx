import React from 'react';
import { useState } from 'react';
import '../../styles/signUp.css'

import { REGISTER_URL } from '../../config'
import { useNavigate } from 'react-router';

const SignUp = () => {

    const emptyUser = {
        email: '',
        username: '',
        password: ''
    }

    const navigate = useNavigate()

    const [userDetails, setUserDetails] = useState(emptyUser);
    const [invalid, setInvalid] = useState(false)

    const postRegister = async (url, userDetails) => {
        console.log('here', url, userDetails)
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDetails)
        })
        console.log('before const')
        const data = await res.json()
        console.log('mydata', data)
        if (data.error) {
            return false;
        }
        localStorage.setItem('token', data.token);
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

export default SignUp