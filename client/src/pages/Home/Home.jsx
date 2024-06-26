import React from "react";
import "../../Home.css";
import Dexter from "../../assets/DexterGif.mp4";

const Home = () => {
  return (
    <div className="home-container">
      <video autoPlay loop muted className="background-video">
        <source src={Dexter} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <h1>Welcome to My Laboratory</h1>
        <p>This is the home page content.</p>
      </div>
    </div>
  );
};

export default Home;
