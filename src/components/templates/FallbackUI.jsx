import React from "react";
import { CircularProgress } from "@mui/material";

const FallbackUI = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-800">
      <CircularProgress className="text-gray-500 dark:text-gray-400" />
      <div className="mt-4 text-gray-500 dark:text-gray-400">
        Loading, please wait...
      </div>
    </div>
  );
};

export default FallbackUI;
