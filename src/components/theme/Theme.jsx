import React from "react";
import { useTheme } from "../../context/ThemeContext";

const Theme = ({ children }) => {
    const {theme} = useTheme()
  return <div className={`${theme} dark:bg-gray-900 dark:text-white`}>{children}</div>;
};

export default Theme;
