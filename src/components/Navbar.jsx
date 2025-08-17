import { Link, NavLink, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { BellIcon } from "lucide-react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchAnnouncementCount = async () => {
  const res = await axios.get("http://localhost:3000/announcements/count");
  return res.data.count;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success("You have logged out successfully!");
        setTimeout(() => {
          navigate("/");
        }, 100);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Logout failed. Please try again.");
      });
  };

  const { data: announcementCount = 0 } = useQuery({
    queryKey: ["announcementCount"],
    queryFn: fetchAnnouncementCount,
  });

  const navLinkClasses = ({ isActive }) =>
    isActive ? "text-[#007dff] border-b-2" : "text-black";

  return (
    <div className="bg-blue-100 shadow-md relative z-50">
      <div className="navbar w-11/12 mx-auto px-2 py-2">
        {/* Left: Logo + Name */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 ">
            <img src="/logo.png" alt="Logo" className="w-10 h-10 mt-2" />
            <span className="text-[#007dff] text-xl md:text-2xl lg:text-3xl font-bold">
              DevDialogue
            </span>
          </Link>
        </div>

        {/* Center: Home & Membership */}
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block lg:flex">
          <ul className="menu menu-horizontal gap-1 lg:gap-6 text-base lg:text-lg lg:font-medium">
            <li>
              <NavLink className={navLinkClasses} to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className={navLinkClasses} to="/about">
                About
              </NavLink>
            </li>
            <li>
              <NavLink className={navLinkClasses} to="/membership">
                Membership
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Right: Notification + Auth */}
        <div className="md:flex gap-2 lg:gap-3 items-center ml-auto hidden">
          <div className="relative">
            <button className="btn btn-ghost btn-circle">
              <BellIcon className="w-5 h-5" />
            </button>
            {announcementCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {announcementCount}
              </span>
            )}
          </div>

          {!user ? (
            <Link
              to="/auth/login"
              className="btn bg-[#009fff] text-white px-4 py-1 rounded-lg text-base hover:bg-[#007dff] cursor-pointer"
            >
              Join Us
            </Link>
          ) : (
            <div className="dropdown dropdown-end mx-2">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user.photoURL} alt="User" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-60"
              >
                <li className="pointer-events-none text-center font-semibold">
                  {user.displayName}
                </li>
                <li className="mx-auto text-center font-semibold">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className="mx-auto text-center font-semibold">
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden pl-16">
          <button
            onClick={toggleMenu}
            className="btn btn-ghost btn-circle ml-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-base-100 px-4 pt-2 pb-4 shadow-md">
          <ul className="menu menu-vertical text-base font-medium space-y-2">
            <li>
              <NavLink to="/" className={navLinkClasses} onClick={toggleMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={navLinkClasses}
                onClick={toggleMenu}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/membership"
                className={navLinkClasses}
                onClick={toggleMenu}
              >
                Membership
              </NavLink>
            </li>
            <li>
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="w-5 h-5" />
              </button>
              {announcementCount > 0 && (
                <span className="absolute top-1 left-6 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {announcementCount}
                </span>
              )}
            </li>
            {!user ? (
              <li className="pl-3 md:pl-0 py-2 md:py-0">
                <Link
                  to="/auth/login"
                  className="btn  btn-sm w-full bg-[#009fff] text-white px-4 py-1 rounded-lg text-base hover:bg-[#007dff] cursor-pointer"
                  onClick={toggleMenu}
                >
                  Join Us
                </Link>
              </li>
            ) : (
              <div className="dropdown dropdown-right mr-16">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src={user.photoURL} alt="User" />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-60"
                >
                  <li className="pointer-events-none text-center font-semibold">
                    {user.displayName}
                  </li>
                  <li className="mx-auto text-center font-semibold">
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li className="mx-auto text-center font-semibold">
                    <button  onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
