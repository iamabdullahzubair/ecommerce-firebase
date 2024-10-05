import React from "react";

const LoadingOverlay = ({ isLoading , text}) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900 bg-opacity-60">
      {/* Loader Spinner */}
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>

      {/* Optional: Loading Text */}
      <p className="text-white text-lg font-medium mt-4">{text ? text : "Processing your order..."}</p>

      <style>
        {`
          .loader {
            border-top-color: #3498db;
            animation: spin 1s infinite linear;
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingOverlay;
