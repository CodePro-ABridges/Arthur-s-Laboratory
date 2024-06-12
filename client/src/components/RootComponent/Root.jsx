import React from "react";
import HeroSection from "../heroSection/HeroSection.jsx";

const Root = ({ children }) => {
  return (
    <div>
      <HeroSection />
      <div>{children}</div>
    </div>
  );
};

export default Root;
