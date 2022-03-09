import React from 'react';
import { useState } from 'react';
import '../../styles/signUp.css'

const emptyUser = {
    email: '',
    username: '',
    password: ''
}

const SignUp = () => {
    const [userDetails, setUserDetails] = useState(emptyUser);

    const handleChange = e => {
        const { value, name } = e.target;
        setUserDetails({
            ...userDetails, [name]: value
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
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        value={userDetails.email}
                        onChange={e => handleChange(e)}
                        required
                    />
                    <label htmlFor="username">Username</label>
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
                </form>
            </div>
            <div className='gap-two'></div>
        </div>
    )
}

export default SignUp