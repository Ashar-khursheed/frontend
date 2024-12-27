import React, { useState } from "react";

const DynamicFilter = ({ data }) => {
  const [seeMore, setSeeMore] = useState(false);

  // Function to handle checkbox changes
  const handleCheckboxChange = (id) => {
    // Add your checkbox change logic here
    console.log(`Checkbox for ${id} clicked`);
  };

  // Function to render range filters
  const renderRangeFilter = (ranges, title) => {
    return (
      <div className="relative mt-3">
        <h3>{title}</h3>
        <div className="mt-3">
          {Object.entries(ranges).map(([key, range]) => (
            <div key={key}>
              <label>{`Range ${key}: ${range.min} - ${range.max}`}</label>
              <input
                type="range"
                min={range.min}
                max={range.max}
                onChange={(e) => console.log(`${title} changed to ${e.target.value}`)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Function to render checkboxes for non-numeric values
  const renderCheckboxFilter = (nonNumericValues, title) => {
    return (
      <div className="relative mt-3">
        <h3>{title}</h3>
        <div className="mt-3">
          {nonNumericValues
            ? Object.entries(nonNumericValues).map(([key, value]) => (
                <React.Fragment key={key}>
                  {!seeMore && key < 5 ? (
                    <div>
                      <label>
                        <input
                          type="checkbox"
                          id={key}
                          onChange={() => handleCheckboxChange(key)}
                        />
                        {value}
                      </label>
                    </div>
                  ) : null}
                  {seeMore ? (
                    <div>
                      <label>
                        <input
                          type="checkbox"
                          id={key}
                          onChange={() => handleCheckboxChange(key)}
                        />
                        {value}
                      </label>
                    </div>
                  ) : null}
                </React.Fragment>
              ))
            : "No options available"}
          <p
            className="underline text-gray-700 text-xs mt-2 cursor-pointer"
            onClick={() => setSeeMore(!seeMore)}
          >
            {!seeMore ? "See More" : "See Less"}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div>
     
      {/* Render Filters dynamically */}
      {Object.entries(data).map(([key, value]) => {
        const title =
          key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " "); // Dynamically generate title

        if (value.ranges && Object.keys(value.ranges).length) {
          return renderRangeFilter(value.ranges, title);
        } else if (value.non_numeric_values && Object.keys(value.non_numeric_values).length) {
          return renderCheckboxFilter(value.non_numeric_values, title);
        }

        // If no filter is matched, return null to prevent rendering undefined
        return null;
      })}
    </div>
  );
};

export default DynamicFilter;
