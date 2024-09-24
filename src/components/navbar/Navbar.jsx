import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import CancelIcon from "@mui/icons-material/Cancel";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";

import { useTheme } from "../../context/ThemeContext";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useGlobalState } from "../../reducers/global/GlobalContext";
import { ColorRing } from "react-loader-spinner";

const accountNav = [
  {
    name: "Manage My Account",
    link: "/profile",
    icon: <AccountCircleIcon />,
  },
  {
    name: "My Order",
    link: "/my-orders",
    icon: <LocalMallIcon />,
  },
  {
    name: "My Cancellations",
    link: "/order/cancel",
    icon: <CancelIcon />,
  },
  {
    name: "My reviews",
    link: "/reviews",
    icon: <StarOutlineIcon />,
  },
];

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [isuserMenu, setIsUserMenu] = useState(false);
  const navlinks = ["Home", "Products", "Contact", "About", "Sign Up"];

  const { toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { state, dispatch } = useGlobalState();

  const { user, userData } = state.user;
  const { cart, loading: cartLoading } = state.cartGlobal;

  
  async function handleLogout() {
    try {
      await signOut(auth);
      toast.success("Log out Succesfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout Error");
      console.log(error);
    }
  }

  const location = useLocation();

  useEffect(() => {
    // Extract the current path name from the URL and set the active tab
    const currentPath =
      location.pathname === "/" ? "Home" : location.pathname.slice(1);
    setActiveTab(currentPath.charAt(0).toUpperCase() + currentPath.slice(1));
    setIsUserMenu(false)
  }, [location]);

  useEffect(() => {
    if (!user) {
      setIsUserMenu(false);
    }
  }, [user]);

  return (
    <div>
      <nav className="flex flex-col lg:flex-row pt-6 px-4 lg:px-20 pb-4 border-b-2 border-slate-400 justify-between items-center dark:bg-gray-900 dark:border-gray-700 ">
        {/* Brand Name */}
        <div className="text-black dark:text-white font-extrabold">
          <Link to="/" className="text-2xl">
            Exclusive
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-between items-center my-2 lg:my-0">
          {navlinks.map((nav) => (
            <Link
              key={nav}
              className={`mx-4 border-b-2 ${
                activeTab === nav
                  ? "border-slate-300 dark:border-gray-500"
                  : "border-transparent"
              } ${user && nav == "Sign Up" ? "hidden" : ""} hover:border-slate-400 dark:hover:border-gray-500 transition duration-150 ease-out text-black dark:text-white`}
              to={`/${nav == "Home" ? "" : nav.toLowerCase().replace(" ", "")}`}
            >
              {nav}
            </Link>
          ))}
        </div>

        {/* Search Bar and Dark Mode Toggle */}
        <div className="w-full lg:w-1/3 flex flex-col lg:flex-row lg:gap-2 items-center justify-end relative">
          <div className="w-full lg:w-2/3 flex items-center gap-2 lg:gap-4 px-2 bg-slate-100 dark:bg-gray-800 border-2 border-slate-300 dark:border-gray-600 rounded">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="py-1 pl-2 focus:outline-none text-slate-500 dark:text-gray-400 bg-slate-100 dark:bg-gray-800 flex-grow"
            />
            <SearchIcon
              fontSize="small"
              className="text-black dark:text-white"
            />
          </div>
          {user && (
            <>
              <FavoriteBorderIcon className="text-gray-700 ml-1  cursor-pointer" />

              {cartLoading ? (
                <div>
                  <ColorRing
                    visible={true}
                    height="30"
                    width="30"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={[
                      "#e15b64",
                      "#f47e60",
                      "#f8b26a",
                      "#abbd81",
                      "#849b87",
                    ]}
                  />
                </div>
              ) : (
                <Link to={"/cart"} className="relative">
                  <div className="absolute -top-1 -right-1 bg-secondary text-xs text-white font-bold px-1 rounded-full">
                    {cart && cart.length ? cart.length : 0}
                  </div>
                  <ShoppingCartIcon className="text-gray-700 cursor-pointer" />
                </Link>
              )}

              <AccountCircleIcon
                className={`text-gray-700 cursor-pointer ${
                  isuserMenu ? "text-secondary" : ""
                }`}
                onClick={() => setIsUserMenu(!isuserMenu)}
              />
              {isuserMenu && (
                <div className="flex flex-col absolute top-12 right-12 px-6 py-3 gap-3 text-base text-white bg-black bg-opacity-35   backdrop-blur-lg rounded">
                  {accountNav.map((nav) => (
                    <Link
                      to={nav.link}
                      key={nav.link}
                      className="flex gap-2 items-center justify-start"
                    >
                      {nav.icon}
                      <p>{nav.name}</p>
                    </Link>
                  ))}
                  {userData?.role === "admin" && (
                    <Link
                      to={"/admin"}
                      className="flex gap-2 items-center justify-start"
                    >
                      <DashboardIcon />
                      <p>Admin Dashboard</p>
                    </Link>
                  )}

                  {user && (
                    <button
                      onClick={handleLogout}
                      className="flex gap-2 items-center justify-start"
                    >
                      <LogoutIcon />
                      <p>Logout</p>
                    </button>
                  )}
                </div>
              )}
            </>
          )}
          <button
            onClick={() => toggleTheme()}
            className=" mt-2 lg:mt-0 p-2 text-gray-700 dark:text-white rounded"
          >
            <DarkModeIcon />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
