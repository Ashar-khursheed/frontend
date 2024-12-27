import React, { useState } from "react";
import FilterTitle from "./FilterTitle";
import CustomCheckboxes from "./CustomCheckboxes";

const DynamicFilter = ({ data, setDynamicParams,
    dynamicParams }) => {
    const [seeMore, setSeeMore] = useState(false);

    // State to store selected filters
    const [selectedFilters, setSelectedFilters] = useState({
        ranges: {},
        nonNumericValues: {},
    });

    // Function to handle checkbox changes (both ranges and non-numeric)
    const handleCheckboxChange = (id, title, type, isChecked,value) => {
       
       
        setSelectedFilters((prevState) => {
            const updatedFilters = { ...prevState };

            if (type === "range") {
                if (isChecked) {
                    updatedFilters.ranges[id] = true;
                } else {
                    delete updatedFilters.ranges[id];
                }
            } else if (type === "non_numeric_values") {
                if (isChecked) {
                    updatedFilters.nonNumericValues[id] = value;
                } else {
                    delete updatedFilters.nonNumericValues[id];
                }
            }

            // Call the API whenever filters change
            callAPI(updatedFilters, title);

            return updatedFilters;
        });
    };

    // Call API with updated filters
    const callAPI = (filters, title) => {
        const queryString = buildQueryString(filters, title);
        setDynamicParams(queryString);

    };

    // Function to build query string for API request
    const buildQueryString = (filters, title) => {
        const filterArray = [];

        // Process ranges
        Object.entries(filters.ranges).forEach(([key, value]) => {
            const [min, max] = key.split('-');
            filterArray.push({
                spec_name: title,
                min: min,
                max: max,
            });
        });

        // Process non-numeric values (categories)
        Object.entries(filters.nonNumericValues).forEach(([key, value]) => {
            filterArray.push({
                spec_name: title,
                value: value,
            });
        });

        // Convert to query string format
        return filterArray
            .map((filter, index) => {
                return Object.entries(filter)
                    .map(([key, val]) => `filters[${index}][${key}]=${encodeURIComponent(val)}`)
                    .join('&');
            })
            .join('&');
    };

    // Function to render range filters
    const renderRangeFilter = (ranges, title) => {

        return (
            <React.Fragment>
                <div className="relative mt-3">
                    <div className="flex items-center justify-between">
                        <FilterTitle title={title} />
                        <span
                            className="text-sm underline text-gray-400 font-semibold cursor-pointer"
                            onClick={() => {
                                setSelectedFilters((prevState) => ({
                                    ...prevState,
                                    ranges: {}, // Clear selected ranges
                                }));
                            }}
                        >
                            Clear All
                        </span>
                    </div>
                    <div className="mt-3">
                        {Object.entries(ranges).map(([key, range]) => {
                            const min = Math.min(range.min, range.max);
                            const max = Math.max(range.min, range.max);
                            const rangeValue = `${min}-${max}`;
                            return (
                                <div key={key}>
                                    <div className="mt-2">
                                        <input
                                            type="checkbox"
                                            id={rangeValue}
                                            className="mr-2"
                                            onChange={(e) =>
                                                handleCheckboxChange(rangeValue, `${title}`, "range", e.target.checked)
                                            }
                                            checked={selectedFilters.ranges[rangeValue] || false}
                                        />
                                        <label htmlFor={rangeValue} className="text-gray-700 text-sm">
                                            ${min} - ${max}
                                        </label>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="h-[1px] w-full bg-gray-300 my-3 "></div>
            </React.Fragment>
        );
    };

    // Function to render checkboxes for non-numeric values (like categories)
    const renderCheckboxFilter = (nonNumericValues, title) => {
        return (
            <React.Fragment>
                <div className="relative mt-3">
                    <div className="flex items-center justify-between">
                        <FilterTitle title={title} />
                        <span
                            className="text-sm underline text-gray-400 font-semibold cursor-pointer"
                            onClick={() => {
                                setSelectedFilters((prevState) => ({
                                    ...prevState,
                                    nonNumericValues: {}, // Clear selected non-numeric values
                                }));
                            }}
                        >
                            Clear All
                        </span>
                    </div>
                    <div className="mt-3">
                        {nonNumericValues
                            ? Object.entries(nonNumericValues).map(([key, value], index) => (
                                <React.Fragment key={key}>
                                    
                                    {!seeMore && index < 5 ? (
                                        <div>
                                            <CustomCheckboxes
                                                id={`${title}-${key}`}
                                                title={value}
                                                onChange={(e) =>
                                                    handleCheckboxChange(`${title}-${key}`, `${title}`, "non_numeric_values", e.target.checked,value)
                                                }
                                                checked={selectedFilters.nonNumericValues[`${title}-${key}`] === value}
                                            />
                                        </div>
                                    ) : null}
                                    {seeMore ? (
                                        <div>
                                            <CustomCheckboxes
                                                id={`${title}-${key}`}
                                                title={value}
                                                onChange={(e) =>
                                                    handleCheckboxChange(`${title}-${key}`, `${title}`, "non_numeric_values", e.target.checked,value)
                                                }
                                                checked={selectedFilters.nonNumericValues[`${title}-${key}`] === value}
                                            />
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
            </React.Fragment>
        );
    };


    return (
        <div>
            {Object.entries(data).map(([key, value]) => {
                const title =
                    key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ");

                if (value.ranges && Object.keys(value.ranges).length) {
                    return renderRangeFilter(value.ranges, title);
                } else if (value.non_numeric_values && Object.keys(value.non_numeric_values).length) {
                    return renderCheckboxFilter(value.non_numeric_values, title);
                }

                return null;
            })}
        </div>
    );
};

export default DynamicFilter;
