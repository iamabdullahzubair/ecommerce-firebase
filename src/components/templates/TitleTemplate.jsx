import React from "react";
import ButtonTemplate from "./ButtonTemplate";

const TitleTemplate = ({ title, heading, handleBtnTemplateClick, showTitleViewAllBtn = false, notToShow=false }) => {
  if(notToShow){
    return <></>
  }
  return (
    <div className="flex justify-between">
      <div>
        <div className="flex  items-center mb-2 lg:mb-3">
          <span className="w-5 h-10 bg-secondary mr-4 rounded-sm"></span>
          <p className="text-base lg:text-lg font-medium text-secondary">{title}</p>
        </div>
        <div className="mb-3">
          <p className="text-base lg:text-2xl font-semibold">{heading}</p>
        </div>
      </div>
      {showTitleViewAllBtn && (
        <div className=" lg:mr-20">
          <ButtonTemplate btnText={"View All"} onBtnTemplateClick={handleBtnTemplateClick} />
        </div>
      )}
    </div>
  );
};

export default TitleTemplate;
