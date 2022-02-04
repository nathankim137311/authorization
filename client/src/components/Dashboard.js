import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [isLoading, setIsLoading] = useState(false); 

    let navigate = useNavigate(); 

    const authorizeUser = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/dashboard', {
                method: 'GET',
                headers: {
                    'x-access-token': localStorage.getItem('token'), 
                }
            });

            const data = await response.json();

            if (data.error) {
                setIsLoading(true); 
                setTimeout(() => {
                    navigate('/auth/login');
                }, 3000);
                return console.log(data.error); 
            }

            if (data.message) {
                return console.log(data.message);
            }
        } catch (error) {
            console.log(error); 
        }
    }
    
    useEffect(() => {
        const verifyToken = () => {
            const token = localStorage.getItem('token');
            if (token) {
                const decoded = jwt_decode(token);
                if (decoded) {
                    authorizeUser();
                }
            }
        }
        
        verifyToken(); 
    }, []);

    if (isLoading) {
        return (
            <div className='xs:absolute xs:top-1/2 xs:-translate-y-1/2'>
                <h1>Not authorized... you are being redirected to the login page</h1>
            </div>
        )
    }

    return (
        <div className='xs:absolute xs:top-1/2 xs:-translate-y-1/2 xs:px-2 xs:text-green-400'>
            <h1 className='xs:text-xl xs:font-bold xs:text-center'>SUPER SECRET CONFIDENTIAL INFO</h1>
        </div>
    )
}
