import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout, Menu, Button, Dropdown } from "antd";
import { Link, useLocation } from "react-router-dom";
import "../styles/header.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

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
        setIsLoggedIn(true);
        setUserData(response.data.data);
        setIsLoading(true);
        const avatarResponse = await axios.post(
          `/api/v1/user/getAvatar/${response.data.data._id}`
        );
        if (avatarResponse.data.success) {
          setAvatarUrl(avatarResponse.data.avatarUrl);
        }
      } else {
        console.error("Unexpected response structure:", response.data);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserData(null);
    navigate("/login");
  };

  const menuItems = [
    {
      key: "1",
      label: (
        <Link to="/user-profile" className="last-name">
          <span>{userData ? userData.lastname : "Guest"}</span>
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Button type="link" onClick={handleLogout} className="logout-button">
          Log out
        </Button>
      ),
    },
  ];

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
          to={userData?.email === "admin@admin.com" ? "/admin-dashboard" 
          :userData?.email?.endsWith("@medicentral.com")? "/doctor-dashboard"
          : "/dashboard"
          }
          className={
            location.pathname === "/dashboard" || 
            location.pathname === "/admin-dashboard" || 
            location.pathname === "/doctor-dashboard" 
              ? "active-link" 
              : ""
          }
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
        {isLoggedIn === null ? null : isLoggedIn ? (
          isLoading ? (
            <div>Loading...</div>
          ) : (
            <Dropdown
              menu={{ items: menuItems }}
              trigger={["click"]}
              className="avatar-dropdown"
            >
              <img src={avatarUrl} alt="User Avatar" className="avatar" />
            </Dropdown>
          )
        ) : (
          <Link to="/login">
            <Button type="primary">Log in</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
