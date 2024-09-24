import React from "react";

const Placeholder = () => {
  return (
    <div className="flex flex-col gap-4 p-4 w-full">
      {/* Image Placeholder */}
      <div className="w-full h-48 bg-gray-300 rounded-lg animate-pulse"></div>

      {/* Text Placeholder */}
      <div className="w-3/4 h-4 bg-gray-300 rounded-lg animate-pulse"></div>
      <div className="w-1/2 h-4 bg-gray-300 rounded-lg animate-pulse"></div>
    </div>
  );
};

export default Placeholder;
