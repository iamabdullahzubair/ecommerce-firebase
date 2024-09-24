import React from "react";
import ButtonTemplate from "./ButtonTemplate";

const TitleTemplate = ({ title, heading, handleBtnTemplateClick, showTitleViewAllBtn = false, notToShow=false }) => {
  if(notToShow){
    return <></>
  }
  return (
    <div className="flex justify-between">
      <div>
        <div className="flex  items-center mb-3">
          <span className="w-5 h-10 bg-secondary mr-4 rounded-sm"></span>
          <p className="text-lg font-medium text-secondary">{title}</p>
        </div>
        <div className="mb-3">
          <p className="text-2xl font-semibold">{heading}</p>
        </div>
      </div>
      {showTitleViewAllBtn && (
        <div className="mr-20">
          <ButtonTemplate btnText={"View All"} onBtnTemplateClick={handleBtnTemplateClick} />
        </div>
      )}
    </div>
  );
};

export default TitleTemplate;
