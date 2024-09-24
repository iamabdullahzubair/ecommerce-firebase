import React from "react";

const Spinner = ({borderColor = "border-white"}) => {
  return (
    <div>
      <div className="flex justify-center items-center">
        <div className={`animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 ${borderColor} dark:border-white`}></div>
      </div>
    </div>
  );
};

export default Spinner;
