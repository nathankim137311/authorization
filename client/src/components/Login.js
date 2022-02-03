import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    // Inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Error message
    const [errorMsg, setErrorMsg] = useState(''); 
    // Success message 
    const [successMsg, setSuccessMsg] = useState('');

    let navigate = useNavigate();
    
    useEffect(() => {
        if (successMsg !== '') {
            const timer = setTimeout(() => {
                navigate('/dashboard');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [successMsg]);

    const loginUser = async (e) => {
        e.preventDefault(); 
        
        const user = {
            email,
            password, 
        }

        try {
            const response = await fetch('http://localhost:3000/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user),
            });
    
            const data = await response.json();

            if (data.error) {
                return setErrorMsg(data.error);
            }

            if (data.token) {
                localStorage.setItem('token', data.token); 
                return setSuccessMsg('Successfully logged in'); 
            }

        } catch (error) {
            console.log(error); 
        }
    }

    return (
        <div>
            <div>
                <h1>Login</h1>
                <span>{successMsg !== '' ? successMsg : errorMsg}</span>
            </div>
            <form onSubmit={(e) => loginUser(e)}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        autoComplete='off' 
                        id='email' 
                        name='email' 
                        placeholder='Email' 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <small></small>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        autoComplete='off' 
                        id='password' 
                        name='password' 
                        placeholder='******'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <small></small>
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}
