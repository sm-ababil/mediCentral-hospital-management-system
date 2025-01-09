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
  const [avatarUrl, setAvatarUrl] = useState('');

  const getUser = async () => {
    try {
        const response = await axios.post('/api/v1/user/getUser', {}, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.data && response.data.data) {
            setUserData(response.data.data);
            const avatarResponse = await axios.post(`/api/v1/user/getAvatar/${response.data.data._id}`);
            if (avatarResponse.data.success) {
              setAvatarUrl(avatarResponse.data.avatarUrl);
            }
          } else {
            console.error("Unexpected response structure:", response.data);
          }
          setLoading(false);
    } catch (error) {
        console.log(error);
        setLoading(false);
    }
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    formData.append('userId', userData._id);

    try {
      const response = await axios.post('/api/v1/user/uploadAvatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data.success) {
        message.success('Profile picture updated successfully');
        setAvatarUrl(response.data.avatarUrl);
      } else {
        message.error('Failed to update profile picture');
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
      message.error('Error uploading profile picture');
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
                <Col span={6}>
                    <Avatar
                        size={100}
                        src={avatarUrl || "https://via.placeholder.com/100"}
                        style={{ marginBottom: 16 }}
                    />
                    <Upload
                        showUploadList={false}
                        beforeUpload={handleUpload}
                    >
                        <button>
                            <UploadOutlined /> Upload
                        </button>
                    </Upload>
                </Col>
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
