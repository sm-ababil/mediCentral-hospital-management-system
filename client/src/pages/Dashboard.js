import React, {useEffect} from 'react';
import { Form, Input, Select, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";
import Header from '../components/Header';
import "../styles/register.css";
import axios from 'axios';


const Dashboard = () => {
    const getUser = async () => {
        try {
            const response = await axios.post('/api/v1/user/getUser', {}, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUser();
    }, []);
    
    return (
        <>
            <div>
                <Header />
            </div>
        </>
    );
};


export default Dashboard;