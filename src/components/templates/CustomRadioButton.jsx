// CustomRadioButton Component
const CustomRadioButton = ({
    label,
    value,
    selectedOption,
    setSelectedOption,
  }) => (
    <div className="flex items-center gap-2">
      <input
        name={value}
        type="radio"
        id={value}
        className="hidden"
        value={value}
        checked={selectedOption === value}
        onChange={() => setSelectedOption(value)}
      />
      <label htmlFor={value} className="flex items-center cursor-pointer">
        <span className="w-4 h-4 border-2 rounded-full flex-shrink-0 border-gray-800 dark:border-gray-300 flex justify-center items-center transition duration-200">
          {selectedOption === value && (
            <span className="w-2 h-2 bg-gray-800 dark:bg-gray-300 rounded-full"></span>
          )}
        </span>
        <span className="ml-2 text-base text-gray-700 dark:text-white">{label}</span>
      </label>
    </div>
  );

  export default CustomRadioButton