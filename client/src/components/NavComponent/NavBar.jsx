import React, { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import {
  FaHome,
  FaBloggerB,
  FaUserPlus,
  FaSearch,
  FaPlus,
  FaRocketchat,
  FaRegBell,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import NavLink from "./NavLink.jsx";
import { HiOutlineArrowRight } from "react-icons/hi2";
import { useAuth } from "../../context/AuthRoute.jsx";
import { useNavigate } from "react-router-dom";
import Avatar from "../../assets/JimmyNeutron.png";

const containerVariants = {
  close: {
    width: "5rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
  open: {
    width: "16rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
};

const svgVariants = {
  close: {
    rotate: 360,
  },
  open: {
    rotate: 180,
  },
};

const NavigationBar = ({ isNavOpen, setIsNavOpen, handlePostOpenModal }) => {
  //State & Context
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated, logout, user } = useAuth();

  //Debugging
  /*  console.log("Client User: ", user); */
  //
  const navigate = useNavigate();

  //
  const containerControls = useAnimationControls();
  const svgControls = useAnimationControls();

  useEffect(() => {
    if (isNavOpen) {
      containerControls.start("open");
      svgControls.start("open");
    } else {
      containerControls.start("close");
      svgControls.start("close");
    }
  }, [isNavOpen]);

  //logout function
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  //
  const handleOpenClose = () => {
    setIsNavOpen(!isNavOpen);
  };

  //TODO: Add functionality to search bar. Right now I cannot need to create my endpoints for posts, users, etc.
  const handleSearch = (e) => {
    e.preventDefault();
    //Functionality below. Will require axios.
  };

  return (
    <>
      <motion.nav
        variants={containerVariants}
        animate={containerControls}
        initial="close"
        className="bg-neutral-900 flex flex-col z-50 gap-20 p-5 fixed top-0 left-0 h-full shadow shadow-neutral-600"
      >
        <div className="flex flex-row w-full justify-between place-items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-300 rounded-full" />
          <button
            className="p-1 rounded-full flex"
            onClick={() => handleOpenClose()}
          >
            <motion.div
              variants={svgVariants}
              animate={svgControls}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <HiOutlineArrowRight className="w-8 h-8 stroke-neutral-200" />
            </motion.div>
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {isAuthenticated ? (
            <>
              <NavLink name={user?.name} to="/profile" isNavOpen={isNavOpen}>
                <img
                  src={Avatar}
                  className="stroke-inherit stroke-[0.75] min-w-8 w-8"
                />
              </NavLink>
              {/*    <NavLink isNavOpen={isNavOpen}> */}
              <form onSubmit={handleSearch} className="flex items-center">
                <FaSearch className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
                {/*WARNING: May have to wrap the search in a form tag.*/}
                {isNavOpen && (
                  <input
                    type="search"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="ml-0 p-1 rounded bg-neutral-700 text-neutral-200"
                  />
                )}
              </form>
              {/*    </NavLink> */}
              <NavLink name="Home" to="/" isNavOpen={isNavOpen}>
                <FaHome className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
              </NavLink>
              <NavLink name="Dashboard" to="/dashboard" isNavOpen={isNavOpen}>
                <MdDashboard className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
              </NavLink>
              <NavLink name="Blogs" to="/blogs" isNavOpen={isNavOpen}>
                <FaBloggerB className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
              </NavLink>
              <NavLink
                name="New Post"
                to="/dashboard"
                isNavOpen={isNavOpen}
                onClick={handlePostOpenModal}
              >
                <FaPlus className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
              </NavLink>
              <NavLink
                name="Notifications"
                to="/notifcations"
                isNavOpen={isNavOpen}
              >
                <FaRegBell className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
              </NavLink>
              <NavLink name="Chat" to="/chat" isNavOpen={isNavOpen}>
                <FaRocketchat className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
              </NavLink>
              <NavLink
                name="Logout"
                onClick={handleLogout}
                isNavOpen={isNavOpen}
              >
                <IoLogOut className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
              </NavLink>
            </>
          ) : (
            <>
              {" "}
              <NavLink isNavOpen={isNavOpen}>
                <FaSearch className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
                {isNavOpen && (
                  <input
                    type="search"
                    placeholder="Search"
                    className="ml-0 p-1 rounded bg-neutral-700 text-neutral-200"
                  />
                )}
              </NavLink>
              <NavLink name="Home" to="/" isNavOpen={isNavOpen}>
                <FaHome className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
              </NavLink>
              <NavLink name="Dashboard" to="/dashboard" isNavOpen={isNavOpen}>
                <MdDashboard className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
              </NavLink>
              <NavLink name="Admin Login" to="/admin" isNavOpen={isNavOpen}>
                <RiAdminFill className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
              </NavLink>
              <NavLink name="Blogs" to="/blogs" isNavOpen={isNavOpen}>
                <FaBloggerB className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
              </NavLink>
              <NavLink name="Register" to="/register" isNavOpen={isNavOpen}>
                <FaUserPlus className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
              </NavLink>
              <NavLink name="Login" to="/login" isNavOpen={isNavOpen}>
                <IoLogIn className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
              </NavLink>
            </>
          )}
        </div>
      </motion.nav>
    </>
  );
};

export default NavigationBar;
