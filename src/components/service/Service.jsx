import React from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import GppGoodIcon from "@mui/icons-material/GppGood";

const Service = () => {
  const services = [
    {
      icon: LocalShippingIcon,
      p1: "Free and Fast Delivery",
      p2: "Free delivery for all orders over $140",
    },
    {
      icon: SupportAgentIcon,
      p1: "24/7 CUSTOMER SERVICE",
      p2: "Friendly 24/7 customer support",
    },
    {
      icon: GppGoodIcon,
      p1: "MONEY BACK GUARANTEE",
      p2: "We return money within 30 days",
    },
  ];

  return (
    <div className="px-20 mt-8 flex flex-col lg:flex-row justify-center items-center lg:gap-4 gap-7">
      {services.map((service, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center lg:gap-2 gap-1 p-8"
        >
          <div className="bg-gray-400 p-2 rounded-full dark:bg-white">
            <div className="bg-black p-4 rounded-full dark:bg-gray-900">
              {React.createElement(service.icon, {
                className: "text-white",
                fontSize: "large",
              })}
            </div>
          </div>
          <p className="text-lg font-bold">{service.p1}</p>
          <p>{service.p2}</p>
        </div>
      ))}
    </div>
  );
};

export default Service;
