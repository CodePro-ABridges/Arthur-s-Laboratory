import React from "react";
import { FaGithub } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="w-full fixed mr-0 bg-neutral-700 text-neutral-200 flex flex-row-reverse justify-center items-center bottom-0">
      <a href="https://github.com/CodePro-ABridges" className="">
        <FaGithub size={24} />
      </a>
      Github
    </footer>
  );
};

export default Footer;
