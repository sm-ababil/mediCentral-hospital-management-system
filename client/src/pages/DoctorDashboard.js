import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "../styles/AdminDashboard.css";
import axios from "axios";

const AdminDashboard = () => {
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Header />
      <div className="top-bar">
        <Link to="/ot-bed">OT Bed Request</Link>
      </div>
    </>
  );
};

export default AdminDashboard;
