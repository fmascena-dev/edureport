import React from "react";
import { baseInputClass } from "./inputStyles";

const FormField = ({
  id,
  label,
  type = "text",
  placeholder = "",
  register,
  errors,
  maxLength,
}) => {
  return (
    <div className="flex flex-col  min-w-0 w-full">
      <label htmlFor={id} className="font-medium text-gray-700 flex-shrink-0">
        {label}
      </label>
      <input
        className={`${baseInputClass} ${
          errors[id] ? "border-red-500" : "border-gray-300"
        }`}
        type={type}
        id={id}
        placeholder={placeholder}
        {...register(id)}
        maxLength={maxLength}
      />
      <div className="min-h-[1.25rem] flex-shrink-0 w-full overflow-hidden">
        {errors[id] && (
          <span className="text-sm text-red-500 break-words leading-tight block w-full">
            {errors[id].message}
          </span>
        )}
      </div>
    </div>
  );
};

export default FormField;
