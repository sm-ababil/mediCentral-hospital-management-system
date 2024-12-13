import React from "react";
import { Layout, Menu, Button } from "antd";
import { Link } from "react-router-dom";
import "../styles/header.css";
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="logo" className="logo-image" />
          MediCentral
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/departments">Departments</Link>
        <Link to="/find-doctor">Find Doctor</Link>
        <Link to="/login">
          <Button type="primary">Log in</Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
