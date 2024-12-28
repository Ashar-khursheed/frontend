import React from "react";

const CustomCheckboxes = ({ title, quantity, id, checked, onChange }) => {
 
  const checkboxId = `${title.split("")[0]}-${id}`;

  return (
    <div className="flex items-center justify-between text-gray-700 mt-1">
      <div className="flex items-center">
        <input
          id={checkboxId}
          type="checkbox"
          checked={checked || false}  // Ensure checkbox is checked or unchecked (fallback to false)
          onChange={(e) => onChange(e.target.checked)}  // Trigger onChange with the checked state
          value=""
          className="outline-none w-4 h-4 border-primary rounded accent-primary"
        />
        <label htmlFor={checkboxId} className="ml-2 text-sm capitalize">
          {title}
        </label>
      </div>
      <span>{quantity}</span>
    </div>
  );
};

export default React.memo(CustomCheckboxes);
