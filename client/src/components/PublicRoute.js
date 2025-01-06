import React from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Spinner from './Spinner';

const PublicRoute = ({children}) => {
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
  if (localStorage.getItem("token")) {
    return <Navigate to={userData?.email === "admin@admin.com" ? "/admin-dashboard" 
      :userData?.email?.endsWith("@medicentral.com")? "/doctor-dashboard"
      : "/dashboard"
      } />;
  } else {
    return children;
  }
}

export default PublicRoute;