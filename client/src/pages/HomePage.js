import React from "react";
import Header from "../components/Header";
import homepageImage from "../assets/homepage-image.png";

const HomePage = () => {
  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          minHeight: "calc(100vh - 64px)", // Subtract header height
          padding: "20px",
        }}
      >
        <div
          style={{
            flex: "1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={homepageImage}
            alt="Homepage illustration"
            style={{
              maxWidth: "80%",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </div>
        <div
          style={{
            flex: "1",
          }}
        >
          {/* Right side content can go here */}
        </div>
      </div>
    </>
  );
};

export default HomePage;
