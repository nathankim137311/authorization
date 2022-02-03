import React from 'react';

export default function Login() {
    const loginUser = (e) => {
        e.preventDefault(); 
        console.log('send post request to server');
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={(e) => loginUser(e)}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        autoComplete='off' 
                        id='email' 
                        name='email' 
                        placeholder='Email' 
                    />
                    <small></small>
                </div>
                <div>
                    <label htmlFor="">Password</label>
                    <input 
                        type="password" 
                        autoComplete='off' 
                        id='password' 
                        name='password' 
                        placeholder='******'
                    />
                    <small></small>
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}
