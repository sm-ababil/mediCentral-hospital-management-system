import React from 'react';
import { Form, Input, Select, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";
import Header from '../components/Header';
import "../styles/register.css";

const Login = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  return (
    <>
      <Header />
      <h2>User Log in</h2>
      <div className="form-container">
        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
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
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              Not a member? <Link to="/register">Register</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Login;