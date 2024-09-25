import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  AccessTime,
  LocalShipping,
  Home,
} from "@mui/icons-material";

const OrderTrack = ({ status }) => {
  
  const [statusState, setStatusState] = useState(null)

  useEffect(() => {
    if(status.length){
      let st = status[status.length-1]
      const {status :sta} = st
      setStatusState(sta)
    }
  }, [status])

  console.log("status" , status)
  const statusSteps = [
    { label: "Order Placed", icon: <Home className="text-gray-500" /> },
    { label: "Processing", icon: <AccessTime className="text-yellow-500" /> },
    { label: "Shipped", icon: <LocalShipping className="text-blue-500" /> },
    { label: "Delivered", icon: <CheckCircle className="text-green-500" /> },
  ];

  const currentStep = statusSteps.findIndex((step) => step.label === statusState);

  return (
    <div className="flex items-center justify-between px-4 flex-wrap sm:flex-nowrap">
      {statusSteps.map((step, index) => (
        <div key={index} className="flex items-center relative sm:mb-0 mb-6">
          <div
            className={`flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full ${
              index <= currentStep
                ? "scale-125 text-white"
                : "scale-90 text-gray-500"
            } transition-all duration-300 ease-in`}
          >
            {step.icon}
          </div>
          <p
            className={`absolute -bottom-7 sm:-bottom-6 text-xs sm:text-base ${
              index <= currentStep
                ? "text-secondary text-base font-semibold dark:text-green-500"
                : "text-gray-400"
            }`}
          >
            {step.label}
          </p>
          <div
            className={`h-1 w-24 sm:w-48 ml-2 mr-2 rounded-sm transition-all duration-500 ease-in ${
              index < statusSteps.length - 1
                ? index < currentStep
                  ? "bg-secondary dark:bg-green-500"
                  : "bg-gray-300"
                : ""
            }`}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default OrderTrack;
