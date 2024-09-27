import React from "react";

const ButtonTemplate = ({
  btnText,
  type = "button",
  btnWidth = "lg:w-56 w-24",
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
      } lg:p-5 p-2 text-center cursor-pointer `}
    >
      {btnText}
    </button>
  );
};

export default ButtonTemplate;
