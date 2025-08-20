import React from "react";
import { Controller } from "react-hook-form";
import { baseInputClass } from "./inputStyles";

const DateField = ({ control, errors }) => {
  const formatDate = (inputValue) => {
    // Remove all non-numeric characters
    const numbers = inputValue.replace(/\D/g, "");

    // Apply formatting based on length
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 4) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    } else {
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(
        4,
        8
      )}`;
    }
  };

  const handleDateChange = (e, onChange) => {
    const formatted = formatDate(e.target.value);
    onChange(formatted);
  };

  return (
    <div className="flex flex-col  min-w-0 w-full">
      <label
        htmlFor="dateOfBirth"
        className="font-medium text-gray-700 flex-shrink-0">
        Data de Nascimento
      </label>
      <Controller
        name="dateOfBirth"
        control={control}
        render={({ field: { onChange, value, ...field } }) => (
          <input
            {...field}
            value={value || ""}
            onChange={(e) => handleDateChange(e, onChange)}
            id="dateOfBirth"
            className={`${baseInputClass} ${
              errors.dateOfBirth ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="DD/MM/AAAA"
            type="text"
            maxLength={10}
          />
        )}
      />
      <div className="min-h-[1.25rem] flex-shrink-0 w-full overflow-hidden">
        {errors.dateOfBirth && (
          <span className="text-sm text-red-500 break-words leading-tight block w-full">
            {errors.dateOfBirth.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default DateField;
