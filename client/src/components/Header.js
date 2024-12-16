import React from "react";
import { Layout, Menu, Button } from "antd";
import { Link, useLocation } from "react-router-dom";
import "../styles/header.css";
import logo from "../assets/logo.png";

const Header = () => {
  const location = useLocation();

  return (
    <div className="header">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="logo" className="logo-image" />
          MediCentral
        </Link>
      </div>
      <div className="nav-links">
        <Link
          to="/dashboard"
          className={location.pathname === "/dashboard" ? "active-link" : ""}
        >
          Dashboard
        </Link>
        <Link
          to="/departments"
          className={location.pathname === "/departments" ? "active-link" : ""}
        >
          Departments
        </Link>
        <Link
          to="/find-doctor"
          className={location.pathname === "/find-doctor" ? "active-link" : ""}
        >
          Find Doctor
        </Link>
        <Link to="/login">
          <Button type="primary">Log in</Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
