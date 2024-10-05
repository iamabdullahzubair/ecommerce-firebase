import React from "react";
import DoneIcon from '@mui/icons-material/Done';

function CustomCheckbox({ label, name, id, register, required, error, watch }) {
  const isChecked = watch(name);
  
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={id}
        {...register(name, { required })}
        className="hidden"  // Hide the default checkbox
      />
      <label htmlFor={id} className="flex items-center cursor-pointer">
        {/* Custom styled checkbox */}
        <span className={`w-5 h-5 border-2 border-gray-400 rounded-sm flex-shrink-0 flex items-center justify-center
          ${error ? 'border-red-500' : 'border-gray-400'} 
          ${isChecked && "bg-secondary border-secondary text-white" }
        `}>{isChecked && <DoneIcon fontSize="small"/>}</span>
        <span className="ml-2 md:text-base text-sm text-gray-400">{label}{required && "*"}</span>
      </label>
      {error && <span className="text-red-500 text-sm">This field is required</span>}
    </div>
  );
}

export default CustomCheckbox;
