import React from "react";
import { Form, Input, Select, Button, Row, Col, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import "../styles/register.css";
import axios from "axios";
import { setUser } from "../redux/features/userSlice";

const DoctorLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/v1/user/doclogin", values);
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        dispatch(setUser(response.data.data));
        navigate("/dashboard");
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
      <h2>Log in as Doctor</h2>
      <div className="form-container">
        <Form name="login" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Please enter a valid email!",
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
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default DoctorLogin;
