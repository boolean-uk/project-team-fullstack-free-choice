import React from 'react';
import { useState } from 'react';
import '../../styles/signIn.css'

const emptyUser = {
    username: '',
    password: ''
}

const SignIn = () => {
    const [loginDetails, setLoginDetails] = useState(emptyUser);

    const handleChange = e => {
        const { value, name } = e.target;
        setLoginDetails({
            ...loginDetails, [name]: value
        });
    }

    const handleSubmit = e => {
        e.preventDefault()
    }

    return (
        <div className='signup-page'>
            <div className='gap-one'></div>
            <div className='signup-container'>
                <form className='signup-form' onSubmit={e => handleSubmit(e)}>
                    <label htmlFor="username">Username</label>
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
                </form>
            </div>
            <div className='gap-two'></div>
        </div>
    )
}

export default SignIn