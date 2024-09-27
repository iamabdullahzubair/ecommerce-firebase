
// input components
function Input({ label, name, register, required, error, textStyle="text-gray-400" }) {
    return (
      <div className="w-full">
        <label className={`text-base ${textStyle} `}>
          {label}
          <span className="text-secondary">{required && "*"}</span>
        </label>
        <input
          className={`w-full focus:outline-none p-1 bg-gray-200 rounded dark:text-gray-800 ${error ? 'border border-red-500' : ''}`}
          {...register(name, { required })}  // Use name prop here
        />
        {error && <span className="text-red-500 text-sm">This field is required</span>}
      </div>
    );
  }
 
  export default Input