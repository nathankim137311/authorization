import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/outline';

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
        <>
            {successMsg !== '' && <SuccessMsg message={successMsg} />}
            {errorMsg !== '' && <ErrorMsg message={errorMsg} />}
            <div className='xs:flex xs:flex-col xs:justify-center xs:px-3 xs:py-4 xs:w-full xs:absolute xs:top-1/2 xs:-translate-y-1/2'>
                <div>
                    <h1 className='xs:w-auto xs:text-center xs:font-bold xs:text-3xl xs:text-green-400 xs:mb-2'>Register User</h1>
                </div>
                <form className='' onSubmit={(e) => registerUser(e)}>
                    <div className='xs:flex xs:flex-col xs:items-start xs:py-2 xs:my-4 xs:border-b-2'>
                        <label className='xs:text-md xs:my-2' htmlFor="email">Email</label>
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
                        <label className='xs:text-md xs:my-2' htmlFor="password">Password</label>
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
                    <div className='xs:flex xs:flex-col xs:items-start xs:py-2 xs:my-4 xs:border-b-2'>
                        <label className='xs:text-md xs:my-2' htmlFor="confirm_password">Confirm password</label>
                        <input 
                            className='xs:w-full xs:h-10 xs:px-2'   
                            type="password" 
                            autoComplete='off' 
                            id='confirm_password' 
                            name='confirm_password' 
                            placeholder='******'
                            />
                    </div>
                    <button className='xs:w-full xs:bg-green-400 xs:text-white xs:py-2 xs:px-4 xs:rounded-md xs:mt-4' type='submit'>Register</button>
                    <small className='xs:w-auto xs:block xs:text-center xs:my-4'>Forgot password? <Link className='xs:text-blue-500' to={'#'}>Recover here</Link></small>
                </form>
            </div>
        </>
    )
}

const SuccessMsg = ({ message }) => {
    return (
        <div className='xs:flex xs:flex-row xs:items-center xs:justify-center xs:px-2 xs:py-4 xs:bg-green-300'>
            <CheckCircleIcon className='xs:h-6 xs:w-6 xs:mr-2 xs:text-green-600'/>
            <small className='xs:text-green-600'>{message}</small>
        </div>
    )
}

const ErrorMsg = ({ message }) => {
    return (
        <div className='xs:flex xs:flex-row xs:items-center xs:justify-center xs:px-2 xs:py-4 xs:bg-red-300'>
            <ExclamationCircleIcon className='xs:h-6 xs:w-6 xs:mr-2 xs:text-red-600'/>
            <small className='xs:text-red-600'>{message}</small>
        </div>
    )
}