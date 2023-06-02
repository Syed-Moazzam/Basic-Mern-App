import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleUserLogin = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/api/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, 
                password
            })
        });

        const user = await response.json();
        if (user.message === 'ok')
        {
            alert("User logged in successfully!");
            navigate('/');
            localStorage.setItem('token', user.token);
        }
        else if (user.message === 'invalid password')
        {
            alert("Invalid Password!");
        }
        else if (user.message === 'user not found')
        {
            alert("This user does not exist!");
        }
        else
        {
            alert("Invalid Email or Password!");
        }
    }

    return (
        <form className='login-form' onSubmit={handleUserLogin}>
            <h2 style={{ marginBottom: '15px' }}>Login</h2>
            <div>
                <label htmlFor="email">Enter Your Email Address:</label>
                <input type="text" id="email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label htmlFor="password">Enter Your Password:</label>
                <input type="text" id='password' onChange={(e) => setPassword(e.target.value)} />
            </div>
            <input type="submit" value="Login" id='login-submit-btn' />
        </form>
    )
}

export default Login;