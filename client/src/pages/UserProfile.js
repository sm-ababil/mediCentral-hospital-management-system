import React, { useEffect, useState } from 'react';
import { Card, Avatar, Typography, Row, Col, Spin, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import '../styles/userprofile.css';
import Header from '../components/Header';

const { Title, Text } = Typography;

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
        const response = await axios.post('/api/v1/user/getUser', {}, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        setUserData(response.data.data);
        setLoading(false);
    } catch (error) {
        console.log(error);
        setLoading(false);
    }
  };
  

  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    return <Spin size="large" />;
  }

  if (!userData) {
    return <div>User data not available</div>;
  }

  return (
    <>
        <Header />
        <div className="user-profile">
        <Card className="profile-card">
            <Row gutter={16}>
            {/* <Col span={6}>
                <Avatar size={100} src={userData.avatarUrl || "https://via.placeholder.com/100"} />
            </Col> */}
            <Col span={18}>
                <Title level={2}>{userData.firstname}</Title>
                <Title level={2}>{userData.lastname}</Title>
                <Text>Email: {userData.email}</Text>
                <br />
                <Text>Age: {userData.age}</Text>
                <br />
                <Text>Gender: {userData.gender}</Text>
                <br />
                <Text>Phone: {userData.phone}</Text>
            </Col>
            </Row>
        </Card>
        </div>
    </>
  );
};

export default UserProfile;
