import React from "react";
import { Form, Input, Select, Button, Row, Col, message } from "antd";
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { Link, useNavigate } from "react-router-dom";
import Header from '../components/Header';
import axios from 'axios';
import "../styles/register.css";

const DoctorRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/docregister', values);
      if(res.data.success){
        message.success('Register Successfully');
        navigate('/dashboard');
        dispatch(hideLoading());
      } else {
        message.error(res.data.message);
        dispatch(hideLoading());
      };
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error(`Sonething went wrong !`);

    };
  };

  return (
    <>
      <Header />
      <h2>Doctor Registration</h2>
      <div className="form-container">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="firstname"
            rules={[
              { required: true, message: "Please input first name!" },
            ]}
          >
            <Input placeholder="First Name" />
          </Form.Item>

          <Form.Item
            name="lastname"
            rules={[
              { required: true, message: "Please input last name!" },
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
            name="department"
            rules={[
              { required: true, message: "Please input department!" },
            ]}
          >
            <Input placeholder="Department" />
          </Form.Item>

          <Form.Item
            name="speciality"
            rules={[
              { required: true, message: "Please input speciality!" },
            ]}
          >
            <Input placeholder="Speciality" />
          </Form.Item>

          <Form.Item
            name="expertise"
            rules={[
              { required: true, message: "Please input expertise!" },
            ]}
          >
            <Input placeholder="Expertise" />
          </Form.Item>

          <Form.Item
            name="experience"
            rules={[
              { required: true, message: "Please input experience!" },
            ]}
          >
            <Input placeholder="Experience" />
          </Form.Item>

          <Form.Item
            name="qualification"
            rules={[
              { required: true, message: "Please input qualification!" },
            ]}
          >
            <Input placeholder="Qualification" />
          </Form.Item>

          <Form.Item
            name="chamberTime"
            rules={[
              { required: true, message: "Please input chamber time!" },
            ]}
          >
            <Input placeholder="Chamber Time" />
          </Form.Item>

          <Form.Item
            name="offDay"
            rules={[
              { required: true, message: "Please input off day!" },
            ]}
          >
            <Input placeholder="Off Day" />
          </Form.Item>

          
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
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default DoctorRegister;
