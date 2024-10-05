import React from "react";

function Input({ label, name, register, required, error, textStyle = "text-gray-400", placeholder }) {
  return (
    <div className="w-full">
      <label className={`text-base ${textStyle}`}>
        {label}
        <span className="text-secondary">{required && "*"}</span>
      </label>
      <input
        placeholder={placeholder}
        className={`w-full focus:outline-none p-1 bg-gray-200 dark:bg-gray-300 rounded dark:text-gray-800 ${error ? 'border border-red-500' : ''}`}
        {...register(name, { required })} // Use name prop here
      />
      {error && <span className="text-red-500 text-sm">This field is required</span>}
    </div>
  );
}

export default Input;
