import React from "react";

const ButtonTemplate = ({
  btnText,
  type = "button",
  btnWidth = "w-56",
  btnColor = "bg-secondary",
  btnTextColor = "text-white",
  border = true,
  onBtnTemplateClick,
}) => {
  return (
    <button
      type={type}
      onClick={onBtnTemplateClick ? onBtnTemplateClick : null}
      className={`${btnColor} ${btnTextColor} ${btnWidth} ${
        border ? "border border-slate-500 rounded " : ""
      } p-5 text-center cursor-pointer`}
    >
      {btnText}
    </button>
  );
};

export default ButtonTemplate;
