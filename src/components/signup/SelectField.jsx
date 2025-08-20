import React from "react";
import { baseInputClass } from "./inputStyles";

const SelectField = ({ id, label, options = [], register, errors }) => {
  return (
    <div className="flex flex-col  min-w-0 w-full">
      <label htmlFor={id} className="font-medium text-gray-700 flex-shrink-0">
        {label}
      </label>
      <select
        className={`${baseInputClass} ${
          errors[id] ? "border-red-500" : "border-gray-300"
        }`}
        id={id}
        {...register(id)}>
        <option value="">Selecione...</option>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <div className="min-h-[1.25rem] flex-shrink-0 overflow-hidden">
        {errors[id] && (
          <span className="text-sm text-red-500 break-words leading-tight block w-full">
            {errors[id].message}
          </span>
        )}
      </div>
    </div>
  );
};

export default SelectField;
