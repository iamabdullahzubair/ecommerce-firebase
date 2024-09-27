import { signOut } from "firebase/auth";
import React from "react";
import { toast } from "react-toastify";

import { Link, useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import InfoIcon from "@mui/icons-material/Info";
import { useGlobalState } from "../../reducers/global/GlobalContext";
import { useTheme } from "../../context/ThemeContext";
import { auth } from "../../firebase";

const mainNavSmallScreen = [
  {
    name: "Home",
    link: "/",
    icon: <HomeIcon />,
    authRequired: false,
  },
  {
    name: "Products",
    link: "/products",
    icon: <CategoryIcon />,
    authRequired: false,
  },
  {
    name: "Contact",
    link: "/contact",
    icon: <ContactPageIcon />,
    authRequired: false,
  },
  {
    name: "About",
    link: "/about",
    icon: <InfoIcon />,
    authRequired: false,
  },
  {
    name: "Sign Up",
    link: "/signup",
    icon: <PersonAddIcon />,
    authRequired: false,
  },

  {
    name: "My Cart",
    link: "/cart",
    icon: <ShoppingCartIcon />,
    authRequired: true,
  },
  {
    name: "My Order",
    link: "/my-orders",
    icon: <LocalMallIcon />,
    authRequired: true,
  },
  {
    name: "My reviews",
    link: "/reviews",
    icon: <StarOutlineIcon />,
    authRequired: true,
  },
  {
    name: "My Whish List",
    link: "/whishlist",
    icon: <FavoriteBorderIcon />,
    authRequired: true,
  },
  {
    name: "My Cancellations",
    link: "/order/cancel",
    icon: <CancelIcon />,
    authRequired: true,
  },
  {
    name: "Manage My Account",
    link: "/profile",
    icon: <AccountCircleIcon />,
    authRequired: true,
  },
];

const SmallScreenNavbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { state } = useGlobalState();

  const { user, userData } = state.user;
  const { cart, loading: cartLoading } = state.cartGlobal;

  async function handleLogout() {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout Error");
      console.log(error);
    }
  }

  const location = useLocation();

  return (
    <>
      <nav className="lg:hidden flex justify-between items-center p-4 border-b-2 border-slate-400 dark:bg-gray-900 dark:border-gray-700">
        <div className="flex justify-center sm:gap-5  gap-1">
          <button onClick={() => setIsSidebarOpen(true)}>
            <MenuIcon className="text-gray-700 dark:text-white" />
          </button>
          <Link
            to="/"
            className="text-black dark:text-white font-bold sm:font-extrabold text-2xl"
          >
            Exclusive
          </Link>
        </div>
        {/* Search Bar */}
        <div className="flex items-center gap-2 px-1 sm:px-2 bg-slate-100 dark:bg-gray-800 border-2 border-slate-300 dark:border-gray-600 rounded w-1/2 overflow-hidden">
          <SearchIcon
            fontSize="small"
            className="text-black dark:text-white w-5"
          />
          <input
            type="text"
            placeholder="search here ...."
            className="py-1 focus:outline-none text-slate-500 dark:text-gray-400 bg-slate-100 dark:bg-gray-800"
          />
        </div>

        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
            <div className="w-3/4 bg-white dark:bg-gray-800 p-6">
              <button onClick={() => setIsSidebarOpen(false)}>
                <CloseIcon className="text-gray-700 dark:text-white" />
              </button>
              <div className="flex flex-col justify-between gap-4 pb-4">
                <div className="flex flex-col gap-4  mt-4">
                  {mainNavSmallScreen.map((nav) => (
                    <Link
                      key={nav.link}
                      className={`flex items-center gap-2 ${
                        nav.name=="Sign Up" && user && 'hidden'
                      } ${
                        nav.authRequired && !user && "hidden"
                      } ${
                        location.pathname == nav.link
                          ? "text-lg font-semibold text-secondary"
                          : "text-base font-light"
                      } `}
                      to={nav.link}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <span> {nav.icon}</span>
                      <p>{nav.name}</p>
                    </Link>
                  ))}
                </div>
                <div>
                  {user && (
                    <button
                      onClick={handleLogout}
                      className="flex gap-2 items-center justify-start mt-5"
                    >
                      <LogoutIcon />
                      <p>Logout</p>
                    </button>
                  )}
                </div>
                <button
                  onClick={toggleTheme}
                  className="items-end  dark:bg-gray-900 bg-gray-100 py-3 mt-2 text-gray-700 dark:text-white rounded"
                >
                  <DarkModeIcon /> Dark Mode
                </button>
              </div>
            </div>
            <div className="w-1/4" onClick={() => setIsSidebarOpen(false)} />
          </div>
        )}
      </nav>
    </>
  );
};

export default SmallScreenNavbar;
