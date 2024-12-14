import React from "react";
import { Form, Input, Select, Button, Row, Col, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Header from '../components/Header';
import axios from 'axios';
import "../styles/register.css";

const Register = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const res = await axios.post('/api/v1/user/register', values);
      if(res.data.success){
        message.success('Register Successfully');
        navigate('/login');
      } else {
        message.error(res.data.message);
      };
    } catch (error) {
      console.log(error);
    message.error(`Sonething went wrong !`);

    };
  };

  return (
    <>
      <Header />
      <h2>Create an Account</h2>
      <div className="form-container">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="firstname"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input placeholder="First Name" />
          </Form.Item>

          <Form.Item
            name="lastname"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="gender"
                rules={[
                  { required: true, message: "Please select your gender!" },
                ]}
              >
                <Select placeholder="Gender">
                  <Select.Option value="male">Male</Select.Option>
                  <Select.Option value="female">Female</Select.Option>
                  <Select.Option value="other">Other</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="age"
                rules={[{ required: true, message: "Please input your age!" }]}
              >
                <Input type="number" placeholder="Age" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input placeholder="Phone Number" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              Already a member? <Link to="/login">Log in</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Register;
