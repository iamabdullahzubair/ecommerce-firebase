import React, { useState } from "react";
import { Link } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const shops = [
  "Woman’s Fashion",
  "Men’s Fashion",
  "Electronics",
  "Home & Lifestyle",
  "Medicine",
  "Sports & Outdoor",
  "Baby’s & Toys",
  "Groceries & Pets",
  "Health & Beauty",
];


const carousels = [
  {
    id : 0,
    img1: "/assets/toplayer/apple.png",
    img2: "/assets/toplayer/bgtop.png",
    text: "I Phone 14 Series",
    discount: 10,
    btnText: "Shop Now",
  },
  {
    id : 1,
    img1: "/assets/toplayer/apple.png",
    img2: "/assets/toplayer/bgtop.png",
    text: "I Phone 14 Series",
    discount: 18,
    btnText: "Book Now",
  },
  {
    id : 2,
    img1: "/assets/toplayer/apple.png",
    img2: "/assets/toplayer/bgtop.png",
    text: "I Phone 14 Series",
    discount: 10,
    btnText: "Shop Now",
  },
  {
    id : 3,
    img1: "/assets/toplayer/apple.png",
    img2: "/assets/toplayer/bgtop.png",
    text: "I Phone 14 Series",
    discount: 18,
    btnText: "Book Now",
  },
  {
    id : 4,
    img1: "/assets/toplayer/apple.png",
    img2: "/assets/toplayer/bgtop.png",
    text: "I Phone 14 Series",
    discount: 18,
    btnText: "Book Now",
  },
];

const TopLayer = () => {
  const [currentCarousel, setCurrentCarousel] = useState(carousels[Math.floor(carousels.length/2)]);

  function handleCarouselBottomBtn(index){
    setCurrentCarousel(carousels[index])
  }

  return (
    <div className="px-20 mt-10 flex items-start justify-start">
      {/* Links */}

      <div className="flex flex-col gap-3 border-r border-gray-300 px-10 ">
        {shops.map((shop) => (
          <Link className="hover:text-secondary" key={shop} to={"#"}>
            {shop}
          </Link>
        ))}
      </div>

      {/* carousel */}
      <div className="bg-black flex-1 flex flex-col text-white mx-10">
        <div className="flex mx-4 my-10 justify-between  ">
          <div className="flex flex-col pl-16 items-start justify-start gap-2">
            <span className="flex justify-start items-center gap-1 mb-4">
              <img
                className="w-16 object-contain filter invert"
                src={currentCarousel.img1}
                alt={currentCarousel.text}
              />
              <p className="text-sm font-extralight">{currentCarousel.text}</p>
            </span>
            <p className="text-3xl font-bold flex flex-col gap-2 tracking-wider">
              <span>Up to {currentCarousel.discount}% </span>
              <span>off Voucher</span>
            </p>
            <button className="flex py-2 items-center gap-1">
              <p className="text-sm border-b border-gray-300 pb-1 tracking-wider">
                {currentCarousel.btnText}
              </p>
              <ArrowRightAltIcon />
            </button>
          </div>
          <div className="">
            <img
              className="w-10/12"
              src={currentCarousel.img2}
              alt={currentCarousel.text}
            />
          </div>
        </div>
        <span className="w-full flex items-center justify-center mb-2 gap-2">
          {carousels.map((crr, index) => (
            <button
            onClick={() => handleCarouselBottomBtn(index)}
              key={index}
              className={` w-1 h-1  rounded-full border-2 border-white ${currentCarousel.id == index ? "p-[6px] bg-secondary" : "p-[2px] bg-gray-300" }  `}
            ></button>
          ))}
        </span>
      </div>
    </div>
  );
};

export default TopLayer;
