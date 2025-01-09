import React from 'react';
import { Form, Input, Select, Button, Row, Col, message } from "antd";
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { Link, useNavigate, useLocation } from "react-router-dom";
import Header from '../components/Header';
import "../styles/register.css";
import axios from "axios";
import { setUser } from '../redux/features/userSlice';


const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async(values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/v1/user/login", values);
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        dispatch(setUser(response.data.data));
        if (response.data.data.email === "admin@admin.com") {
          navigate('/admin-dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <>
      <Header />
      <div className="form-container">
        <div className="form-wrapper">
          <h2 className="page-title">User Login</h2>
          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            className="login-form"
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
                {
                  type: 'email',
                  message: 'Please enter a valid email!',
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-button">
                Log in
              </Button>
              <div className="form-links">
                <p>Not a member? <Link to="/register">Register</Link></p>
                <p><Link to="/login-doctor">Login as Doctor</Link></p>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;