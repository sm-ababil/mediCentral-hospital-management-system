import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import { Navigate } from 'react-router-dom';

const DoctorRoute = ({children}) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getUser = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }

            const response = await axios.post('/api/v1/user/getUser', {}, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            
            if (response.data?.success && response.data?.data) {
                setUserData(response.data.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
  
    useEffect(() => {
        getUser();
    }, []); 
  
    if (loading) {
        return <Spinner />;
    }

    if (!userData || !userData?.email?.endsWith('@medicentral.com')) {
        return <Navigate to="/" />;
    }

    return children;
}

export default DoctorRoute;