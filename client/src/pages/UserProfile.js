import React, { useEffect, useState } from "react";
import { Avatar, Typography, Row, Col, Spin, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import "../styles/userprofile.css";
import Header from "../components/Header";

const { Title, Text } = Typography;

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    age: "",
    gender: "",
    phone: "",
  });

  const getUser = async () => {
    try {
      const response = await axios.post(
        "/api/v1/user/getUser",
        {},
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data && response.data.data) {
        setUserData(response.data.data);
        const avatarResponse = await axios.post(
          `/api/v1/user/getAvatar/${response.data.data._id}`
        );
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
    formData.append("avatar", file);
    formData.append("userId", userData._id);

    try {
      const response = await axios.post("/api/v1/user/uploadAvatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.success) {
        message.success("Profile picture updated successfully");
        setAvatarUrl(response.data.avatarUrl);
      } else {
        message.error("Failed to update profile picture");
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
      message.error("Error uploading profile picture");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (userData) {
      setFormData({
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        age: userData.age,
        gender: userData.gender,
        phone: userData.phone,
      });
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleFormSubmit = async () => {
    try {
      const response = await axios.post(
        "/api/v1/user/updateProfile",
        formData,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        message.success("Profile updated successfully");
        setUserData(response.data.data);
        setIsEditing(false);
      } else {
        message.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error("Error updating profile");
    }
  };

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
        <Row gutter={[24, 24]} align="middle" className="profile-content">
          <Col xs={24} sm={8} className="avatar-section">
            <div className="avatar-container">
              <Avatar
                size={200}
                src={avatarUrl || "https://via.placeholder.com/200"}
                className="profile-avatar"
              />
              <Upload showUploadList={false} beforeUpload={handleUpload}>
                <button className="upload-button">
                  <UploadOutlined /> Change Photo
                </button>
              </Upload>
            </div>
          </Col>
          <Col xs={24} sm={16}>
            {isEditing ? (
              <div className="edit-form">
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        className="styled-input"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleInputChange}
                      />
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        className="styled-input"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleInputChange}
                      />
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        className="styled-input"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        className="styled-input"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="form-group">
                      <label>Age</label>
                      <input
                        className="styled-input"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                      />
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="form-group">
                      <label>Gender</label>
                      <input
                        className="styled-input"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                      />
                    </div>
                  </Col>
                </Row>
                <div className="button-group">
                  <button className="save-button" onClick={handleFormSubmit}>
                    Save Changes
                  </button>
                  <button className="cancel-button" onClick={handleEditToggle}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="profile-info">
                <Title level={2} className="user-name">
                  {userData.firstname} {userData.lastname}
                </Title>
                <div className="info-grid">
                  <div className="info-item">
                    <Text type="secondary">First Name</Text>
                    <Text strong>{userData.firstname}</Text>
                  </div>
                  <div className="info-item">
                    <Text type="secondary">Last Name</Text>
                    <Text strong>{userData.lastname}</Text>
                  </div>
                  <div className="info-item">
                    <Text type="secondary">Email</Text>
                    <Text strong>{userData.email}</Text>
                  </div>
                  <div className="info-item">
                    <Text type="secondary">Phone</Text>
                    <Text strong>{userData.phone || "Not provided"}</Text>
                  </div>
                  <div className="info-item">
                    <Text type="secondary">Age</Text>
                    <Text strong>{userData.age || "Not provided"}</Text>
                  </div>
                  <div className="info-item">
                    <Text type="secondary">Gender</Text>
                    <Text strong>{userData.gender || "Not provided"}</Text>
                  </div>
                  <div className="info-item">
                    <Text type="secondary">Created At</Text>
                    <Text strong>
                      {new Date(userData.createdAt).toLocaleDateString()}
                    </Text>
                  </div>
                  <div className="info-item">
                    <Text type="secondary">Last Updated</Text>
                    <Text strong>
                      {new Date(userData.updatedAt).toLocaleDateString()}
                    </Text>
                  </div>
                  {userData.address && (
                    <div className="info-item">
                      <Text type="secondary">Address</Text>
                      <Text strong>{userData.address}</Text>
                    </div>
                  )}
                  {userData.specialization && (
                    <div className="info-item">
                      <Text type="secondary">Specialization</Text>
                      <Text strong>{userData.specialization}</Text>
                    </div>
                  )}
                  {userData.experience && (
                    <div className="info-item">
                      <Text type="secondary">Experience</Text>
                      <Text strong>{userData.experience} years</Text>
                    </div>
                  )}
                </div>
                <button className="edit-button" onClick={handleEditToggle}>
                  Edit Profile
                </button>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default UserProfile;
