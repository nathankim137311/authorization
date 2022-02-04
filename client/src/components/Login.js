import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SuccessMsg, ErrorMsg } from './Register';

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
                setSuccessMsg('');
                return setErrorMsg(data.error);
            }

            if (data.token) {
                localStorage.setItem('token', data.token);
                setErrorMsg(''); 
                return setSuccessMsg('Successfully logged in'); 
            }

        } catch (error) {
            console.log(error); 
        }
    }

    return (
        <>
            {successMsg !== '' && <SuccessMsg message={successMsg} />}
            {errorMsg !== '' && <ErrorMsg message={errorMsg} />}
            <div className='xs:flex xs:flex-col xs:justify-center xs:px-3 xs:py-4 xs:w-full xs:absolute xs:top-1/2 xs:-translate-y-1/2'>
                <div>
                    <h1 className='xs:w-auto xs:text-center xs:font-bold xs:text-3xl xs:text-green-400 xs:mb-2' >Login</h1>
                </div>
                <form onSubmit={(e) => loginUser(e)}>
                    <div className='xs:flex xs:flex-col xs:items-start xs:py-2 xs:my-4 xs:border-b-2'>
                        <label className='xs:text-md xs:my-2 xs:text-sm' htmlFor="email">Email</label>
                        <input 
                            className='xs:w-full xs:h-10 xs:px-2'   
                            type="email" 
                            autoComplete='off' 
                            id='email' 
                            name='email' 
                            placeholder='Email' 
                            onChange={(e) => setEmail(e.target.value)}
                            />
                    </div>
                    <div className='xs:flex xs:flex-col xs:items-start xs:py-2 xs:my-4 xs:border-b-2'>
                        <label className='xs:text-md xs:my-2 xs:text-sm' htmlFor="password">Password</label>
                        <input 
                            className='xs:w-full xs:h-10 xs:px-2'   
                            type="password" 
                            autoComplete='off' 
                            id='password' 
                            name='password' 
                            placeholder='******'
                            onChange={(e) => setPassword(e.target.value)}
                            />
                    </div>
                    <button className='xs:w-full xs:bg-green-400 xs:text-white xs:py-2 xs:px-4 xs:rounded-md xs:mt-4' type='submit'>Login</button>
                    <small className='xs:w-auto xs:block xs:text-center xs:my-4'>Forgot password? <Link className='xs:text-blue-500' to={'#'}>Recover here</Link></small>
                </form>
            </div>
        </>
    )
}
