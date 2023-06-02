import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const registerUser = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/api/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const user = await response.json();
        if (user.status === 'ok')
        {
            alert("Congratulations! User registered successfully!");
            navigate('/login');
        }
        else if (user.status === 'already exists')
        {
            alert("This email address is already registered.");
        }
        else
        {
            alert("Some error occured! Please register again.");
        }
    }

    return (
        <form className='register-form' onSubmit={registerUser}>
            <h2 style={{ marginBottom: '15px' }}>Register Now</h2>
            <div>
                <label htmlFor="name">Enter Your Name:</label>
                <input type="text" id='name' onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="email">Enter Your Email Address:</label>
                <input type="text" id='email' onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label htmlFor="password">Enter Your Password:</label>
                <input type="text" id='password' onChange={(e) => setPassword(e.target.value)} />
            </div>

            <input type="submit" value="Submit" id='register-submit-btn' />
        </form>
    )
}

export default Register;