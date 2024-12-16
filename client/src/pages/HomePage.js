import React from "react";
import Header from "../components/Header";
import homepageImage from "../assets/homepage-image.png";
import "../styles/homepage.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="homepage-container">
        <img 
          src={homepageImage} 
          alt="Homepage illustration" 
          className="homepage-image left-aligned"
        />
        <div className="content-right">
          <h1 className="brand-name">MediCentral</h1>
          <div className="divider"></div>
          <div className="welcome-section">
            <p className="welcome-subtext">
              Experience seamless healthcare management with MediCentral. 
              Schedule appointments, access medical records, and connect with 
              healthcare professionals all in one place.
            </p>
          </div>
          <div className="divider"></div>
          <div className="button-group">
            <button className="primary-button" onClick={() => navigate('/register')}>Register</button>
            <button className="secondary-button" onClick={() => navigate('/departments')}>Explore</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
