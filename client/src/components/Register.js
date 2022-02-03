import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
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
                navigate('/auth/login');
              }, 3000);
            return () => clearTimeout(timer);
        }
    }, [successMsg]);

    // Send user data to server for validation
    const registerUser = async (e) => {
        e.preventDefault();

        const user = {
            email,
            password
        }

        try {
            const response = await fetch('http://localhost:3000/api/user/register', {
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

            if (data.user) {
                return setSuccessMsg('Successfully registered user'); 
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
            <form onSubmit={(e) => registerUser(e)}>
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
                <div>
                    <label htmlFor="confirm_password">Confirm password</label>
                    <input 
                        type="password" 
                        autoComplete='off' 
                        id='confirm_password' 
                        name='confirm_password' 
                        placeholder='******'
                    />
                    <small></small>
                </div>
                <button type='submit'>Register</button>
            </form>
        </div>
    )
}
