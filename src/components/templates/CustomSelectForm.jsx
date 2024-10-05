import React, { useEffect, useState } from "react";

const CustomSelectForm = ({
  label,
  name,
  register,
  setValue,
  error,
  required,
  options,
  defaultValue
}) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue || ""); // State to manage selected value
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility

  // Handle selection of option
  const handleOptionClick = (value) => {
    setSelectedOption(value); // Update custom select display
    setValue(name, value); // Update hidden select value in form
    setIsOpen(false); // Close dropdown
  };

  useEffect(() => {
    if (defaultValue) {
      handleOptionClick(defaultValue); // Set initial value if provided
    }
  }, [defaultValue]);

  return (
    <>
      <label htmlFor={name}>
        {label}
        <span className="text-secondary">{required && "*"}</span>
      </label>

      {/* Hidden original select box for form functionality */}
      <select
        id={name}
        {...register(name, { required })}
        className="hidden"
        defaultValue={defaultValue}
      >
        <option value="">Select an option</option>
        {options.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>

      {/* Custom dropdown */}
      <div className="relative">
        <div
          className="w-full px-2 py-1 border text-center border-gray-300 rounded cursor-pointer bg-white focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          onClick={() => setIsOpen(!isOpen)} // Toggle dropdown visibility
        >
          {selectedOption || "Select an option"}
        </div>

        {/* Dropdown options */}
        {isOpen && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 dark:bg-gray-700 dark:border-gray-600">
            {options.map((op) => (
              <li
                key={op}
                className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white"
                onClick={() => handleOptionClick(op)}
              >
                {op}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Error handling */}
      {error && (
        <p className="text-red-500 text-sm mt-2 dark:text-red-400">
          Please select an option
        </p>
      )}
    </>
  );
};

export default CustomSelectForm;
