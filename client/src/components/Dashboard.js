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
            <div>
                <h1>Not authorized... you are being redirected to the login page</h1>
            </div>
        )
    }

    return (
        <div>
            <h1>SUPER SECRET CONFIDENTIAL INFORMATION</h1>
        </div>
    )
}
