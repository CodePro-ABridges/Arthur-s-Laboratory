import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NavLink = ({ children, name, to, onClick, isNavOpen }) => {
  return (
    <Link
      to={to}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      onClick={onClick}
      className="flex p-1 rounded cursor-pointer stroke-[0.75] hover:stroke-neutral-100 stroke-neutral-400 text-neutral-400 hover:text-neutral-100 place-items-center gap-3 hover:bg-neutral-700/30 transition-colors duration-100"
    >
      {children}
      {isNavOpen && (
        <p className="text-inherit font-poppins overflow-clip whitespace-nowrap tracking-wide">
          {name}
        </p>
      )}
    </Link>
  );
};

export default NavLink;
