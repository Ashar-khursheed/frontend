import React from "react";

const CustomCheckbox = ({ title, value, id, checked, onChange }) => {
  // Generate a unique ID for each checkbox
  const uniqueId = `${title}-${id}`;

  return (
    <div className="flex items-center justify-between text-gray-700 mt-1">
      <div className="flex items-center">
        <input
          id={uniqueId}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e)} // Call onChange with the event
          className="outline-none w-4 h-4 border-primary rounded accent-primary"
        />
        <label htmlFor={uniqueId} className="ml-2 text-sm ">
          {value} {/* Display the value of the checkbox */}
        </label>
      </div>
    </div>
  );
};

const CustomCheckboxes = ({ title, values, selectedFilters, handleCheckboxChange }) => {
  return (
    <div className="flex flex-col space-y-2">
      {values.map((value, index) => {
        const key = `${title}-${index}`; // Create a unique key for each checkbox
        
        return (
          <CustomCheckbox
            key={key}
            id={key}
            title={title}
            value={value}
            checked={selectedFilters.nonNumericValues[key] === value} // Check if the value is selected
            onChange={(e) =>
              handleCheckboxChange(key, title, "non_numeric_values", e.target.checked, value) // Handle checkbox change
            }
          />
        );
      })}
    </div>
  );
};

export default React.memo(CustomCheckboxes);
