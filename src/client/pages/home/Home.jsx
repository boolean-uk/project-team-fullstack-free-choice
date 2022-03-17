import { React } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/home.css';


const Home = () => {
    return (
        <div className='main-container'>
            <div className='main'>
                <div className='content'>
                    <h1>Want to find your next <span>Bookr</span> to read?</h1>
                    <div className='buttons'>
                        <div className='login-container'>
                            <h4>Already have an account?</h4>
                            <Link to='/signin'>
                                <h3 className='sign-link'>Login</h3>
                            </Link>
                        </div>
                        <div className='register-container'>
                            <h4>Want to create a new account?</h4> 
                            <Link to='/signup'>
                                <h3 className='sign-link'>Sign Up</h3>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;