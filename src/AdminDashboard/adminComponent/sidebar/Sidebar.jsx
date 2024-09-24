import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTheme } from "../../../context/ThemeContext";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("");
  const navlinks = ["Dashboard", "Products", "Users", "Orders"];

  const { pathname } = useLocation();

  useEffect(() => {
    // If we are at the root admin path, set "Dashboard" as the active tab
    if (pathname === "/admin") {
      setActiveTab("Dashboard");
      return;
    }

    // Extract the part of the pathname after "/admin" (e.g., "products", "users")
    const currentPath = pathname.split("/")[2];

    if (!currentPath) return; // Ensure we have a valid path

    // Find the corresponding navlink that matches the current path
    const matchingTab = navlinks.find(
      (tab) => tab.toLowerCase() === currentPath.toLowerCase()
    );

    // Set the active tab based on the matching navlink
    if (matchingTab) {
      setActiveTab(matchingTab);
    }
  }, [pathname]);

  const { toggleTheme } = useTheme();

  // Handler to set the active tab
  const handleClick = (link) => {
    setActiveTab(link);
  };

  const navigate = useNavigate();
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
  return (
    <div className="flex flex-col gap-4 pl-5 pt-10 pb-20 items-start justify-between min-h-screen w-64 rounded-tr-xl bg-gray-200 dark:bg-gray-800 dark:text-slate-300">
      <div className="border-b border-slate-400 pr-3 mb-4">
        <Link
          to={"/"}
          className="dark:text-slate-300 text-secondary text-3xl font-bold tracking-widest"
        >
          Exclusive
        </Link>
      </div>
      <div className="flex flex-col flex-1 text-lg font-semibold gap-2 items-start w-full tracking-widest transition-transform ease-in duration-300">
        {navlinks.map((link) => (
          <Link
            key={link}
            to={link === "Dashboard" ? "/admin" : `${link.toLowerCase()}`}
            className={`w-full py-3 px-1 rounded-sm transition-colors duration-200 ${
              activeTab === link
                ? "bg-white dark:bg-gray-900 border-l-4 border-secondary text-secondary pl-2 text-xl"
                : "hover:bg-white dark:hover:bg-gray-900 hover:border-l-4 hover:border-secondary pl-2"
            }`}
            onClick={() => handleClick(link)}
          >
            <div className="flex items-center gap-1">
              {link === "Dashboard" ? <DashboardIcon /> : ""}
              {link}
            </div>
          </Link>
        ))}
      </div>
      <div className="w-full">
        <button
          onClick={() => toggleTheme()}
          className="flex items-center w-full py-2 px-4 text-left text-lg font-semibold tracking-widest hover:bg-white dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <DarkModeIcon fontSize="small" className="mr-2" />
          <span>Dark Mode</span>
        </button>
        <button 
        onClick={handleLogout}
        className="flex items-center w-full py-2 px-4 text-left text-lg font-semibold tracking-widest hover:bg-white dark:hover:bg-gray-700 transition-colors duration-200">
          <LogoutIcon fontSize="small" className="mr-2" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
