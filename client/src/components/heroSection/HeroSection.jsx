import React, { useState } from "react";
import Logo from "../../assets/JimmyNeutron.png";

const HeroSection = () => {
  return (
    <header className="flex w-full justify-center items-center bg-neutral-700 ">
      <div>
        <main>
          <div className="flex items-center">
            {/*TODO: will change name once I come up with a better name.*/}
            <h1 className="mr-4 text-2xl">Welcome to the TechTalk</h1>
            <img
              src={Logo}
              alt="Black and Yellow Molecular Logo"
              className="w-8 h-8"
            />
          </div>
        </main>
      </div>
    </header>
  );
};

export default HeroSection;
